import { GiteeUserDto } from './gitee-user-dto';

/**git commit 中的信息 */
export class GiteeCommitDTO {
    /**Commit Id */
    id: string;
    /**commit tree oid */
    tree_id: string;
    /**commit parent_ids */
    parent_ids: string[];
    /**commit 的信息 */
    message: string;
    /**commit 的时间 */
    timestamp: string;
    /**commit 对应的 Gitee url */
    url: string;
    /**作者信息 */
    author: GiteeUserDto;
    /**提交者信息 */
    committer: GiteeUserDto;
    /**特殊的 commit，没任何改动，如 tag */
    distinct: boolean;
    /**新加入的文件名 */
    added: string[] | null;
    /**被移除的文件名 */
    removed: string[] | null;
    /**修改过的文件名 */
    modified: string[] | null;
}
