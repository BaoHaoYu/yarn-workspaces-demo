<!-- toc -->
- [作用](#%E4%BD%9C%E7%94%A8)
- [前奏](#%E5%89%8D%E5%A5%8F)
- [命令](#%E5%91%BD%E4%BB%A4)
    - [yarn开启工作空间](#yarn%E5%BC%80%E5%90%AF%E5%B7%A5%E4%BD%9C%E7%A9%BA%E9%97%B4)
    - [安装依赖](#%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96)
    - [添加新的包到依赖，注意加入`-W`](#%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%9A%84%E5%8C%85%E5%88%B0%E4%BE%9D%E8%B5%96%E6%B3%A8%E6%84%8F%E5%8A%A0%E5%85%A5-W)
    - [编译所有包](#%E7%BC%96%E8%AF%91%E6%89%80%E6%9C%89%E5%8C%85)
    - [编译所有包同时监视](#%E7%BC%96%E8%AF%91%E6%89%80%E6%9C%89%E5%8C%85%E5%90%8C%E6%97%B6%E7%9B%91%E8%A7%86)
    - [启动storybook](#%E5%90%AF%E5%8A%A8storybook)
    - [启动jest监视，结果输出到.jest-test-results.json](#%E5%90%AF%E5%8A%A8jest%E7%9B%91%E8%A7%86%E7%BB%93%E6%9E%9C%E8%BE%93%E5%87%BA%E5%88%B0jest-test-resultsjson)
    - [格式化ts](#%E6%A0%BC%E5%BC%8F%E5%8C%96ts)
    - [发布到npm](#%E5%8F%91%E5%B8%83%E5%88%B0npm)
- [特性](#%E7%89%B9%E6%80%A7)
- [注意](#%E6%B3%A8%E6%84%8F)
    - [Annotated Tags](#Annotated-Tags)
    - [--no-git-tag-version](#no-git-tag-version)
    - [--no-git-reset](#no-git-reset)
<!-- tocstop -->

## 作用
rollup + yarn workspaces 管理多个包

## 前奏
- 如果使用作用域 @lerna-demo ，[先要创建org]( https://www.npmjs.com/org/create)，具体参考[官方文档](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages) 
- 在根目录创建.npmrc，内容为 //registry.npmjs.org/:_authToken=<`token`>，方便提交到npm

## 命令
#### yarn开启工作空间
`yarn config set workspaces-experimental true`

#### 安装依赖
`yarn`

#### 添加新的包到依赖，注意加入`-W`
`yarn add *any_pack* -W`

#### 编译所有包
`npm run build`

#### 编译所有包同时监视
`npm run build:w`

#### 启动storybook
`npm run storybook`
打开 http://localhost:6006

#### 启动jest监视，结果输出到.jest-test-results.json
如果storybook需要显示jest结果，则要执行该命令  
`npm run test:generate-output`

#### 格式化ts
`npm run tslint`

#### 发布到npm
`npm run release`

## 特性
- `lerna`  √
- `tslint`  √
- `stylelint`  √
- `storybook`  √
- `push to npm` √
- `jest` √

## 注意
> 要打上标签，`lerna diff`对比的是上个打上标签的提交，和最后提交这俩个提交进行对比的
> 所以，建议每次发布都打上标签如 v0.0.1，v0.0.2之类的，Annotated Tags语句

#### Annotated Tags
`git tag -a v0.0.1 -m "my version 0.0.1"`

如果没有上Annotated Tags，`lerna changed`会无法找到改变的包，因为本质是使用`git describe`命令

- 没有加入Annotated Tags
```log
fatal: No annotated tags can describe 'f87c255432d4fa4656ef37f9f28bdd94f6b55fa5'
.
However, there were unannotated tags: try --tags.
```

- 加入tag
```log
D:\project-demo\yarn-workspaces-demo>git describe
v0.0.1
```

#### --no-git-tag-version
- `lerna publish --no-git-tag-version`：取消自动打标签，`lerna`不会自动更新包的版本了
`pack1`版本是`0.0.1`，推送到`npm`后，本地依旧是`0.0.1`
- `lerna publish`：自动更新包的版本，为最后的提交打上每个包的版本标签，然后再推送

#### --no-git-reset
- `lerna publish --no-git-reset`:`lerna`自动更新包的版本了
- `lerna publish`:`lerna`根据上个标签的更新包的版本