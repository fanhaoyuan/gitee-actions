import { Body, Controller, Inject, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ValidatorGuard } from '../guards';
import { Push } from '../interfaces';
import { TransformPipe } from '../pipes';
import { PushService, TagPushService } from '../services';

const success = (push: Push) => ({
    message: '触发成功',
    data: {
        branch: push.branch,
        tag: push.tag,
        type: push.type,
    },
});

@Controller('/gitee_actions/push')
@UseGuards(ValidatorGuard)
@UsePipes(TransformPipe)
export class PushController {
    @Inject()
    private readonly pushService: PushService;

    @Inject()
    private readonly tagPushService: TagPushService;

    @Post('/')
    push(@Body() push: Push) {
        if (push.type === 'tags') {
            this.tagPushService.trigger(push);
        } else {
            this.pushService.trigger(push);
        }

        return success(push);
    }
}
