import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotAcceptableException } from '@nestjs/common';
import { GiteePushHooksDTO } from '../dto';

/**
 * 检验是否是正确的钩子
 */
@Injectable()
export class ValidatorGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const { hook_name, deleted } = request.body as GiteePushHooksDTO;

        if (deleted) {
            throw new NotAcceptableException({
                message: '暂不支持删除操作触发工作流',
            });
        }

        const required = ['push_hooks', 'tag_push_hooks'];

        if (!required.includes(hook_name)) {
            throw new BadRequestException({
                message: '该钩子不符合条件',
                hook_name,
                required,
            });
        }

        return true;
    }
}
