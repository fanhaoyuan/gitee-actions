import { Inject, Injectable, PipeTransform } from '@nestjs/common';
import { GiteePullRequestHooksDTO } from '@/dto';
import { WorkflowTriggerType } from '@/constants';
import { WorkspaceService } from '../workspace';
import { PullRequest } from './interfaces';
import { ConfigService } from '../config';

@Injectable()
export class TransformPipe implements PipeTransform {
    private readonly _triggerType = WorkflowTriggerType.PULL_REQUEST;

    @Inject()
    private readonly configService: ConfigService;

    @Inject()
    private readonly workspaceService: WorkspaceService;

    transform(value: GiteePullRequestHooksDTO): PullRequest {
        const sourceBranch = value.source_branch; //当前创建PR的分支名称
        const remoteURL = value.repository.ssh_url; //当前创建PR的仓库名称
        const targetBranch = value.target_branch; //当前PR要合并到的分支名称

        const sourceBranchFolder = this.workspaceService.getDirectory(this._triggerType, remoteURL, sourceBranch); //当前PR分支的文件夹路径

        const targetBranchFolder = this.workspaceService.getDirectory(this._triggerType, remoteURL, targetBranch); //当前要合并的PR分支文件夹路径

        const [owner, repo] = this.configService.resolveURL(remoteURL);

        return {
            id: value.pull_request.id,
            projectId: value.repository.id,
            number: value.number,
            mergeable: value.pull_request.mergeable,
            title: value.title,
            owner,
            repo,
            source: {
                branch: sourceBranch,
                folder: sourceBranchFolder,
                remote: {
                    ssh: value.source_repo.repository.ssh_url,
                    http: value.source_repo.repository.git_http_url,
                },
            },
            target: {
                branch: targetBranch,
                folder: targetBranchFolder,
                remote: {
                    ssh: value.repository.ssh_url,
                    http: value.repository.git_http_url,
                },
            },
            author: {
                id: value.author.id,
                name: value.author.name,
                remark: value.author.remark,
            },
            action: value.action,
            trigger: this._triggerType,
            updateType: value.action === 'update' ? value.action_desc : null,
        };
    }
}
