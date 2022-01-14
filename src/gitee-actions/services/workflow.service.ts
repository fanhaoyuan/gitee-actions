import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { exec } from '../utils';
import { WorkspaceService } from './workspace.service';
import { WorkflowTriggerType } from '../constants';

interface RunnerOptions {
    /**
     * 代码源仓库地址
     *
     * SSH or HTTPS
     */
    origin: string;

    /**
     * 临时工作区文件夹名称
     */
    dirName: string;

    /**
     * 源代码分支
     */
    branch: string;

    /**
     * 要推送到的分支
     *
     * 默认等于 `branch`
     */
    targetBranch?: string;
}

@Injectable()
export class WorkflowService {
    @Inject()
    private readonly workspaceService: WorkspaceService;

    @Inject()
    private readonly configService: ConfigService;

    /**
     * 运行工作流
     *
     * 拉取并推送代码
     */
    async run(type: WorkflowTriggerType, options: RunnerOptions) {
        const { dirName, origin, branch, targetBranch } = options;
        /**
         * 创建临时工作区
         */
        await this.workspaceService.setup(type, dirName);

        const workspacePath = this.workspaceService.getFolderAbsolutePath(type, dirName);

        /**
         * 检出代码
         */
        await this.checkout(origin, branch, workspacePath);

        /**
         * 推送代码到指定位置
         */
        await this.push(workspacePath, origin, branch, targetBranch);

        /**
         * 拉取最新代码到临时工作区
         */
        /**
         * 清理当前工作区
         */
        await this.workspaceService.cleanup(type, dirName);
    }

    /**
     * 检出对应代码
     * @param origin
     * @param branch
     * @param dirPath
     */
    async checkout(origin: string, branch: string, dirPath?: string) {
        let command = `git clone --no-tags -b ${branch} --single-branch ${origin}`;

        if (dirPath) {
            command = `${command} ${dirPath}`;
        }

        await exec(command);
    }

    /**
     * 进入临时文件夹推送代码
     * @param dirPath 临时文件夹目录路径
     * @param origin 源仓库地址
     * @param sourceBranch 源分支名称
     * @param targetBranch 要推送到的目标分支
     */
    async push(dirPath: string, origin: string, sourceBranch: string, targetBranch = sourceBranch) {
        const upstream = this.configService.getSourceURL(origin);

        return exec(`cd ${dirPath} && git push -f ${upstream} ${sourceBranch}:${targetBranch}`);
    }
}
