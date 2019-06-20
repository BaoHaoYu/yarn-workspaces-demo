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
- [lerna diff](#lerna-diff)
    - [lerna diff 总是返回错误的结果](#lerna-diff-%E6%80%BB%E6%98%AF%E8%BF%94%E5%9B%9E%E9%94%99%E8%AF%AF%E7%9A%84%E7%BB%93%E6%9E%9C)
- [TODO](#TODO)
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

## lerna diff
#### lerna diff 总是返回错误的结果
进入`node_modules\@lerna\diff\lib\get-last-commit.js`

- 修改前
```js
function getLastCommit(execOpts) {
  if (hasTags(execOpts)) {
    log.silly("getLastTagInBranch");

    return childProcess.execSync("git", ["describe", "--tags", "--abbrev=0"], execOpts);
  }

  log.silly("getFirstCommit");
  return childProcess.execSync("git", ["rev-list", "--max-parents=0", "HEAD"], execOpts);
}
```

`lerna diff @lerna-demo/p1`
```diff
new file mode 100644
index 0000000..5cf9201
--- /dev/null
+++ b/packages/p1/.npmignore
@@ -0,0 +1,3 @@
+src
+__test__
+*.log
\ No newline at end of file
diff --git a/packages/p1/README.md b/packages/p1/README.md
new file mode 100644
index 0000000..29f9b1b
:...skipping...
diff --git a/packages/p1/.npmignore b/packages/p1/.npmignore
new file mode 100644
index 0000000..5cf9201
--- /dev/null
+++ b/packages/p1/.npmignore
@@ -0,0 +1,3 @@
+src
+__test__
+*.log
\ No newline at end of file
diff --git a/packages/p1/README.md b/packages/p1/README.md
new file mode 100644
index 0000000..29f9b1b
--- /dev/null
+++ b/packages/p1/README.md
@@ -0,0 +1 @@
+lerna demo p1
\ No newline at end of file
diff --git a/packages/p1/package.json b/packages/p1/package.json
index 1a8531a..354cdf5 100644
--- a/packages/p1/package.json
+++ b/packages/p1/package.json
@@ -1,6 +1,12 @@
 {
-  "name": "p1",
-  "version": "0.0.1",
+  "name": "@lerna-demo/p1",
+  "version": "0.0.15",
+  "description": "larna demo",
+  "license": "MIT",
+  "repository": "https://github.com/BaoHaoYu/yarn-workspaces-demo/tree/master/packages/p1",
+  "publishConfig": {
+    "access": "public"
+  },
   "main": "dist/bundle.cjs.js",
   "module": "dist/bundle.ems.js",
   "types": "dist/index.d.ts",
@@ -9,7 +15,8 @@
     "@types/react-dom": "16.8.4"
   },
   "dependencies": {
+    "@lerna-demo/p2": "^0.0.1",
     "react": "^16.8.6",
     "react-dom": "^16.8.6"
   }
-}
\ No newline at end of file
+}
diff --git a/packages/p1/src/index.tsx b/packages/p1/src/index.tsx
index 443c130..14e6788 100644
--- a/packages/p1/src/index.tsx
+++ b/packages/p1/src/index.tsx
@@ -1,9 +1,21 @@
+import P2 from '@lerna-demo/p2'
 import * as React from 'react'
+// @ts-ignore
+import s from './style.scss'

-export default function (): any {
-    return (
-        <div>
-            p1
-        </div>
-    )
-}
\ No newline at end of file
+export interface IProps {
+  value?: string
+}
+
+const p1: React.FunctionComponent<IProps> = (props) => {
+  return (
+    <div className={s.p1}>
+      <h1>
+        {props.value}
+      </h1>
+      <P2 />
+    </div>
+  )
+}
+
+export default p1
diff --git a/packages/p1/src/style.scss b/packages/p1/src/style.scss
new file mode 100644
index 0000000..c6a3cef
--- /dev/null
+++ b/packages/p1/src/style.scss
@@ -0,0 +1,3 @@
+.p1 {
+  color: rgb(33, 91, 214);
+}
```

修改后
```js
function getLastCommit(execOpts) {
  if (hasTags(execOpts)) {
    log.silly("getLastTagInBranch");

    return childProcess.execSync("git", ["describe", "--tags", "--abbrev=0"], execOpts);
  }

  log.silly("getLastCommit");
  return childProcess.execSync("git", ["log", '--format="%H"', "-n", "1"], execOpts);
}
```

`lerna diff @lerna-demo/p1`
```diff
index 89dc9cc..14e6788 100644
--- a/packages/p1/src/index.tsx
+++ b/packages/p1/src/index.tsx
@@ -4,7 +4,7 @@ import * as React from 'react'
 import s from './style.scss'

 export interface IProps {
-  value: string
+  value?: string
 }
```

> 总结：
> 要打上标签，lerna diff对比的是上个打上标签的提交，和最后提交这俩个提交进行对比的
> 所以，建议每次发布都打上标签如 release0.0.1，release0.0.2之类的

## TODO
- 修复lerna推送的时候会推送所有的包，而不是推送已经改变的
- 修复lerna推送的时候不会更新包的版本