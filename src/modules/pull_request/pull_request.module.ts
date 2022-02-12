import { Module } from '@nestjs/common';
import { PullRequestController } from './pull_request.controller';
import { WorkspaceModule } from '../workspace';
import { WorkflowModule } from '../workflow';
import { PullRequestService } from './pull_request.service';

@Module({
    imports: [WorkspaceModule, WorkflowModule],
    controllers: [PullRequestController],
    providers: [PullRequestService],
    exports: [PullRequestService],
})
export class PullRequestModule {}
