import { GiteeUserDto } from './gitee-user-dto';
import { SSH, HTTP } from '../modules/config';

export class GiteeProjectDto {
    readonly id: number;

    /**
     *  仓库名。eg：gitee
     */
    readonly name: string;

    /**
     * 仓库所属的空间地址。eg：oschian
     */
    readonly path: string;

    /**
     * 完整的名字，name + path。eg：gitee/oschian
     */
    readonly full_name: string;

    /**
     * 仓库的所有者。
     */
    readonly owner: GiteeUserDto;

    /**
     *  是否公开。
     */
    readonly private: boolean;

    /**
     * 对应 Gitee 的 url。eg：https://gitee.com/oschina/git-osc
     */
    readonly html_url: string;

    /**
     * 与上面 html_url 一致
     */
    readonly url: string;

    /**
     * 仓库描述。eg：这是一个开源仓库...
     */
    readonly description: string;

    /**
     * 是不是 fork 仓库。
     */
    readonly fork: boolean;

    /**
     * 仓库的创建时间。eg：2020-01-01T00:00:00+08:00
     */
    readonly created_at: string;

    /**
     * 仓库的更新时间。eg：2020-01-01T00:00:00+08:00
     */
    readonly updated_at: string;

    /**
     * 仓库的最近一次推送时间。eg：2020-01-01T00:00:00+08:00
     */
    readonly pushed_at: string;

    /**
     * 仓库的 git 地址。eg：git://gitee.com:oschina/git-osc.git
     */
    readonly git_url: string;

    /**
     * 仓库的 ssh 地址。eg：git@gitee.com:oschina/git-osc.git
     */
    readonly ssh_url: SSH<'gitee'>;

    /**
     * 仓库的 clone 地址。eg：https://gitee.com/oschina/git-osc.git
     */
    readonly clone_url: HTTP<'gitee'>;

    /**
     * 仓库的 svn 地址。eg：svn://gitee.com/oschina/git-osc
     */
    readonly svn_url: string;

    /**
     * 与上面的 clone_url 一致。
     */
    readonly git_http_url: HTTP<'gitee'>;

    /**
     * 与上面的 ssh_url 一致。
     */
    readonly git_ssh_url: SSH<'gitee'>;

    /**
     * 与上面的 svn_url 一致。
     */
    readonly git_svn_url: string;

    /**
     * 仓库的网页主页。eg：https://gitee.com
     */
    readonly homepage: string | null;

    /**
     * 仓库的 star 数量。
     */
    readonly stargazers_count: number;

    /**
     * 仓库的 watch 数量。
     */
    readonly watchers_count: number;

    /**
     * 仓库的 fork 数量。
     */
    readonly forks_count: number;

    /**
     * 仓库的编程语言。eg： Ruby
     */
    readonly language: string;

    /**
     * 仓库的是否开启了 issue 功能。
     */
    readonly has_issues: boolean;

    /**
     * 仓库的是否开启了 wiki 功能。
     */
    readonly has_wiki: boolean;

    /**
     * 仓库的是否开启了 page 服务。
     */
    readonly has_pages: boolean;

    /**
     * 仓库的开源协议。eg：MIT
     */
    readonly license: string | null;

    /**
     * 仓库开启状态的 issue 总数。
     */
    readonly open_issues_count: number;

    /**
     * 仓库的默认复制。eg：master
     */
    readonly default_branch: string;

    /**
     * 仓库所属的 Gitee 地址。eg：oschina
     */
    readonly namespace: string;

    /**
     * 与上面的 full_name 一致。
     */
    readonly name_with_namespace: string;

    /**
     * 仓库的在 Gitee 的资源唯一标识。eg：oschia/git-osc
     */
    readonly path_with_namespace: string;
}
