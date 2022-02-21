import { GiteeNoteDTO } from './gitee_note';
import { GiteeProjectDTO } from './gitee_project';
import { GiteeUserDTO } from './gitee_user';
import { GiteeIssueDTO } from './gitee_issue';
import { GiteePullRequestDTO } from './gitee_pull_request';
import { GiteeEnterpriseDTO } from './gitee_enterprise';

export class GiteeCommentHooksDTO {
    /**钩子 id */
    readonly hook_id: number;
    /**钩子路由 */
    readonly hook_url: string;
    /**钩子名 */
    readonly hook_name: 'note_hooks';
    /**钩子密码 */
    readonly password: string;
    /**触发钩子的时间戳 */
    readonly timestamp: number;
    /**钩子根据密钥计算的签名 */
    readonly sign: string;
    /**评论的动作 */
    readonly action: string;
    /**评论的数据信息 */
    readonly comment: GiteeNoteDTO;
    /**评论所在仓库的信息 */
    readonly repository: GiteeProjectDTO;
    /**评论所在仓库的信息 */
    readonly project: GiteeProjectDTO | null;
    /**评论的作者信息 */
    readonly author: GiteeUserDTO;
    /**评论的作者信息 */
    readonly sender: GiteeUserDTO;
    /**这条评论在 Gitee 上的 url */
    readonly url: string;
    /**评论内容 */
    readonly note: string;
    /**被评论的目标类型 */
    readonly noteable_type: 'Comment' | 'Commit' | 'PullRequest' | 'Issue';
    /**被评论的目标 id */
    readonly noteable_id: number;
    /**被评论的 Issue 信息。 */
    readonly issue?: GiteeIssueDTO;
    /**被评论的 PR 信息 */
    readonly pull_request?: GiteePullRequestDTO;
    /**被评论的目标标题 */
    readonly title: string | null;
    /**被评论的目标标识 */
    readonly per_iid: string;
    /**被平路的 commit 提交中的简短 sha */
    readonly short_commit_id: string | null;
    /**被评论的目标所在的企业信息。 */
    readonly enterprise: GiteeEnterpriseDTO | null;
}
