---
toc: menu
title: 配置项
---

### workspace

-   类型: `string`
-   默认值: `${process.cwd()}/.workspace`
-   描述:

工作区目录路径。

### config

-   类型: `string`
-   默认值: `${process.cwd()}/actions.config.js`
-   描述:

配置项路径。

配置项优先级为`内联配置 > 配置文件 > 默认配置`。

在配置文件中会忽略该项。

### mode

-   类型: `'ssh' | 'http' | ('http' | 'ssh')[]`
-   默认值: `'ssh'`
-   描述:

仓库地址类型。

如果是字符串，则两端均为同样的方式传输。

如果是数组，第一项为 `gitee` 的传输方式，第二项为 `github` 的传输方式

### rewrite

-   类型： `(owner: string, repo: string) => [string, string]`
-   默认值： `(owner, repo) => [owner, repo]`
-   描述:

仓库映射方法。只在获取 `github` 仓库地址时生效。

### pr

-   类型: `Object`
-   默认值: `null`
-   描述:

PR 相关配置项。

```ts
/**
 * PR 的更新类型
 */
export type PullRequestUpdateType = 'source_branch_changed' | 'target_branch_changed';

interface PullRequestConfig {
    /**
     * PR 更新时需要触发的类型
     *
     * @default
     *['source_branch_changed', 'target_branch_changed']
     */
    updateTriggerType?: PullRequestUpdateType[];
}
```
