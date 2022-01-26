import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { ConfigService } from '../config';

@Injectable()
export class WorkspaceService {
    @Inject() private readonly configService: ConfigService;

    /**
     * 创建临时工作文件夹
     */
    async setup(directory: string) {
        /**
         * 以防上一次有未完成的工作区
         *
         * 先清理一次
         */
        await this.cleanup(directory);

        await fs.ensureDir(directory); //创建文件夹
    }

    /**
     * 清理临时工作文件夹
     */
    async cleanup(directory: string) {
        await fs.remove(directory); //清理工作区文件夹
    }

    /**
     * 获取对应文件夹路径
     * @param paths
     */
    getDirectory(...paths: string[]) {
        return path.resolve(this.configService.workspace, paths.map(p => p.replace(/\//g, '+')).join('+'));
    }
}
