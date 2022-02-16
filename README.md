# Gitee Actions

`Gitee Actions`是一个可以通过`Gitee Webhooks`来触发`Github Actions`的工具。

`Gitee Actions`使用`Nest`构建，可以快速嵌入到现有的`Nest`应用或者新建一个`Nest`应用。

## 工作原理

利用 `Gitee Webhooks` 钩子调用当前服务器中的接口，推送代码到 `Github` 上触发 `Push` 类型状态的 `Github Actions`。

## 特性

-   📦 开箱即用，提供细粒化、更简单的`Webhooks API`
-   📋 `Pull Request` 预合并，`Pull Request`触发后进行预合并，使用合并后的代码进行自动化流程
-   🏷 独立模块，一行代码即可嵌入到现有的`Nest`应用中
-   📡 `TypeScript`，应用基于`Typescript`开发，类型更加安全
-   📒 命令行启动，使用`CLI`命令，快速启动应用

## 安装

```bash
#npm
>$ npm install -g gitee-actions

#yarn
>$ yarn global add gitee-actions

#pnpm
>$ pnpm add -g gitee-actions
```

## 模块引入

通过模块引入，可以直接嵌入到现有的`Nest`应用中。

```ts
import { Module } from '@nestjs/common';
import { GiteeActionsModule } from 'gitee-actions';

@Module({
    imports: [GiteeActionsModule.register(/* Global Config */)],
})
export class AppModule {}
```

## 命令行

使用命令行启动，可以快速启动服务。

通过下列命令启动服务，如果不指定服务器端口，则默认端口为`3000`。

```bash
>$ gitee-actions
```

## 更多

更多信息及配置项，请查看[文档](https://fanhaoyuan.github.io/gitee-actions/)

## 许可证

[MIT](./LICENSE)
