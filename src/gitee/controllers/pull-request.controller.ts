import { Body, Controller, Post, Param, Inject } from '@nestjs/common';
import { PullRequestService } from '../services';

@Controller('gitee/pull_request/:pull_request_id')
export class PullRequestController {
    @Inject()
    private readonly pullRequestService: PullRequestService;

    @Post('comment')
    async comment(
        @Param('pull_request_id') pull_request_id: string,
        @Body()
        data: {
            remote: string;
            message: string;
            branch: string;
        }
    ) {
        const { remote, branch, message } = data;

        const pullRequest = await this.pullRequestService.getDetail(remote, pull_request_id, branch);

        return await this.pullRequestService.comment(remote, pullRequest.number, message);
    }
}
