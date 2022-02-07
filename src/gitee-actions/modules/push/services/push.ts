import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '../../config';
import { WorkflowService } from '../../workflow';
import { Push } from '../interfaces';

@Injectable()
export class PushService {
    @Inject()
    private readonly workflowService: WorkflowService;

    @Inject()
    private readonly configService: ConfigService;

    trigger(push: Push) {
        const { folder, remote, branch, message } = push;

        return this.workflowService.run({
            directory: folder,
            remote: this.configService.getRemoteByURL('gitee', remote.http),
            branch,
            message,
            inject: push,
        });
    }
}
