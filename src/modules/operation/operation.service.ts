import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { WorkflowService } from '../workflow';
import { ConfigService, Remote } from '../config';

@Injectable()
export class OperationService {
    @Inject()
    private readonly workflow: WorkflowService;

    @Inject()
    private readonly configService: ConfigService;

    async deploy(remote: Remote, branch: string, directory: string) {
        if (fs.pathExists(directory)) {
            await fs.remove(directory);
        }

        const githubRemoteURL = this.configService.getRemoteByURL('github', remote);

        await this.workflow.checkout({
            remote: githubRemoteURL,
            branch,
            directory,
        });
    }
}
