import { Body, Controller, Inject, Post } from '@nestjs/common';
import { GiteePullRequestHooksDto } from './dto';
import { PullRequestService } from './services';

@Controller('gitee_actions')
export class GiteeActionsController {
    @Inject()
    private readonly pullRequestService: PullRequestService;

    @Post('pull_request')
    async withPullRequest(@Body() giteePullRequestHooksDto: GiteePullRequestHooksDto) {
        if (!this.pullRequestService.validActions(giteePullRequestHooksDto.action)) {
            return {
                code: 200,
                message: '该钩子不需要触发CI',
            };
        }

        const { action } = giteePullRequestHooksDto;

        switch (action) {
            case 'open':
                this.pullRequestService.create(giteePullRequestHooksDto);
                break;

            case 'update':
                this.pullRequestService.update(giteePullRequestHooksDto);
                break;

            case 'merge':
                this.pullRequestService.merge(giteePullRequestHooksDto);
                break;

            case 'close':
                // this.pullRequestService.remove(giteePullRequestHooksDto);
                break;
        }

        return {
            code: 200,
            message: '触发CI成功',
        };
    }
}
