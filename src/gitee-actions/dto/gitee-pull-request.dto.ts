import { GiteeUserDto } from './gitee-user-dto';
import { GiteeMilestoneDto } from './gitee-milestone.dto';
import { GiteeBranchDto } from './gitee-branch.dto';

export class GiteePullRequestDto {
    readonly id: number;
    /**
     * 与上面 id 一致
     */
    readonly number: number;

    /**
     * PR 状态。eg：open
     */
    readonly state: string;

    /**
     * PR 在 Gitee 上 url。eg：https://gitee.com/oschina/pulls/1
     */
    readonly html_url: string;

    /**
     * PR diff 信息 url。eg：https://gitee.com/oschina/pulls/1.diff
     */
    readonly diff_url: string;

    /**
     * PR patch 信息 url。eg：https://gitee.com/oschina/pulls/1.patch
     */
    readonly patch_url: string;

    /**
     * PR 的标题。eg：这是一个 PR 标题
     */
    readonly title: string;

    /**
     * PR 的内容。eg：升级服务...
     */
    readonly body: string | null;

    /**
     * PR 的创建时间。eg：2020-01-01T00:00:00+08:00
     */
    readonly created_at: string;

    /**
     * PR 的更新时间。eg：2020-01-01T00:00:00+08:00
     */
    readonly updated_at: string;

    /**
     * PR 的关闭时间。eg：2020-01-01T00:00:00+08:00
     */
    readonly closed_at: string | null;

    /**
     * PR 的合并时间。eg：2020-01-01T00:00:00+08:00
     */
    readonly merged_at: string | null;

    /**
     * PR 合并产生的 commit id。eg：51b1acb1b4044fcdb2ff8a75ad15a4b655101754
     */
    readonly merge_commit_sha: string | null;

    /**
     * PR 的源分支目标。eg：refs/pull/1/MERGE
     */
    readonly merge_reference_name: string;

    /**
     * PR 的创建者。
     */
    readonly user: GiteeUserDto;

    /**
     * PR 的负责人。
     */
    readonly assignee: GiteeUserDto | null;

    /**
     * PR 的审核人。
     */
    readonly assignees: GiteeUserDto[] | null;

    /**
     * PR 的测试者。
     */
    readonly tester: GiteeUserDto | null;

    /**
     * PR 的所有测试者。
     */
    readonly testers: GiteeUserDto[] | null;

    /**
     * PR 是否需要测试。
     */
    readonly need_test: boolean;

    /**
     * PR 是否需要审核。
     */
    readonly need_review: boolean;

    /**
     * PR 所属的里程碑。
     */
    readonly milestone: GiteeMilestoneDto | null;

    /**
     * PR 的源分支。
     */
    readonly head: GiteeBranchDto | null;

    /**
     * PR 要合并的目标分支
     */
    readonly base: GiteeBranchDto;

    /**
     * PR 是否已合并。
     */
    readonly merged: boolean;

    /**
     * PR 是否可以合并。
     */
    readonly mergeable: boolean;

    /**
     * PR 的合并状态。eg：unchecked
     */
    readonly merge_status: string;

    /**
     * PR 的修改者。
     */
    readonly updated_by: GiteeUserDto | null;

    /**
     * PR 的总评论数量。
     */
    readonly comments: number;

    /**
     * PR 的总 commit 数量。
     */
    readonly commits: number;

    /**
     * PR 新增了多少行。
     */
    readonly additions: number;

    /**
     * PR 删除了多少行。
     */
    readonly deletions: number;

    /**
     * PR 修改了多少行。
     */
    readonly changed_files: number;
}
