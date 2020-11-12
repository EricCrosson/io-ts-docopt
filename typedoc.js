module.exports = {
    src: [
        './src/io-ts-docopt.ts',
    ],
    exclude: [
        './node_modules/**/*',
        './dist/**/*'
    ],
    mode: 'file',
    includeDeclarations: true,
    tsconfig: 'tsconfig.json',
    out: './doc',
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: true,
    excludeNotExported: true,
    readme: 'none',
    name: 'io-ts-docopt',
    ignoreCompilerErrors: true,
    plugin: 'typedoc-plugin-markdown',
    listInvalidSymbolLinks: true,
    theme: 'markdown'
};
