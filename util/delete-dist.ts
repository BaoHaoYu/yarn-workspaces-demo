import fs from 'fs-extra'
import globby from 'globby'
import path from 'path'
import { packages } from '../lerna.json'
const root = path.join(__dirname, '..')
const globPath = [
  ...packages.map((p) => path.join(root, p, 'dist')),
  '!**/node_modules',
]

const list = globby.sync(globPath)
for (const distFilePath of list) {
  fs.emptyDir(distFilePath)
}
