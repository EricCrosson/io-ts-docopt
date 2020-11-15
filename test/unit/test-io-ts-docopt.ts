import * as iots from 'io-ts'
import * as E from 'fp-ts/Either'
import test from 'ava'
import { pipe } from 'fp-ts/function'
import { withEncode } from 'io-ts-types/lib/withEncode'

/**
 * Unit under test
 */

import { decodeDocopt } from '../../src/io-ts-docopt'

const docstring = `
Usage:
    foo --clean <one> <two> <many>...
`

const docoptCodec = iots.type({
    '--clean': iots.boolean,
    '<one>': iots.string,
    '<two>': iots.string,
    '<many>': iots.array(iots.string)
})

const codec = withEncode(
    docoptCodec,
    (a) => ({
        clean: a['--clean'],
        one: a['<one>'],
        two: a['<two>'],
        many: a['<many>']
    })
)

// test('should decode output of docopt', t => {
//     pipe(
//         decodeDocopt(
//             codec,
//             docstring,
//             { argv: `--clean red blue green purple yellow`.split(/\s+/) }
//         ),
//         E.fold(
//             errors => {
//                 console.log(JSON.stringify(errors, null, 4))
//                 t.fail()
//             },
//             decoded => {
//                 t.deepEqual(
//                     decoded,
//                     {
//                         clean: true,
//                         one: 'red',
//                         two: 'blue',
//                         many: ['green', 'purple', 'yellow']
//                     }
//                 )
//             }
//         )
//     )
// })

test.only('should support auto-encoding', t => {
    pipe(
        decodeDocopt(
            docoptCodec,
            docstring,
            { argv: `--clean red blue green purple yellow`.split(/\s+/) }
        ),
        E.fold(
            errors => {
                console.log(JSON.stringify(errors, null, 4))
                t.fail()
            },
            (decoded: any) => {
                t.deepEqual(
                    decoded,
                    {
                        clean: true,
                        one: 'red',
                        two: 'blue',
                        many: ['green', 'purple', 'yellow']
                    }
                )
            }
        )
    )
})
