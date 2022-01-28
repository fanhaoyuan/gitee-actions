import { Module } from '@nestjs/common';
import { WorkspaceModule } from '../workspace';
import { WorkflowService } from './workflow.service';

@Module({
    imports: [WorkspaceModule],
    providers: [WorkflowService],
    exports: [WorkflowService],
})
export class WorkflowModule {}
