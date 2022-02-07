import { Inject, Injectable, PipeTransform } from '@nestjs/common';
import { WorkflowTriggerType } from '../../../constants';
import { WorkspaceService } from '../../workspace';
import { GiteePushHooksDTO } from '../dto';
import { Push } from '../interfaces';

/**
 * 转换 DTO 的管道
 */
@Injectable()
export class TransformPipe implements PipeTransform {
    private readonly _triggerType = WorkflowTriggerType.PUSH;

    @Inject()
    private readonly workspaceService: WorkspaceService;

    transform(dto: GiteePushHooksDTO): Push {
        const { deleted, created, ref, repository, pusher, head_commit } = dto;

        const trigger = this._triggerType;
        const branch = ref.replace('refs/heads/', '');
        const remote = repository.ssh_url;
        const folder = this.workspaceService.getDirectory(trigger, remote, branch);

        return {
            trigger,
            branch,
            folder,
            ref,
            deleted,
            created,
            remote: {
                ssh: repository.git_ssh_url,
                http: repository.git_http_url,
            },
            author: {
                id: pusher.id,
                name: pusher.name,
                remark: pusher.remark || null,
            },
            message: head_commit.message,
        };
    }
}
