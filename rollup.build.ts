import chalk from 'chalk'
import child_process from 'child_process'
import fse from 'fs-extra'
import globby from 'globby'
import path from 'path'
import url from 'postcss-url'
import precss from 'precss'
import { InputOptions, OutputOptions, rollup, RollupOutput } from 'rollup'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import pluPostcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import ts from 'typescript'
import yargs from 'yargs-parser'
import lernaJson from './lerna.json'

// 命令要做什么，all则编译所有包，changed则编译发生改变的包，默认为all
const type: 'all' | 'changed' | undefined = yargs(process.argv).type

/**
 * 获得发生改变的包，每次编译不必全部编译
 */
child_process.exec('npm run changed', async (error, stdout: string, stderr) => {
  if (error) {
    console.error(error)
    return
  }
  const matchPkgStr = stdout.replace(/[\r\n]/g, '').match(/{.+?}/g)
  const changes: Array<{
    name: string
    location: string
    version: string
  }> = (matchPkgStr || []).map((item) => {
    return JSON.parse(item)
  })
  if (type === 'changed') {
    logFindChanged(changes)
  }
  changes.map((item) => {
    console.log(item.name)
  })

  const changedPkgPaths = changes.map((item) => {
    return item.location + '\\package.json'
  })

  const optList = rollupConfigs(
    type === 'changed'
      ? changedPkgPaths
      : lernaJson.packages.map((p) => path.join(p, 'package.json')),
  )

  optList.map(async (opt, index) => {
    console.log(chalk.hex('#009dff')('build: ') + opt.input)

    // 打包
    const bundle = await rollup({
      input: opt.input,
      plugins: opt.plugins,
      external: opt.external,
    })

    // 输出
    opt.output.map(async (out) => {
      const outOpt = out as OutputOptions
      await bundle.generate(outOpt)
      await bundle.write(outOpt)
      console.log(chalk.hex('#3fda00')('finish: ') + outOpt.file)
    })
  })
})

/**
 * 生成rollup配置
 * @param packages 包的路径
 */
function rollupConfigs(packages: string[]): Array<RollupOutput & InputOptions> {
  const pkgAbPaths: string[] = globby.sync([
    ...packages,
    '!packages/sass-mixin/package.json',
  ])

  return pkgAbPaths.map<any>((pPath) => {
    const pkg = fse.readJsonSync(pPath)
    const libRoot = path.join(pPath, '..')

    return {
      input: path.join(libRoot, 'src/index.tsx'),
      plugins: [
        pluPostcss({
          plugins: [url({ url: 'inline' }), precss],
          modules: {
            generateScopedName: '[local]___[hash:base64:5]',
          },
        }),
        nodeResolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              baseUrl: libRoot,
              outDir: path.join(libRoot, 'dist'),
              allowSyntheticDefaultImports: true,
            },
            include: [path.join(libRoot, 'src')],
          },
          typescript: ts,
          tsconfig: path.join(__dirname, 'tsconfig.main.json'),
        }),
        commonjs({
          include: path.join(__dirname, 'node_modules/**'),
        }),
      ],
      external: [
        'immutable/contrib/cursor',
        'react-icons/fa',
        'antd/lib/icon',
        'antd/lib/menu',
        'antd/lib/icon/style/css',
        'antd/lib/menu/style/css',
        ...Object.keys(pkg.dependencies),
      ],
      output: [
        {
          file: path.join(libRoot, pkg.main),
          format: 'cjs',
          exports: 'named',
          globals: {
            react: 'React',
          },
        },
        {
          file: path.join(libRoot, pkg.module),
          format: 'esm',
          exports: 'named',
          globals: {
            react: 'React',
          },
        },
      ],
    }
  })
}

/**
 * 打印找到发生改变的包的日志
 * @param changes 发生改变的pkg
 */
function logFindChanged(
  changes: Array<{ name: string; location: string; version: string }>,
) {
  console.log(
    chalk
      .hex('#009dff')
      .bold('find changed: ' + (changes.length === 0 ? 'nothing changed' : '')),
  )
}
