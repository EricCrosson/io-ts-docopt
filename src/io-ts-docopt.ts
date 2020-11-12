/**
 * io-ts-docopt
 * Decode docopt output with io-ts
 */

import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/pipeable'
import { docopt, DocoptOption } from 'docopt'
import Debug from 'debug'

export { withEncode } from 'io-ts-types/lib/withEncode'

const debug = {
    options: Debug('options'),
}

/**
 * Decode the output of `docopt` with an io-ts codec.
 */
export function decodeDocopt<C extends t.Any>(
    codec: C,
    docstring: string,
    {
        argv = process.argv.slice(2),
        help,
        version,
        options_first,
        exit
    }: DocoptOption = {}
): E.Either<t.Errors, C['_O']> {
    return pipe(
        docopt(docstring, {argv, help, version, options_first, exit}),
        codec.decode.bind(null),
        E.map(codec.encode.bind(null)),
        E.map(value => (debug.options('Arguments', value), value)),
    )
}
