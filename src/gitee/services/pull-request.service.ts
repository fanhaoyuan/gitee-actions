import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { analyzeRemoteURL } from '../utils';
import { HttpService } from './http.service';

@Injectable()
export class PullRequestService {
    @Inject()
    private readonly config: ConfigService;

    @Inject()
    private readonly httpService: HttpService;

    /**
     * 评论 Pull Request
     * @param remote 仓库地址
     * @param number PR的序号
     * @param message 评论的信息
     */
    async comment(remote: string, number: number, message: string) {
        const { owner, repo } = analyzeRemoteURL(remote);

        await this.httpService.request({
            url: `/repos/${owner}/${repo}/pulls/${number}/comments`,
            method: 'post',
            data: {
                access_token: this.config.accessToken,
                body: message,
            },
        });

        return {
            message: '评论Pull Request成功',
        };
    }

    async getDetail(remote: string, pullRequestId: string, branch?: string) {
        const { data } = await this.getList(remote, {
            head: branch,
            state: 'all',
        });

        return data.find((item: any) => item.id === parseInt(pullRequestId));
    }

    async getList(
        remote: string,
        params: {
            head?: string;
            state?: 'open' | 'closed' | 'merged' | 'all';
        } = {}
    ) {
        const { owner, repo } = analyzeRemoteURL(remote);

        const response = await this.httpService.request({
            url: `/repos/${owner}/${repo}/pulls`,
            params: {
                access_token: this.config.accessToken,
                head: params.head,
                state: params.state,
            },
        });

        return {
            message: '获取PullRequest列表成功',
            data: response.data,
        };
    }
}
