# 作用
rollup + yarn workspaces 管理多个包

# 前奏
- 如果使用作用域 @lerna-demo ，[先要创建org]( https://www.npmjs.com/org/create)，具体参考[官方文档](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages) 
- 在根目录创建.npmrc，内容为 //registry.npmjs.org/:_authToken=<`token`>，方便提交到npm

# 命令
### yarn开启工作空间
`yarn config set workspaces-experimental true`

### 安装依赖
`yarn`

### 添加新的包到依赖，注意加入`-W`
`yarn add *any_pack* -W`

### 编译所有包
`npm run build`

### 编译所有包同时监视
`npm run build:w`

### 启动storybook
`npm run storybook`
打开 http://localhost:6006

### 启动jest监视，结果输出到.jest-test-results.json
如果storybook需要显示jest结果，则要执行该命令  
`npm run test:generate-output`

### 格式化ts
`npm run tslint`

### 发布到npm
`npm run release`

# 特性
- `lerna`  √
- `tslint`  √
- `stylelint`  √
- `storybook`  √
- `push to npm` √
- `jest` √

# TODO 
null