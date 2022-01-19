/**
 * 可以触发的 PR 钩子 action 类型
 */
export type PullRequestTrigger = 'open' | 'close' | 'update' | 'merge';

/**
 * Pull Request 的更新类型
 */
export type PullRequestUpdateType =
    /**
     * 源分支改变
     */
    | 'source_branch_changed'
    /**
     * 目标合并分支改变
     */
    | 'target_branch_changed'
    /**
     * 关联任务
     */
    | 'update_link_issue';

/**
 * Gitee Actions 配置项
 *
 * @default {}
 */
export interface GiteeActionsOptions {
    /**
     * 工作区目录
     *
     * @default
     * `${process.cwd()}/.workspace`
     */
    workspaceDir?: string;

    /**
     * pull request 配置项
     */
    pullRequest?: {
        /**
         * Gitee 地址对应的 Github 推送地址
         *
         * 如果不指定 则默认为 Gitee 与 Github 中的 path 相同
         *
         * @example 'git@gitee.com:example/examples.git' => 'git@github.com:example/examples.git'
         *
         * @default
         * {}
         */
        sourceMap?: Record<string, string>;

        /**
         * 可以触发的 PR 钩子 action 类型
         *
         * @default
         * ['open', 'close', 'update', 'merge']
         */
        trigger?: PullRequestTrigger[];

        /**
         * 需要在合并后触发的分支名称（合并进去的分支名称）
         *
         * `trigger`中包含`'merge'`有效
         *
         * @default
         * '*'
         */
        triggerAfterMerge?: RegExp | string;

        /**
         * 是否在Pull Request 更新时触发
         *
         * 默认只有在源分支改变时重新触发流程
         *
         * @default
         * ['source_branch_changed']
         */
        triggerActionWithUpdate?: PullRequestUpdateType[];

        /**
         * 是否启用默认服务
         *
         * @default true
         */
        httpService?: boolean;
    };
}
