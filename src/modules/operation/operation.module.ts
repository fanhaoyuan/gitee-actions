import { Module } from '@nestjs/common';
import { OperationController } from './operation.controller';
import { WorkflowModule } from '../workflow';
import { OperationService } from './operation.service';

@Module({
    imports: [WorkflowModule],
    providers: [OperationService],
    controllers: [OperationController],
})
export class OperationModule {}
