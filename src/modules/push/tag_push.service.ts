import { Inject, Injectable } from '@nestjs/common';
import { WorkflowService, WorkflowRunnerOptions } from '../workflow';
import { exec } from '@/utils';
import { Push } from './interfaces';
import { ConfigService } from '../config';

@Injectable()
export class TagPushService {
    @Inject()
    private readonly workflowService: WorkflowService;

    @Inject()
    private readonly configService: ConfigService;

    trigger(push: Push) {
        const { tag, remote, folder, message } = push;

        return this.workflowService.run({
            checkout: this.checkout,
            branch: tag,
            remote: this.configService.getRemoteByURL('gitee', remote.http),
            message,
            inject: push,
            directory: folder,
        });
    }

    async checkout(options: WorkflowRunnerOptions) {
        const { branch, directory, remote } = options;
        let command = `git clone -b ${branch} --depth=1 ${remote}`;
        if (directory) {
            command = `${command} ${directory}`;
        }
        await exec(command);
    }
}
