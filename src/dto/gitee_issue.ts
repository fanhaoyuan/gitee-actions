import { GiteeMilestoneDTO } from './gitee_milestone';
import { GiteeUserDTO } from './gitee_user';
import { GiteeLabelDTO } from './gitee_label';

export class GiteeIssueDTO {
    /**issue 对应的标识 */
    id: number;
    /** Gitee 上对应的 url */
    html_url: string;
    /**issue 标题 */
    title: string;
    /**issue 创建者 */
    user: GiteeUserDTO;
    /**issue 对应的标签 */
    labels: GiteeLabelDTO[] | null;
    /**issue 状态 */
    state: string;
    /**issue 状态名 */
    state_name: string;
    /**issue 类型 */
    type_name: string;
    /**issue 负责人 */
    assignee: GiteeUserDTO | null;
    /**issue 协助者 */
    collaborators: GiteeUserDTO | null;
    /**issue 所属的里程碑 */
    milestone: GiteeMilestoneDTO | null;
    /**issue 的评论总数 */
    comments: number;
    /**issue 的创建时间 */
    created_at: string;
    /**issue 的更新时间 */
    updated_at: string;
    /**issue 的内容体 */
    body: string;
}
