import globby from 'globby'
import path from 'path'
import * as help from './_help'

const root = path.join(__dirname, '..')

const tsconfigPath = [
  path.join(root, 'packages/*/*/package.json'),
  '!**/node_modules',
]

/**
 * 获得所有包的名称，写作一行
 */
function getLibName() {
  const golPath = globby.sync(tsconfigPath)
  const jsonFile = help.getAllJson(golPath)

  const names = jsonFile.map((item) => {
    return (item.json as help.IPkg).name
  })

  console.log(names.join(' '))
}

getLibName()
