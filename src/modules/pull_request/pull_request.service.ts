import { WorkflowTriggerType } from '@/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '../config';
import { WorkflowService } from '../workflow';
import { PullRequest } from './interfaces';

@Injectable()
export class PullRequestService {
    @Inject()
    private readonly workflowService: WorkflowService;

    @Inject()
    private readonly configService: ConfigService;

    create(pr: PullRequest) {
        const { source, target, title } = pr;

        const directory = source.folder;

        const runner = () => {
            return this.workflowService.merge({
                directory,
                targetBranch: target.branch,
                targetRemote: this.configService.getRemoteByURL('gitee', target.remote.http),
            });
        };

        return this.workflowService.run(
            {
                directory,
                branch: source.branch,
                remote: this.configService.getRemoteByURL('gitee', source.remote.http),
                message: title,
                inject: pr,
                triggerType: WorkflowTriggerType.PULL_REQUEST,
            },
            runner
        );
    }

    update(pr: PullRequest) {
        return this.create(pr);
    }

    async merge(pr: PullRequest) {
        const { target, title } = pr;

        const directory = target.folder;

        await this.workflowService.run({
            directory,
            remote: this.configService.getRemoteByURL('gitee', target.remote.http),
            message: title,
            branch: target.branch,
            inject: pr,
            triggerType: WorkflowTriggerType.PULL_REQUEST,
        });
    }

    close(pr: PullRequest) {
        return this.create(pr);
    }
}
