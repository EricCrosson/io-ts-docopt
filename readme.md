# io-ts-docopt
[![License][]](https://opensource.org/licenses/ISC)
[![NPM Package][]](https://npmjs.org/package/io-ts-docopt)
[![Build status][]](https://travis-ci.org/EricCrosson/io-ts-docopt)
[![Code Coverage][]](https://codecov.io/gh/EricCrosson/io-ts-docopt)

[License]: https://img.shields.io/badge/License-ISC-blue.svg
[NPM Package]: https://img.shields.io/npm/v/io-ts-docopt.svg
[Build status]: https://travis-ci.org/EricCrosson/io-ts-docopt.svg?branch=master
[Code Coverage]: https://codecov.io/gh/EricCrosson/io-ts-docopt/branch/master/graph/badge.svg

> Decode docopt output with io-ts

[Docopt] is a fantastic argument-parsing tool, but suffers from a few drawbacks:

1. The returned object has awkward keys like `<name>` that cannot be
   accessed with the [dot accessor]
1. Arguments (except flags) are always parsed as strings

This project combines [docopt] with [io-ts] to overcome both
inconveniences, by first parsing arguments with [docopt], then
decoding and then encoding the parsed value through the specified
[io-ts] codec. This sequence provides the opportunity to remap gnarly
keys into more convenient identifiers, as well as decode values from
one type into another (for example, with the [NumberFromString]
codec).

  [io-ts]: https://github.com/gcanti/io-ts
  [docopt]: http://docopt.org/
  [dot accessor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
  [NumberFromString]: https://github.com/gcanti/io-ts-types/blob/master/src/NumberFromString.ts

## Install

``` shell
npm install io-ts-docopt
```

## Use

``` typescript
import { decodeDocopt, withEncode } from 'io-ts-docopt'

const docstring = `
Usage:
    foo --clean <one> <two> <many>...
`

const codec = withEncode(
    iots.type({
        '--clean': iots.boolean,
        '<one>': iots.string,
        '<two>': iots.string,
        '<many>': iots.array(iots.string)
    }),
    (a) => ({
        clean: a['--clean'],
        one: a['<one>'],
        two: a['<two>'],
        many: a['<many>']
    })
)

decodeDocopt(
    codec,
    docstring,
    {argv: `--clean red blue green purple yellow`.split(/\s+/)}
)
//=> {
//       clean: true,
//       one: "red",
//       two: "blue",
//       many: ["green", "purple", "yellow"]
//  }
```

## Documentation

See [generated documentation](doc/README.md).

## Acknowledgments

- [io-ts]
- [docopt]
