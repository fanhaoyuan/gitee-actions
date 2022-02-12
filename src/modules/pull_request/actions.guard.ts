import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotAcceptableException,
    applyDecorators,
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PullRequestAction } from './interfaces';

/**
 * PR 动作守卫
 *
 * 过滤不允许操作的动作
 */
@Injectable()
export class ActionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext) {
        const actions = this.reflector.get<PullRequestAction[]>('actions', context.getHandler());

        /**
         * 如果没有指定 actions 则允许执行
         */
        if (!actions) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        /**
         * 如果 dto 中的触发类型符合内容
         */
        if (actions.includes(request.body.action)) {
            return true;
        }

        throw new NotAcceptableException({
            message: '当前触发条件不符合',
            data: {
                action: request.body.action,
                required: actions,
                number: request.body.number,
                title: request.body.title,
            },
        });
    }
}

/**
 * 允许执行的 Pull_Request 类型
 * @param actions
 * @returns
 */
export const Actions = (actions: PullRequestAction | PullRequestAction[]) => {
    const _actions = typeof actions === 'string' ? [actions] : actions;

    return applyDecorators(SetMetadata('actions', _actions), UseGuards(ActionsGuard));
};
