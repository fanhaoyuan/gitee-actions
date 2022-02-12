import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExceptionsFilter } from './filters';
import { GiteeActionsModule, GlobalConfig } from './gitee-actions';
import { omit } from 'lodash';

function getAppModule(config: GlobalConfig = {}) {
    @Module({
        imports: [GiteeActionsModule.register(config)],
    })
    class AppModule {}

    return AppModule;
}

export async function bootstrap(config: GlobalConfig & { port?: number } = {}) {
    const AppModule = getAppModule(omit(config, 'port'));
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ExceptionsFilter());
    await app.listen(config.port || 3000);
}
