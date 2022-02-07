import { WorkflowTriggerType } from '../../constants';
import { HTTP, SSH } from '../config';

export interface Push {
    /**触发类型 */
    readonly trigger: WorkflowTriggerType.PUSH;
    /**推送的分支名称 */
    readonly branch: string | null;
    /**工作区路径 */
    readonly folder: string;
    /**推送分支 */
    readonly ref: string;
    /**删除分支 */
    readonly deleted: boolean;
    /**创建新分支 */
    readonly created: boolean;
    /**仓库路径 */
    readonly remote: {
        ssh: SSH;
        http: HTTP;
    };
    /**推送用户信息 */
    readonly author: {
        id: number;
        name: string;
        remark?: string;
    };
    /**最后一次推送的信息 */
    readonly message: string;
    /**推送类型 */
    readonly type: 'tags' | 'branch';
    /**推送标签名称 */
    readonly tag: string | null;
}
