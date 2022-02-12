import {
    applyDecorators,
    CanActivate,
    ExecutionContext,
    Injectable,
    NotAcceptableException,
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PullRequestAction } from './interfaces';

/**
 * 预合并守卫
 *
 * 如果该分支不能被合并
 *
 * 则过滤请求
 */
@Injectable()
export class PremergeGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        const actions = this.reflector.get<PullRequestAction[]>('premerge', context.getHandler());

        const request = context.switchToHttp().getRequest();

        /**
         * 不是指定的 actions 则允许执行
         */
        if (!actions.includes(request.body.action)) {
            return true;
        }

        /**
         * 如果不能合并
         *
         * 则不允许执行
         */
        if (request.body.pull_request.mergeable) {
            return true;
        }

        throw new NotAcceptableException({
            message: '当前分支不可合并',
            data: {
                action: request.body.action,
                number: request.body.number,
                title: request.body.title,
            },
        });
    }
}

/**
 * 预合并过滤器
 */
export const Premerge = (actions: PullRequestAction | PullRequestAction[]) => {
    const _actions = typeof actions === 'string' ? [actions] : actions;

    return applyDecorators(SetMetadata('premerge', _actions), UseGuards(PremergeGuard));
};
