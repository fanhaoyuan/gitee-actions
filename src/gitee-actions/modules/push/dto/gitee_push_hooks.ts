import { GiteeCommitDTO, GiteeEnterpriseDto, GiteeProjectDto, GiteeUserDto } from '../../../dto';

/**
 * Push / Tag Hook数据类型
 */
export class GiteePushHooksDTO {
    /**钩子 id */
    readonly hook_id: string;
    /**钩子路由 */
    readonly hook_url: string;
    /**钩子名 */
    readonly hook_name: 'push_hooks' | 'tag_push_hooks';
    /**钩子密码 */
    readonly password: string;
    /**触发钩子的时间戳 */
    readonly timestamp: number;
    /**钩子根据密钥计算的签名 */
    readonly sign: string;
    /**推送的分支 */
    readonly ref: string;
    /**推送前分支的 commit id */
    readonly before: string;
    /**推送后分支的 commit id */
    readonly after: string;
    /**推送包含的 commit 总数 */
    readonly total_commits_count?: number;
    /**推送包含的 commit 总数是否大于十二 */
    readonly commits_more_than_ten?: boolean;
    /**推送的是否是新分支 */
    readonly created: boolean;
    /**推送的是否是删除分支 */
    readonly deleted: boolean;
    /**推送的 commit 差异 url */
    readonly compare: string;
    /**推送的全部 commit 信息 */
    readonly commits: GiteeCommitDTO[] | null;
    /**推送最前面的 commit 信息 */
    readonly head_commit: GiteeCommitDTO;
    /**推送的目标仓库信息。 */
    readonly repository: GiteeProjectDto;
    /**推送的目标仓库信息 */
    readonly project: GiteeProjectDto;
    /**推送者的昵称 */
    readonly user_id: number;
    /**推送者的用户信息 */
    readonly user: GiteeUserDto;
    /**推送者的用户信息 */
    readonly pusher: GiteeUserDto;
    /**推送者的用户信息 */
    readonly sender: GiteeUserDto;
    /**推送的目标仓库所在的企业信息 */
    readonly enterprise: GiteeEnterpriseDto | null;
}
