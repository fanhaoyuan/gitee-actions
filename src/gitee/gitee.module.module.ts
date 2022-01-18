import { DynamicModule, Module } from '@nestjs/common';
import { PullRequestService, ConfigService, HttpService } from './services';
import { GiteeConfig } from './interfaces';
import { PullRequestController } from './controllers';
import { GITEE_OPTIONS } from './constants';

@Module({})
export class GiteeModule {
    static register(config: GiteeConfig): DynamicModule {
        if (!config.accessToken) {
            throw new Error('Gitee Module: access_token is not provided.');
        }

        return {
            providers: [{ provide: GITEE_OPTIONS, useValue: config }, PullRequestService, ConfigService, HttpService],
            exports: [PullRequestService],
            controllers: [PullRequestController],
            module: GiteeModule,
        };
    }
}
