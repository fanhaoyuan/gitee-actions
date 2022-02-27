import { WorkflowTriggerType } from '@/constants';
import { PullRequestUpdateType } from '../pull_request';

/**
 * 仓库地址类型
 */
export type RemoteMode = 'ssh' | 'http';
/**
 * 仓库类型
 */
export type Host = 'github' | 'gitee';
/**
 * 仓库拥有者名称
 */
export type Owner = string;
/**
 * 仓库名称
 */
export type Repo = string;
/**
 * SSH 地址
 */
export type SSH<H extends Host = Host, O extends Owner = Owner, R extends Repo = Repo> = `git@${H}.com:${O}/${R}.git`;
/**
 * HTTP 地址
 */
export type HTTP<
    H extends Host = Host,
    O extends Owner = Owner,
    R extends Repo = Repo
> = `https://${H}.com/${O}/${R}.git`;
/**
 * 仓库地址
 */
export type Remote = SSH | HTTP;

export interface PullRequestConfig {
    /**
     * PR 更新时需要触发的类型
     *
     * @default
     * ['source_branch_changed', 'target_branch_changed']
     */
    updateTriggerType?: PullRequestUpdateType[];
}

/**
 * 全局配置项
 */
export interface GlobalConfig {
    /**
     * 工作区目录路径
     *
     * @default
     * `${process.cwd()}/.workspace`
     */
    workspace?: string;

    /**
     * 配置项路径
     *
     * 内联配置 > 配置文件 > 默认配置
     *
     * 在配置文件中忽略该项
     *
     * @default
     * `${process.cwd()}/actions.config.js`
     */
    config?: string;

    /**
     * 仓库地址类型
     *
     * 如果是字符串，则两端均为同样的方式传输
     *
     * 如果是数组，第一项为 `gitee` 的传输方式，第二项为 `github` 的传输方式
     *
     * @default
     * 'ssh'
     */
    mode?: RemoteMode | [RemoteMode, RemoteMode];

    /**
     * 仓库映射方法
     *
     * 只在获取 github 仓库地址时生效
     *
     * @default
     * (owner, repo) => [owner, repo]
     */
    rewrite?: (owner: Owner, repo: Repo) => [Owner, Repo];

    /**
     * PR 相关配置项
     */
    pr?: PullRequestConfig;

    /**
     * 自定义注入
     *
     * 自定义注入的变量会覆盖原有变量
     *
     * @default
     * {}
     */
    inject?:
        | Record<string, string>
        | ((owner: Owner, repo: Repo, trigger: WorkflowTriggerType) => Record<string, string>);
}
