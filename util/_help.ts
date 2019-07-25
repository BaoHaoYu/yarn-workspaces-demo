import fs from 'fs-extra'
import globby from 'globby'
import stringify from 'json-stringify-pretty-compact'

interface IJsonFile {
  /**
   * 读取到的json对象
   */
  json: object

  /**
   * 文件路径
   */
  path: string
}

export interface IPkg {
  main: string
  module: string
  name: string
  types: string
}

/**
 * 把list路径中的json封装到 {json: string, path: string}[]
 * @param list 路径
 */
function getAllJson(list: string[]): IJsonFile[] {
  const jsons: IJsonFile[] = []
  for (const jsonPath of list) {
    const json = fs.readJSONSync(jsonPath, { throws: false })
    jsons.push({ json, path: jsonPath })
  }
  return jsons
}

/**
 * 重新设置json，最终修改文件内容
 * @param p
 */
function setJson(p: {
  filePath: string | string[]
  getJsonString?: (json: object) => void
  setJsonString?: (json: object) => object
}) {
  const golPath = globby.sync(p.filePath)
  const jsonFile: IJsonFile[] = getAllJson(golPath)

  for (const file of jsonFile) {
    p.setJsonString &&
      fs.outputFile(
        file.path,
        stringify(p.setJsonString(file.json), { maxLength: 0 }),
      )
    p.getJsonString && p.getJsonString(file.json)
  }
  return jsonFile
}

export { setJson, getAllJson }
