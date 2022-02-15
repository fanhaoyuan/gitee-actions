---
order: 1
toc: menu
title: 概念
---

## Workflow（工作流）

每次由`Gitee Webhooks API`触发的流程，称之为一个`Workflow`

每个`Job` 分为`3`个步骤，分别为:

-   `Setup Workspace` 设立临时工作区
-   `Running Job` 运行任务
-   `Cleanup Workspace` 清理临时工作区

## Workspace（工作区）

触发工作流后，每个`Job`都会生成特定的文件夹名称，在指定了`workspace`路径后，会在`workspace`路径下设立临时工作区。

后续会在该临时工作区中运行`Job`。

运行工作流完成后，会清理掉临时工作区。

## Job（任务）

一个`Workflow`下可以有多个`Job`。

一个`Job`可以看作为下列几个步骤：

-   `Checkout` 从`Gitee`检出代码
-   `Run Custom Runner` 运行特定的方法
-   `Inject Env` 注入环境变量到`Github workflows`文件
-   `Push` 推送代码到`Github`
