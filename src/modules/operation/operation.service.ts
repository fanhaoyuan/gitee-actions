import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { WorkflowService } from '../workflow';
import { Remote } from '../config';

@Injectable()
export class OperationService {
    @Inject()
    private readonly workflow: WorkflowService;

    async deploy(remote: Remote, branch: string, directory: string) {
        if (fs.pathExists(directory)) {
            await fs.remove(directory);
        }

        await this.workflow.checkout({
            remote,
            branch,
            directory,
        });
    }
}
