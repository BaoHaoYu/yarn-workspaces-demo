[中文](./README_CN.MD)
<!-- toc -->
- [Role](#role)
- [Prelude](#prelude)
- [Command](#command)
    - [Yarn Open workspace](#yarn-open-workspace)
    - [Installation dependency](#installation-dependency)
    - [Add a new package to the dependency, pay attention to join`-W`](#add-a-new-package-to-the-dependency-pay-attention-to-join-w)
    - [Compile the package that changed](#compile-the-package-that-changed)
    - [Compile all packages](#compile-all-packages)
    - [Compile all packages while monitoring](#compile-all-packages-while-monitoring)
    - [Start the storybook](#start-the-storybook)
    - [Format ts](#format-ts)
    - [Publish to npm](#publish-to-npm)
- [Characteristic](#characteristic)
- [Release](#release)
    - [.npmrc](#npmrc)
    - [Annotated Tags](#annotated-tags)
    - [--no-git-tag-version](#no-git-tag-version)
    - [--no-git-reset](#no-git-reset)
- [Unit test](#unit-test)
<!-- tocstop -->

## Role
rollup + yarn workspaces managing multiple packages

## Prelude
- If using scope @lerna-demo ，[first create org]( https://www.npmjs.com/org/create)，specific reference [official document](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages) 
- Create .npmrc in the root directory with the content //registry.npmjs.org/:_authToken=<`token`>，easy to submit to npm

## Command
#### Yarn Open workspace
`yarn config set workspaces-experimental true`

#### Installation dependency
`yarn`

#### Add a new package to the dependency, pay attention to join`-W`
`yarn add *any_pack* -W`

#### Compile the package that changed
`npm run build:changed`

#### Compile all packages
`npm run build:all`

#### Compile all packages while monitoring
`npm run build:w`

#### Start the storybook
`npm run storybook`
open http://localhost:6006

#### Format ts
`npm run tslint`

#### Publish to npm
`npm run release`

## Characteristic
- `lerna`  √
- `tslint`  √
- `stylelint`  √
- `storybook`  √
- `push to npm` √
- `husky` √
- `lint-staged` √

## Release
> To tag, `lerna diff` compares the last tagged submission, and finally submits the two submissions for comparison.
> Therefore, it is recommended that each release be tagged with an Annotated Tags statement such as v0.0.1, v0.0.2

#### .npmrc
fill in `token` to `.npmrc` as follows
`//registry.npmjs.org/:_authToken=.................`

#### Annotated Tags
`git tag -a v0.0.1 -m "my version 0.0.1"`

If there is no Annotated Tags, `lerna changed` will not be able to find the changed package, because the essence is to use the `git describe` command.

- Did not join Annotated Tags
```log
Fatal: No annotated tags can describe 'f87c255432d4fa4656ef37f9f28bdd94f6b55fa5'
.
However, there were unannotated tags: try --tags.
```

- Join the tag
```log
D:\project-demo\yarn-workspaces-demo>git describe
V0.0.1
```

#### --no-git-tag-version
- `lerna publish --no-git-tag-version`: Cancel automatic tagging, `lerna` will not automatically update the version of the package.
`pack1` version is `0.0.1`, after pushing to `npm`, the local is still `0.0.1`
- `lerna publish`: automatically update the version of the package, mark the last commit for each package, and then push

Lerna will only find the current branch for label comparison, and then judge whether to publish, if the label is on other branches, lerna will ignore

#### --no-git-reset
- `lerna publish --no-git-reset`:`lerna` automatically updates the version of the package
- `lerna publish`:`lerna` according to the version of the update package of the previous tab

## Unit test
[mocha-examples](https://github.com/mochajs/mocha-examples)