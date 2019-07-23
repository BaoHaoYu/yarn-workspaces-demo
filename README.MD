<!-- toc -->
- [作用](#%e4%bd%9c%e7%94%a8)
- [前奏](#%e5%89%8d%e5%a5%8f)
- [命令](#%e5%91%bd%e4%bb%a4)
    - [yarn开启工作空间](#yarn%e5%bc%80%e5%90%af%e5%b7%a5%e4%bd%9c%e7%a9%ba%e9%97%b4)
    - [安装依赖](#%e5%ae%89%e8%a3%85%e4%be%9d%e8%b5%96)
    - [添加新的包到依赖，注意加入`-W`](#%e6%b7%bb%e5%8a%a0%e6%96%b0%e7%9a%84%e5%8c%85%e5%88%b0%e4%be%9d%e8%b5%96%e6%b3%a8%e6%84%8f%e5%8a%a0%e5%85%a5-w)
    - [编译所有包](#%e7%bc%96%e8%af%91%e6%89%80%e6%9c%89%e5%8c%85)
    - [编译所有包同时监视](#%e7%bc%96%e8%af%91%e6%89%80%e6%9c%89%e5%8c%85%e5%90%8c%e6%97%b6%e7%9b%91%e8%a7%86)
    - [启动storybook](#%e5%90%af%e5%8a%a8storybook)
    - [格式化ts](#%e6%a0%bc%e5%bc%8f%e5%8c%96ts)
    - [发布到npm](#%e5%8f%91%e5%b8%83%e5%88%b0npm)
- [特性](#%e7%89%b9%e6%80%a7)
- [单元测试](#%e5%8d%95%e5%85%83%e6%b5%8b%e8%af%95)
- [发布](#%e5%8f%91%e5%b8%83)
    - [.npmrc](#npmrc)
    - [Annotated Tags](#annotated-tags)
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
- `husky` √
- `lint-staged` √

## 单元测试
[mocha-examples](https://github.com/mochajs/mocha-examples)

## 发布
> 要打上标签，`lerna diff`对比的是上个打上标签的提交，和最后提交这俩个提交进行对比的
> 所以，建议每次发布都打上标签如 v0.0.1，v0.0.2之类的，Annotated Tags语句

#### .npmrc
填写`token`到`.npmrc`中，内容如下
`//registry.npmjs.org/:_authToken=.................`

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

lerna只会找当前的分支进行标签对比，然后判断是否要发布，如果标签打在其他分支上面，lerna会忽略

#### --no-git-reset
- `lerna publish --no-git-reset`:`lerna`自动更新包的版本了
- `lerna publish`:`lerna`根据上个标签的更新包的版本
