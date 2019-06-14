import typescript from 'rollup-plugin-typescript2'
import ts from 'typescript'
import globby from 'globby'
import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import fse from 'fs-extra'

const config = globby.sync('packages/*/package.json').map((pPath) => {
    const pkg = fse.readJsonSync(pPath)
    const libRoot = path.join(pPath, '..')
    const config = {
        input: path.join(libRoot, 'src/index.tsx'),
        plugins: [
            nodeResolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }),
            typescript({
                check: true,
                tsconfigOverride: {
                    compilerOptions: {
                        baseUrl: libRoot,
                        outDir: path.join(libRoot, 'dist'),
                        allowSyntheticDefaultImports: true
                    },
                    include: [
                        path.join(libRoot, 'src')
                    ]
                },
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
                file: path.join(libRoot, pkg.main),
                format: 'cjs',
                exports: 'named',
                globals: {
                    'react': 'React'
                }
            },
            {
                file: path.join(libRoot, pkg.module),
                format: 'esm',
                exports: 'named',
                globals: {
                    'react': 'React'
                }
            },
        ]

    }
    return config
})

export default config
