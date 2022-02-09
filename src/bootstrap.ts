import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExceptionsFilter } from './filters';
import { GiteeActionsModule, GlobalConfig } from './gitee-actions';

function getAppModule(config: GlobalConfig = {}) {
    @Module({
        imports: [GiteeActionsModule.register(config)],
    })
    class AppModule {}

    return AppModule;
}

export async function bootstrap(config: GlobalConfig = {}) {
    const AppModule = getAppModule(config);
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ExceptionsFilter());
    await app.listen(3000);
}
