import { Module } from '@nestjs/common';
import { PushController } from './controllers';
import { WorkspaceModule } from '../workspace';
import { PushService, TagPushService } from './services';
import { WorkflowModule } from '../workflow';

@Module({
    imports: [WorkspaceModule, WorkflowModule],
    controllers: [PushController],
    providers: [PushService, TagPushService],
    exports: [PushService, TagPushService],
})
export class PushModule {}
