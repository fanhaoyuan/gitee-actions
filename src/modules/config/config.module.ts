import { DynamicModule, Global, Module } from '@nestjs/common';
import { GlobalConfig } from './interfaces';
import { GLOBAL_CONFIG } from './constants';
import { ConfigService } from './config.service';

/**
 * 配置模块（全局模块）
 *
 * 动态注册模块
 */
@Global()
@Module({})
export class ConfigModule {
    static register(config: GlobalConfig): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: GLOBAL_CONFIG,
                    useValue: config,
                },
                ConfigService,
            ],
            exports: [ConfigService],
        };
    }
}
