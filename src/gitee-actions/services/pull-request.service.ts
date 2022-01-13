import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { WorkspaceService } from './workspace.service';
import { GitService } from './git.service';
import { ConfigService } from './config.service';
import { GiteePullRequestHooksDto } from '../dto';
import { PullRequestTrigger } from '../interfaces';
import { FolderType } from '../constants';

@Injectable()
export class PullRequestService {
    @Inject()
    readonly workspaceService: WorkspaceService;

    @Inject()
    readonly configService: ConfigService;

    @Inject()
    readonly gitService: GitService;

    /**
     * 文件夹类型
     *
     * 固定是 FolderType.PULL_REQUEST
     */
    private readonly _folderType = FolderType.PULL_REQUEST;

    /**
     * 获取目标目录的绝对地址
     * @param name 文件夹名称
     */
    private _getAbsolutePath(name: string) {
        return this.workspaceService.getFolderPath(`${this._folderType}/${name}`);
    }

    /**
     * 1. 在工作区内创建分支文件夹
     * 2. 从 Gitee 拉取最新代码
     * 3. 推送代码到 Github
     */
    async create(giteePullRequestHooksDto: GiteePullRequestHooksDto) {
        const {
            source_branch,
            repository: { ssh_url, id: repositoryId },
            pull_request: { id: pullRequestId },
        } = giteePullRequestHooksDto;

        const folderName = this.workspaceService.getFolderName(ssh_url, source_branch);

        const path = this._getAbsolutePath(folderName);

        const isExists = await fs.pathExists(path);

        if (isExists) {
            await this.workspaceService.removeFolder(this._folderType, folderName);
        }

        await this.workspaceService.createFolder(this._folderType, folderName);

        await this.gitService.pullFromRemote(ssh_url, source_branch, path);

        const sourceURL = this.configService.getSourceURL(ssh_url);

        await this.gitService.enterFolderAndForcePush(path, sourceURL, source_branch);

        await this.workspaceService.addInfoRecord(this._folderType, folderName, {
            repositoryId,
            pullRequestId,
        });
    }

    async update(giteePullRequestHooksDto: GiteePullRequestHooksDto) {
        const {
            source_branch,
            repository: { ssh_url },
        } = giteePullRequestHooksDto;

        const folderName = this.workspaceService.getFolderName(ssh_url, source_branch);

        const path = this._getAbsolutePath(folderName);

        const isExists = await fs.pathExists(path);

        if (!isExists) {
            await this.workspaceService.createFolder(this._folderType, folderName);

            await this.gitService.pullFromRemote(ssh_url, source_branch, path);
        }

        await this.gitService.enterFolderAndPull(path);

        const sourceURL = this.configService.getSourceURL(ssh_url);

        await this.gitService.enterFolderAndForcePush(path, sourceURL, source_branch);
    }

    async remove(giteePullRequestHooksDto: GiteePullRequestHooksDto) {
        const {
            source_branch,
            repository: { ssh_url },
        } = giteePullRequestHooksDto;

        const path = this._getAbsolutePath(this.workspaceService.getFolderName(ssh_url, source_branch));

        await fs.remove(path);

        const folderName = this.workspaceService.getFolderName(ssh_url, source_branch);

        await this.workspaceService.removeInfoRecord(this._folderType, folderName);
    }

    /**
     * 判断是不是需要触发CI的PR钩子
     * @param action 触发的钩子类型
     * @returns
     */
    async validActions(action: PullRequestTrigger) {
        return (this.configService.config.pullRequest?.trigger || []).includes(action);
    }
}
