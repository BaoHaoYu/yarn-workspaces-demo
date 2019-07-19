/// <reference types="node"/>
  
declare module 'rollup-plugin-postcss' {
    export interface ICssLoaderOpts {
      plugins?: any
      modules?: any
    }
  
    export default function rollupPluginPostcss (options: ICssLoaderOpts): NodeJS.ReadWriteStream
}
  