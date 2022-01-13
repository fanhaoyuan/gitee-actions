import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as path from 'path';
import * as fs from 'fs-extra';
import { FolderType } from '../constants';

/**
 * 工作空间服务
 */
@Injectable()
export class WorkspaceService {
    constructor(private readonly configService: ConfigService) {
        fs.ensureFileSync(this.infoMapPath);
    }

    /**
     * 工作区路径
     */
    get infoMapPath() {
        return `${this.configService.workspaceDir}/.info.json`;
    }

    /**
     * 添加对应目录的信息记录
     * @param type 文件夹类型
     * @param name 文件夹名称
     * @param record 记录信息
     */
    async addInfoRecord(type: FolderType, name: string, record: Record<string, any>) {
        const json = await fs.readJSON(this.infoMapPath);

        if (!json[type]) {
            return await fs.writeJSON(this.infoMapPath, {
                [type]: {
                    [name]: record,
                },
            });
        }

        await fs.writeJSON(this.infoMapPath, {
            [name]: record,
        });
    }

    /**
     * 删除对应文件夹的信息记录
     * @param type 文件夹类型
     * @param name 文件夹名称
     */
    async removeInfoRecord(type: FolderType, name: string) {
        const json = await fs.readJSON(this.infoMapPath);

        if (!json[type]) {
            return;
        }

        const target = json[type];

        delete json[type][name];

        await fs.writeJSON(this.infoMapPath, {
            [type]: target,
        });
    }

    /**
     * 获取对应文件夹的信息记录
     * @param type 文件夹类型
     * @param name 文件夹名称
     */
    async getInfoRecord(type: FolderType, name: string) {
        const json = await fs.readJSON(this.infoMapPath);

        return json?.[type]?.[name] ?? {};
    }

    /**
     * 创建文件夹
     * @param type 文件夹类型
     * @param name 文件夹名称
     */
    createFolder(type: FolderType, name: string) {
        const absolutePath = this.getFolderPath(this.getRelativePath(type, name));
        return fs.ensureDir(absolutePath);
    }

    /**
     * 获取绝对文件夹路径
     * @param relativePath 相对于 workspaceDir 的路径
     */
    getFolderPath(relativePath: string) {
        return path.resolve(this.configService.workspaceDir, relativePath);
    }

    /**
     *
     * @param name
     * @returns
     */
    getFolderName(...name: string[]) {
        return this.normalizePath(name.join('+'));
    }

    getRelativePath(type: FolderType, name: string) {
        return `${type}/${name}`;
    }

    normalizePath(path: string) {
        return path.replace(/\//g, '+');
    }

    /**
     * 删除文件夹
     * @param type 文件夹类型
     * @param name 文件夹名称
     */
    removeFolder(type: FolderType, name: string) {
        const absolutePath = this.getFolderPath(this.getRelativePath(type, name));
        return fs.remove(absolutePath);
    }
}
