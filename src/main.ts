import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExceptionsFilter } from './filters';
import { GiteeActionsModule } from './gitee-actions';
@Module({
    imports: [GiteeActionsModule.register()],
})
class AppModule {}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ExceptionsFilter());
    await app.listen(3000);
}
bootstrap();
