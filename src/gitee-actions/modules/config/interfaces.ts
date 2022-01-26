/**
 * 仓库地址类型
 */
export type RemoteMode = 'ssh' | 'http';

/**
 * 全局配置项
 */
export interface GlobalConfig {
    /**
     * 工作区目录路径
     *
     * @default
     * `${process.cwd()}/.workspace`
     */
    workspace?: string;

    /**
     * 配置项路径
     *
     * 内联配置 > 配置文件 > 默认配置
     *
     * 在配置文件中忽略该项
     *
     * @default
     * `${process.cwd()}/gitee.actions.config.*`
     */
    config?: string;

    /**
     * 仓库地址类型
     *
     * 如果是字符串，则两端均为同样的方式传输
     *
     * 如果是数组，第一项为 `gitee` 的传输方式，第二项为 `github` 的传输方式
     *
     * @default
     * 'ssh'
     */
    mode?: RemoteMode | [RemoteMode, RemoteMode];
}
