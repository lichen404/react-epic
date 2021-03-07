# React  EPIC 

## 介绍

React Epic 是一个生成图片在线链接的图床工具，用户可以定制图片大小，浏览,管理已上传的图片。本项目的基础是[React 项目实战之 epic 图床](https://xiedaimala.com/courses/ac836073-90be-495d-a9ee-946364d6612a)

## 功能

核心功能包括：注册、登录、上传图片、图片尺寸定制、上传历史展示和删除等。

## 技术栈

- React
- styled-components
- React router
- TypeScript
- MobX
- Antd
- LeanCloud

## 链接

[网站预览链接](https://lichen404.github.io/react-epic/#/)

## 笔记
- [react-epic 笔记](https://lichen404.top/2021/03/01/react-epic-%E7%AC%94%E8%AE%B0/)
- [mobX 学习笔记](https://lichen404.top/2021/03/01/mobX-%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/)
## 版本

### 版本 0.0.1 

- 在原项目基础上使用 TypeScript 开发
- 使用 useState 替代 useLocalStore（此 API 已过时，推荐使用 useLocalObservable），不使用 useLocalObservable 的[原因](https://mobx.js.org/react-integration.html#you-might-not-need-locally-observable-state)
-  新增了用户删除图片功能

