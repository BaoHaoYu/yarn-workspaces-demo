import fancyLog from 'fancy-log'
import gulp from 'gulp'
import rollup from 'rollup'
import chalk from 'chalk'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
import pluPostcss from 'rollup-plugin-postcss'
import url from 'postcss-url'
import typescript from 'rollup-plugin-typescript2'
import ts from 'typescript'
import path from 'path'
import globby from 'globby'

function getIndexFromPackage(name: string) {
    return `${name}/src/index.tsx`;
}

function buildRollup(packages: string[]) {
    return Promise.all(
        packages.map((pkg: string) => {
            const input = getIndexFromPackage(pkg);
            fancyLog(`Compiling '${chalk.cyan(input)}' with rollup ...`);
            return rollup
                .rollup({
                    input: [input],
                    plugins: [
                        pluPostcss({
                            plugins: [
                                url({ url: 'inline' }),
                                precss,
                                autoprefixer({ browsers: 'last 2 versions' })
                            ],
                            modules: {
                                generateScopedName: '[local]___[hash:base64:5]',
                            }
                        }),
                        nodeResolve({
                            extensions: ['.js', '.jsx', '.ts', '.tsx']
                        }),
                        typescript({
                            check: false,
                            tsconfigDefaults: {},
                            typescript: ts,
                            tsconfig: path.join(__dirname, 'tsconfig-main.json')
                        }),
                        commonjs({
                            include: path.join(__dirname, 'node_modules/**'),
                        }),
                    ],

                })
                .then((bundle) => {
                    bundle.write({
                        globals: ()=>'React',
                        file: path.join(pkg, 'dist/bundle.esm.js'),
                        format: 'esm',
                        exports: 'named',
                        // name: 'babel-parser',
                        sourcemap: process.env.NODE_ENV !== 'production',
                    })
                    return bundle.write({
                        globals: ()=>'React',
                        file: path.join(pkg, 'dist/bundle.cjs.js'),
                        format: 'cjs',
                        exports: 'named',
                        // name: 'babel-parser',
                        sourcemap: process.env.NODE_ENV !== 'production',
                    });
                });
        })
    );
}

gulp.task('build-rollup', () => buildRollup(globby.sync('packages/*/*') && ['packages/components/react-animate']));
