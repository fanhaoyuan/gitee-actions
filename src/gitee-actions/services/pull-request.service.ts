import { Inject, Injectable } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { ConfigService } from './config.service';
import { GiteePullRequestHooksDto } from '../dto';
import { PullRequestTrigger } from '../interfaces';
import { WorkflowTriggerType } from '../constants';
import { WorkflowService } from './workflow.service';

@Injectable()
export class PullRequestService {
    private readonly _triggerType = WorkflowTriggerType.PULL_REQUEST;

    @Inject()
    private readonly workflowService: WorkflowService;

    @Inject()
    private readonly workspaceService: WorkspaceService;

    @Inject()
    private readonly configService: ConfigService;

    /**
     * 解析 DTO
     * @param dto
     */
    private _analyseDTO(dto: GiteePullRequestHooksDto) {
        const sourceBranch = dto.source_branch; //当前创建PR的分支名称
        const remoteURL = dto.repository.ssh_url; //当前创建PR的仓库名称
        const targetBranch = dto.target_branch; //当前PR要合并到的分支名称
        const projectId = dto.repository.id; //当前创建PR的仓库ID
        const pullRequestId = dto.pull_request.id; //当前PR的Id

        const baseFolderName = this.workspaceService.getNormalizedPath(remoteURL, `${pullRequestId}`); //工作区中的基础文件夹名称

        const sourceBranchFolderName = this.workspaceService.getNormalizedPath(baseFolderName, sourceBranch); //当前PR分支的文件夹名称

        const targetBranchFolderName = this.workspaceService.getNormalizedPath(baseFolderName, targetBranch); //当前要合并的PR分支文件夹名称

        const baseFolderPath = this.workspaceService.getFolderAbsolutePath(this._triggerType, baseFolderName); //工作区中的基础文件夹绝对路径

        const sourceBranchFolderPath = this.workspaceService.getFolderAbsolutePath(
            this._triggerType,
            sourceBranchFolderName
        ); //当前PR分支的文件夹绝对路径

        const targetBranchFolderPath = this.workspaceService.getFolderAbsolutePath(
            this._triggerType,
            targetBranchFolderName
        ); //当前要合并的PR分支文件夹绝对路径

        return {
            sourceBranch,
            remoteURL,
            targetBranch,
            projectId,
            pullRequestId,
            baseFolderName,
            baseFolderPath,
            sourceBranchFolderName,
            sourceBranchFolderPath,
            targetBranchFolderName,
            targetBranchFolderPath,
        };
    }

    async create(dto: GiteePullRequestHooksDto) {
        const { sourceBranch, remoteURL, sourceBranchFolderName } = this._analyseDTO(dto);

        await this.workflowService.run(this._triggerType, {
            origin: remoteURL,
            branch: sourceBranch,
            dirName: sourceBranchFolderName,
        });
    }

    update(dto: GiteePullRequestHooksDto) {
        return this.create(dto);
    }

    async merge(dto: GiteePullRequestHooksDto) {
        const { targetBranch, remoteURL, targetBranchFolderName } = this._analyseDTO(dto);

        await this.workflowService.run(this._triggerType, {
            origin: remoteURL,
            branch: targetBranch,
            dirName: targetBranchFolderName,
        });
    }

    /**
     * 判断是不是需要触发CI的PR钩子
     * @param action 触发的钩子类型
     * @returns
     */
    validActions(action: PullRequestTrigger) {
        return (this.configService.config.pullRequest?.trigger || []).includes(action);
    }
}
