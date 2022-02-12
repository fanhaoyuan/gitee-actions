import {
    Injectable,
    CanActivate,
    Inject,
    ExecutionContext,
    NotAcceptableException,
    applyDecorators,
    UseGuards,
} from '@nestjs/common';
import { ConfigService } from '../config';

/**
 * 更新触发类型守卫
 *
 * 过滤不需要触发的更新类型
 */
@Injectable()
export class UpdateGuard implements CanActivate {
    @Inject()
    configService: ConfigService;

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const type = request.body.action_desc;

        const required = this.configService.config.pr.updateTriggerType;

        if (required.includes(type)) {
            return true;
        }

        throw new NotAcceptableException({
            message: '当前更新触发条件不符合',
            data: {
                type,
                required,
                number: request.body.number,
                title: request.body.title,
            },
        });
    }
}

export const Update = () => applyDecorators(UseGuards(UpdateGuard));
