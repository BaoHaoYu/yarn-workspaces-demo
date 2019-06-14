import typescript from 'rollup-plugin-typescript2'
import ts from 'typescript'
import globby from 'globby'
import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import fse from 'fs-extra'

const config = globby.sync('packages/*/package.json').map((pPath) => {
    const pkg = fse.readJsonSync(pPath)
    const config = {
        input: path.join(pPath, '../src/index.tsx'),
        plugins: [
            nodeResolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }),
            typescript({
                check: true,
                tsconfigDefaults: {},
                typescript: ts,
                tsconfig: path.join(__dirname, 'tsconfig-main.json')
            }),
            commonjs({
                include: path.join(__dirname, 'node_modules/**'),
            }),
        ],
        external: pkg.dependencies,
        output: [
            {
                file: path.join(pPath, '../', pkg.main),
                format: 'cjs',
                exports: 'named'
            },
            {
                file: path.join(pPath, '../', pkg.module),
                format: 'esm',
                exports: 'named'
            },
        ]

    }
    return config
})
console.log(config);

module.exports = config
