import { Body, Controller, Inject, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ValidatorGuard } from '../guards';
import { Push } from '../interfaces';
import { TransformPipe } from '../pipes';
import { PushService } from '../services';

const success = (push: Push) => ({
    message: '触发成功',
    data: {
        branch: push.branch,
    },
});

@Controller('/gitee_actions/push')
@UseGuards(ValidatorGuard)
@UsePipes(TransformPipe)
export class PushController {
    @Inject()
    private readonly pushService: PushService;

    @Post('/')
    push(@Body() push: Push) {
        this.pushService.trigger(push);
        return success(push);
    }
}
