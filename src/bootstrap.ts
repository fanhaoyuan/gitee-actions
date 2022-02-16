import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExceptionsFilter } from './filters';
import { GiteeActionsModule } from './gitee_actions.module';
import { omit } from 'lodash';
import { GlobalConfig } from './modules';

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
