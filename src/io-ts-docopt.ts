/**
 * io-ts-docopt
 * Decode docopt output with io-ts
 */

import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import * as R from 'fp-ts/Record'
import { pipe, flow } from 'fp-ts/function'
import { docopt } from 'docopt'
import Debug from 'debug'
import camelcase from 'camelcase'

export { withEncode } from 'io-ts-types/lib/withEncode'

const debug = {
    options: Debug('options'),
}

export type DocoptOptions = Partial<{
    /**
     * Argument vector
     *
     * default: `process.argv[2..]`
     */
    argv: string[],
    /**
     * Version string.
     * If supplied, when the parser encounters --version option,
     * it will print the supplied version and terminate.
     *
     * default: `undefined`
     */
    version: string,
}>

const removeLeadingDoubleHyphen = (s: string) => s.replace(/^--/, '')

const removeChevrons = (s: string) => s.replace(/^</, '').replace(/>$/, '')

const convenientKey = flow(
    removeLeadingDoubleHyphen,
    removeChevrons,
    camelcase
)

// RESUME
type Convenient<K extends string> = K

// TODO: now you've got to make the strong typing work
const autoEncode = <P extends t.Props>(codec: t.TypeC<P>, value: t.TypeC<P>['_A']): t.TypeC<{ [K in keyof P]: Convenient<K> }> => pipe(
    codec.props,
    R.reduceWithIndex({}, (key, acc) => Object.assign(
        acc,
        { [convenientKey(key)]: value[key] }
    ))
) as any

/**
 * Decode the output of `docopt` with an io-ts codec.
 */
export function decodeDocopt<P extends t.Props>(
    codec: t.TypeC<P>,
    docstring: string,
    {
        argv = process.argv.slice(2),
        version,
    }: DocoptOptions = {}
): E.Either<t.Errors, t.TypeC<P>['_O']> {
    return pipe(
        docopt(
            docstring,
            {
                argv,
                version,
                help: true,
                exit: true
            }
        ),
        codec.decode.bind(null),
        E.map(value => {
            const encoded = codec.encode(value)
            const isDefaultEncodeFunction = codec.is(encoded)
            console.log('is default', isDefaultEncodeFunction)

            console.log(autoEncode(codec, value))

            return isDefaultEncodeFunction
                ? autoEncode(codec, value)
                : encoded
        }),
        E.map(value => (debug.options('Options', value), value)),
    )
}
