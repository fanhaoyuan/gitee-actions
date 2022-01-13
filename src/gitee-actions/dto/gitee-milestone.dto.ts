export class GiteeMilestoneDto {
    /**
     * Gitee 上对应的 url。eg：https://gitee.com/oschina/git-osc/milestones/1
     */
    readonly html_url: string;

    readonly id: number;

    /**
     * 与上面的 id 一致
     */
    readonly number: number;

    /**
     * 里程碑的标题。eg：开源计划
     */
    readonly title: string;
    /**
     * 里程碑的详细描述。eg：走向世界
     */
    readonly description: string | null;

    /**
     * 开启状态的 issue 数量
     */
    readonly open_issues: number;

    /**
     * 关闭状态的 issue 数量
     */
    readonly closed_issues: number;

    /**
     * 里程碑的状态。eg：open
     */
    readonly state: string;

    /**
     * 里程碑创建的时间。eg：2020-01-01T00:00:00+08:00
     */
    readonly created_at: string;

    /**
     * 里程碑更新的时间。eg：2020-01-01T00:00:00+08:00
     */
    readonly updated_at: string;

    /**
     * 里程碑结束的时间。eg：2020-01-01T00:00:00+08:00
     */
    readonly due_on: string | null;
}
