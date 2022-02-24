---
title: API 列表
toc: menu
---

## Webhooks API

由于`Gitee Webhooks`的要求，所以下列的`API`的请求方法均为`POST`。

### 创建 PR

-   路径： `/gitee_actions/pull_request/open`
-   事件： `Pull Request`

在新建 `Pull Request` 时触发该钩子。

<Alert type='success'>
代码会与目标分支进行预合并
</Alert>

### 更新 PR

-   路径： `/gitee_actions/pull_request/update`
-   事件： `Pull Request`

在更新 `Pull Request` 时触发该钩子。更新触发方式可以通过[配置项](/config#pr)修改。

更新方式：

-   源分支更新（`source_branch_changed`）
-   目标分支更新（`target_branch_changed`）

<Alert type='success'>
代码会与目标分支进行预合并
</Alert>

### 合并 PR

-   路径： `/gitee_actions/pull_request/merge`
-   事件： `Pull Request`

在合并`Pull Request` 时触发该钩子。

### Push

-   路径: `/gitee_actions/push`
-   事件: `['Push','Tag Push']`

下列情况会可以触发该钩子：

-   仓库新增分支(`Push`)
-   仓库更新分支(`Push`)
-   仓库推送标签(`Tag Push`)

<Alert type='error'>
删除分支、标签不支持触发
</Alert>

## Operation API

### Deploy <Badge>v1.1.0+</Badge>

-   方法: `POST`
-   路径: `/gitee_actions/operation/deploy`
-   参数:

| 名称     | 描述               | 类型     |
| -------- | ------------------ | -------- |
| `remote` | `Gitee`仓库路径    | `string` |
| `folder` | 需要发布到的文件夹 | `string` |
| `branch` | 需要发布的分支名称 | `string` |

-   例子

```bash
>$ curl -X POST --data-urlencode "branch=DIST_APPLICATION" --data-urlencode "remote=git@github.com:fanhaoyuan/gitee-actions.git" --data-urlencode "folder=/home/root/Desktop/nginx/application/" http://localhost:3000/gitee_actions/operation/deploy
```
