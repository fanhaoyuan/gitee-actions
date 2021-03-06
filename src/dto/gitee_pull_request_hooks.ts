import { GiteeEnterpriseDTO } from './gitee_enterprise';
import { GiteeProjectDTO } from './gitee_project';
import { GiteePullRequestDTO } from './gitee_pull_request';
import { GiteeUserDTO } from './gitee_user';

export class GiteePullRequestHooksDTO {
    /**钩子 id */
    readonly hook_id: string;
    /**钩子路由 */
    readonly hook_url: string;
    /**
     * 钩子名，固定为 merge_request_hooks
     */
    readonly hook_name: 'merge_request_hooks';

    /**
     * 钩子密码。eg：123456
     */
    readonly password: string;

    /**
     * 触发钩子的时间戳。eg: 1576754827988
     */
    readonly timestamp: number;

    /**
     * 钩子根据密钥计算的签名。eg: "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA="
     */
    readonly sign: string;

    /**
     * PR 状态。eg：open
     */
    readonly action: 'open' | 'update' | 'close' | 'merge';

    /**
     * PR 描述
     */
    readonly action_desc: string;

    /**
     * PR 的信息。
     */
    readonly pull_request: GiteePullRequestDTO;

    /**
     *  PR 的 序号
     */
    readonly number: number;

    /**
     * 与上面 number 一致。
     */
    readonly iid: number;

    /**
     * PR 的标题。eg：这是一个 PR 标题
     */
    readonly title: string;

    /**
     * PR 的内容。eg：升级服务...
     */
    readonly body: string | null;

    /**
     * PR 状态。eg：open
     */
    readonly state: string;

    /**
     * PR 的合并状态。eg：unchecked
     */
    readonly merge_status: string;

    /**
     * PR 合并产生的 commit id。eg：51b1acb1b4044fcdb2ff8a75ad15a4b655101754
     */
    readonly merge_commit_sha: string;

    /**
     * PR 在 Gitee 上 url。eg：https://gitee.com/oschina/pulls/1
     */
    readonly url: string;

    /**
     * PR 的源分支名。eg：fixbug
     */
    readonly source_branch: string | null;

    readonly source_repo: {
        /**
         * PR 的源仓库信息。
         */
        project: GiteeProjectDTO;
        /**
         * PR 的源仓库信息。
         */
        repository: GiteeProjectDTO;
    } | null;

    /**
     * PR 的目标分支名。master
     */
    readonly target_branch: string;

    readonly target_repo: {
        /**
         * PR 的目标仓库信息。
         */
        project: GiteeProjectDTO;
        /**PR 的目标仓库信息。 */
        repository: GiteeProjectDTO;
    };

    /**
     * PR 的目标仓库信息。
     */
    readonly project: GiteeProjectDTO;

    /**
     * PR 的目标仓库信息。
     */
    readonly repository: GiteeProjectDTO;

    /**
     * PR 的创建者信息。
     */
    readonly author: GiteeUserDTO;

    /**
     * PR 的更新者信息。
     */
    readonly updated_by: GiteeUserDTO;

    /**
     * PR 的更新者信息。
     */
    readonly sender: GiteeUserDTO;

    /**
     * 被委托处理 PR 的用户信息。
     */
    readonly target_user: GiteeUserDTO | null;

    /**
     * PR 仓库所在的企业信息
     */
    readonly enterprise: GiteeEnterpriseDTO | null;
}
