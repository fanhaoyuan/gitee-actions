import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as path from 'path';
import * as fs from 'fs-extra';
import { WorkflowTriggerType } from '../constants';

/**
 * 工作空间服务
 */
@Injectable()
export class WorkspaceService {
    @Inject()
    private readonly configService: ConfigService;

    /**
     * 创建临时工作文件夹
     */
    async setup(type: WorkflowTriggerType, dirName: string) {
        /**
         * 以防上一次有未完成的工作区
         *
         * 先清理一次
         */
        await this.cleanup(type, dirName);

        const targetWorkspacePath = this.getFolderAbsolutePath(type, dirName);

        await fs.ensureDir(targetWorkspacePath); //创建文件夹
    }

    /**
     * 清理临时工作文件夹
     */
    async cleanup(type: WorkflowTriggerType, dirName: string) {
        const targetWorkspacePath = this.getFolderAbsolutePath(type, dirName);

        await fs.remove(targetWorkspacePath); //清理工作区文件夹
    }

    /**
     * 获取对应文件夹的绝对路径
     * @param type 触发类型
     * @param dirName 文件夹名称
     */
    getFolderAbsolutePath(type: WorkflowTriggerType, dirName: string) {
        return path.resolve(this.configService.workspaceDir, type, dirName);
    }

    /**
     * 获取格式化之后的路径
     * @param paths
     * @returns
     */
    getNormalizedPath(...paths: string[]) {
        return paths.map(p => p.replace(/\//g, '+')).join('+');
    }
}
