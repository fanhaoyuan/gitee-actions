export class GiteeUserDTO {
    readonly id?: number;

    /**
     * 用户的昵称。eg：红薯
     */
    readonly name: string;

    /**
     * 用户的邮箱。eg：git@oschina.cn
     */
    readonly email: string;

    /**
     * 用户的 Gitee 个人空间地址。eg：gitee
     */
    readonly username?: string;

    /**
     * 与上面的 username 一致。
     */
    readonly user_name?: string;

    /**
     * 用户的 Gitee 个人主页 url。eg：https://gitee.com/gitee
     */
    readonly url?: string;

    /**
     * 与上面的 username 一致。
     */
    readonly login?: string;

    /**
     * 用户头像 url。eg：https://gitee.com/assets/favicon.ico
     */
    readonly avatar_url?: string | null;

    /**
     * 与上面的 url 一致。
     */
    readonly html_url?: string | null;

    /**
     * 用户类型，目前固定为 User。
     */
    readonly type?: string;

    /**
     * 是不是管理员。
     */
    readonly site_admin?: boolean;

    /**
     * git commit 中的时间。eg：2020-01-01T00:00:00+08:00
     */
    readonly time?: string;

    /**
     * 用户备注名。eg：Ruby 大神
     */
    readonly remark?: string;
}
