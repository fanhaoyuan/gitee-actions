import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GiteePullRequestHooksDTO } from '@/dto';

/**
 * 检验是否是正确的钩子
 */
@Injectable()
export class ValidatorGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const { hook_name } = request.body as GiteePullRequestHooksDTO;

        const required = 'merge_request_hooks';

        if (hook_name !== required) {
            throw new BadRequestException({
                message: '该钩子不符合条件',
                hook_name,
                required,
            });
        }

        return true;
    }
}
