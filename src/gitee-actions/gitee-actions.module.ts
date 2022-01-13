import { DynamicModule, Module } from '@nestjs/common';
import { GITEE_ACTIONS_OPTIONS } from './constants';
import { GiteeActionsController } from './gitee-actions.controller';
import { GiteeActionsOptions } from './interfaces';
import { PullRequestService, ConfigService, WorkspaceService, GitService } from './services';

@Module({})
export class GiteeActionsModule {
    static register(config: GiteeActionsOptions = {}): DynamicModule {
        return {
            module: GiteeActionsModule,
            controllers: [GiteeActionsController],
            providers: [
                {
                    provide: GITEE_ACTIONS_OPTIONS,
                    useValue: config,
                },
                PullRequestService,
                ConfigService,
                WorkspaceService,
                GitService,
            ],
        };
    }
}
