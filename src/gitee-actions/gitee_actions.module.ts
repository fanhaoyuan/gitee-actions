import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, GlobalConfig, PullRequestModule, PushModule } from './modules';

@Module({})
export class GiteeActionsModule {
    static register(config: GlobalConfig = {}): DynamicModule {
        return {
            module: GiteeActionsModule,
            imports: [ConfigModule.register(config), PullRequestModule, PushModule],
        };
    }
}
