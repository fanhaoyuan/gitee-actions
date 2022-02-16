---
toc: menu
order: 3
title: 环境变量
---

## Pull Request

```ts
export interface PullRequestEnv {
    id: string; // PR 的 id
    projectId: string; // PR 所属的项目 id
    number: string; //  PR 的序号
    mergeable: boolean; //  PR 是否可以合并
    title: string; // PR 的标题
    owner: string; // 仓库持有者的名称
    repo: string; // 仓库名称
    source_branch: string; // PR 的源分支名称
    source_folder: string; // 源分支临时工作区路径
    source_remote_ssh: string; // 源分支所属仓库的 ssh 路径
    source_remote_http: string; // 源分支所属仓库的 http 路径
    target_branch: string; // PR 的目标分支名称
    target_folder: string; // 目标分支临时工作区路径
    target_remote_ssh: string; // 目标分支所属仓库的 ssh 路径
    target_remote_http: string; // 目标分支所属仓库的 http 路径
    author_id: string; // PR 作者的 id
    author_name: string; // PR 作者的用户名
    author_remark: string | null; // PR 作者的备注
    action: 'open' | 'merge' | 'close' | 'update'; //触发 PR 的类型
    trigger: 'pull_request'; // 触发工作流的事件 固定为'pull_request'
    updateType: string | null; // 触发工作流的更新事件类型， 当 action 为 `update` 时有值
}
```

## Push

```ts
export interface PushEnv {
    trigger: 'push'; // 触发工作流的事件 固定为'push'
    type: 'branch' | 'tag'; // 推送类型
    branch: string | null; // 分支名称, type 为 'branch' 时有值
    tag: string | null; // 分支名称, type 为 'tag' 时有值
    ref: string; // 推送的引用
    deleted: boolean; //是否是删除操作
    created: boolean; //是否是新建操作
    folder: string; // 临时工作区路径
    remote_ssh: string; // 仓库的 ssh 地址
    remote_http: string; // 仓库的 http 地址
    author_id: string; // 作者的 id
    author_name: string; // 作者的用户名
    author_remark: string | null; // 作者的备注
    message: string; // 推送信息
}
```
