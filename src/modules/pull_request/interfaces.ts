import { WorkflowTriggerType } from '../../constants';
import { SSH, HTTP, Owner, Repo } from '../config';

/**
 * 可以触发的 PR 钩子 action 类型
 */
export type PullRequestAction = 'open' | 'close' | 'update' | 'merge';

/**
 * PR 的更新类型
 */
export type PullRequestUpdateType = 'source_branch_changed' | 'target_branch_changed';

/**
 * 远端仓库信息
 */
export interface PullRequestRemote {
    /**
     * SSH 路径
     */
    ssh: SSH<'gitee'>;

    /**
     * HTTP 路径
     */
    http: HTTP<'gitee'>;
}

/**
 * 分支信息
 */
export interface PullRequestBranch {
    /**
     * 分支名称
     */
    branch: string;

    /**
     * 文件夹路径
     */
    folder: string;

    /**
     * 远端信息
     */
    remote: PullRequestRemote;
}

export interface PullRequestAuthor {
    /**
     * 用户 Id
     */
    id: number;

    /**
     * 用户名称
     */
    name: string;

    /**
     * 用户备注
     */
    remark: string;
}

/**
 * 当前需要合并到的分支信息
 */
export interface PullRequestTarget {
    /**
     * 分支名称
     */
    branch: string;

    /**
     * 文件夹信息
     */
    folder: string;
}

/**
 * 当前 PR 的信息
 */
export interface PullRequest {
    /**
     * 当前 PR 的 id
     */
    id: number;

    /**
     * 当前 PR 的序号
     */
    number: number;

    /**
     * 当前 PR 所在仓库的 Id
     */
    projectId: number;

    /**
     * 当前分支是否可以被合并
     */
    mergeable: boolean;

    /**
     * PR 的标题
     */
    title: string;

    /**
     * 源分支信息
     */
    source: PullRequestBranch;

    /**
     * 目标分支信息
     */
    target: PullRequestBranch;

    /**
     * PR 的作者信息
     */
    author: PullRequestAuthor;

    /**
     * PR 动作类型
     */
    action: PullRequestAction;

    /**
     * 触发器类型
     *
     * 固定是 `'pull_request'`
     */
    trigger: WorkflowTriggerType;

    /**
     * 更新类型
     */
    updateType: string | null;

    /**
     * 仓库所属
     */
    owner: Owner;

    /**
     * 仓库名称
     */
    repo: Repo;
}
