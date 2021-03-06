import { Body, Controller, Inject, Post, UseGuards, UsePipes } from '@nestjs/common';
import { Actions } from './actions.guard';
import { Premerge } from './premerge.guard';
import { Update } from './update.guard';
import { TransformPipe } from './transform.pipe';
import { PullRequest } from './interfaces';
import { PullRequestService } from './pull_request.service';
import { ValidatorGuard } from './validator.guard';

const success = (pr: PullRequest) => ({
    message: 'è§Šćæć',
    data: {
        action: pr.action,
    },
});

@Controller('/gitee_actions/pull_request')
@UseGuards(ValidatorGuard)
@UsePipes(TransformPipe)
export class PullRequestController {
    @Inject()
    private readonly pullRequestService: PullRequestService;

    @Post('/')
    @Actions(['open', 'update', 'merge'])
    @Premerge(['open', 'update'])
    pullRequest(@Body() pr: PullRequest) {
        const { action } = pr;

        if (action === 'open') {
            return this.open(pr);
        }

        if (action === 'update') {
            return this.update(pr);
        }

        if (action === 'merge') {
            return this.merge(pr);
        }
    }

    @Post('/open')
    @Actions('open')
    @Premerge('open')
    open(@Body() pr: PullRequest) {
        this.pullRequestService.create(pr);
        return success(pr);
    }

    @Post('/update')
    @Actions('update')
    @Update()
    @Premerge('update')
    update(@Body() pr: PullRequest) {
        this.pullRequestService.update(pr);
        return success(pr);
    }

    @Post('merge')
    @Actions('merge')
    merge(@Body() pr: PullRequest) {
        this.pullRequestService.merge(pr);
        return success(pr);
    }

    @Post('close')
    @Actions('close')
    close(@Body() pr: PullRequest) {
        this.pullRequestService.close(pr);
        return success(pr);
    }
}
