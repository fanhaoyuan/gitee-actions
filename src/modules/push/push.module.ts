import { Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { WorkspaceModule } from '../workspace';
import { PushService } from './push.service';
import { TagPushService } from './tag_push.service';
import { WorkflowModule } from '../workflow';

@Module({
    imports: [WorkspaceModule, WorkflowModule],
    controllers: [PushController],
    providers: [PushService, TagPushService],
    exports: [PushService, TagPushService],
})
export class PushModule {}
