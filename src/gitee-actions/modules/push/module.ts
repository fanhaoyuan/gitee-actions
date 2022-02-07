import { Module } from '@nestjs/common';
import { PushController } from './controllers';
import { WorkspaceModule } from '../workspace';
import { PushService } from './services';
import { WorkflowModule } from '../workflow';

@Module({
    imports: [WorkspaceModule, WorkflowModule],
    controllers: [PushController],
    providers: [PushService],
    exports: [PushService],
})
export class PushModule {}
