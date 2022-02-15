---
order: 2
title: 使用
toc: menu
---

## 命令行

使用命令行启动，可以快速启动服务。

通过下列命令启动服务，如果不指定服务器端口，则默认端口为`3000`。

```bash
>$ gitee-actions
```

### 命令列表

#### 查看版本信息

```bash
>$ gitee-actions -v
#or
>$ gitee-actions --version
```

#### 指定配置项路径

```bash
>$ gitee-actions -c <path>
#or
>$ gitee-actions --config <path>
```

#### 指定工作区路径

```bash
>$ gitee-actions -w <path>
#or
>$ gitee-actions --workspace <path>
```

#### 指定服务器端口

```bash
>$ gitee-actions -p <path>
#or
>$ gitee-actions --port <path>
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
