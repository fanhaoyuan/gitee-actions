import { GiteeUserDTO } from './gitee_user';

export class GiteeNoteDTO {
    id: number;
    /**评论内容 */
    body: string;
    /**评论的作者信息 */
    user: GiteeUserDTO;
    /**评论的创建时间 */
    created_at: string;
    /**评论的更新时间 */
    updated_at: string;
    /**这条评论在 Gitee 上的 url */
    html_url: string;
    /**在代码 commit 评论中对应的代码位置 */
    position?: string;
    /**在代码 commit 评论中对应的 commit id */
    commit_id?: string;
}
