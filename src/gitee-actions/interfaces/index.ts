/**
 * 可以触发的 PR 钩子 action 类型
 */
export type PullRequestTrigger = 'open' | 'close' | 'update' | 'merge';

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
    };
}
