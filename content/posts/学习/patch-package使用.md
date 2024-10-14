---
title: patch-package使用
date: 2024-04-08T13:12:49+08:00
slug: the use of patch-package
tags:
  - 笔记
categories:
  - 学习
summary: patch everything
---

## 背景
需要对第三方npm依赖包进行定制化修改

## 准备
- 安装: `npm i patch-package`
- 修改package.json
    ```json
    // this will auto excute npx patch-package after npm install
    "scripts": {
        "postinstall": "npx patch-package"
    }
    ```

## 使用
1.  make changes to the files of a particular package in your node_modules folder
2.  `npx patch-package ${package-name}`，例如：`npx patch-package @aws-sdk/lib-storage`
3.  if you want to apply patches, run `npx patch-package`

## Benefits of patching over forking
- Sometimes forks need extra build steps, e.g. with react-native for Android. Forget that noise.
- Get told in big red letters when the dependency changed and you need to check that your fix is still valid.
- Keep your patches colocated with the code that depends on them.
- Patches can be reviewed as part of your normal review process, forks probably can't

## 参考
- [patch-package - npm](https://www.npmjs.com/package/patch-package)
- [修改 node_modules 里文件的正确姿势 - 掘金](https://juejin.cn/post/6949906434997878791)
- [如何优雅的修改node_modules依赖源码 - 掘金](https://juejin.cn/post/7094556624387309582?from=search-suggest)
- [The easiest way to patch your npm package when there is a 🐛 - DEV Community](https://dev.to/zhnedyalkow/the-easiest-way-to-patch-your-npm-package-4ece)
- [奇技淫巧：如何修改第三方npm包？大家好，我是老纪。在开发过程中发现npm包的Bug，首先向原作者提交issue或For - 掘金](https://juejin.cn/post/7356534347509497919 )
