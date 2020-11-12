**[io-ts-docopt](README.md)**

> Globals

# io-ts-docopt

## Index

### Functions

* [decodeDocopt](README.md#decodedocopt)

### Object literals

* [debug](README.md#debug)

## Functions

### decodeDocopt

▸ **decodeDocopt**\<C>(`codec`: C, `docstring`: string, `__namedParameters?`: { argv: string[] = process.argv.slice(2); exit: undefined \| false \| true ; help: undefined \| false \| true ; options_first: undefined \| false \| true ; version: any  }): E.Either\<Errors, C[\"\_O\"]>

*Defined in src/io-ts-docopt.ts:21*

Decode the output of `docopt` with an io-ts codec.

#### Type parameters:

Name | Type |
------ | ------ |
`C` | Any |

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`codec` | C | - |
`docstring` | string | - |
`__namedParameters` | { argv: string[] = process.argv.slice(2); exit: undefined \| false \| true ; help: undefined \| false \| true ; options_first: undefined \| false \| true ; version: any  } | {} |

**Returns:** E.Either\<Errors, C[\"\_O\"]>

## Object literals

### debug

▪ `Const` **debug**: object

*Defined in src/io-ts-docopt.ts:14*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`options` | Debugger | Debug('options') |
