/**
 * Workflow 运行器配置项
 */
export interface WorkflowRunnerOptions {
    /**
     * 代码源仓库地址
     */
    remote: string;

    /**
     * 临时工作区文件夹路径
     */
    directory: string;

    /**
     * 源代码分支
     */
    sourceBranch: string;

    /**
     * 默认等于 `branch`
     */
    targetBranch?: string;

    /**
     * 提交信息
     *
     * @default 最新的提交消息
     */
    commitMessage?: string;

    /**
     * 需要注入的环境变量
     *
     * @default {}
     */
    inject?: Record<string, string | number>;
}

/**
 * 推送分支配置项
 */
export interface WorkflowPushOptions {
    /**
     * 临时文件夹目录路径
     */
    directory: string;
    /**
     * 源仓库地址
     */
    remote: string;
    /**
     * 提交信息
     */
    commitMessage: string;

    /**
     * 要推送到的目标分支名称
     */
    branch?: string;
}

/**
 * 检出代码配置项
 */
export interface WorkflowCheckoutOptions {
    /**
     * 检出代码的远端地址
     */
    remote: string;
    /**
     * 需要检出的分支
     */
    branch: string;
    /**
     * 检出代码的目录
     */
    directory?: string;
}

/**
 * 注入代码配置项
 */
export interface WorkflowInjectOptions {
    /**
     * 工作区目录
     */
    directory: string;

    /**
     * 需要注入的变量
     */
    variables?: Record<string, string | number>;
}
