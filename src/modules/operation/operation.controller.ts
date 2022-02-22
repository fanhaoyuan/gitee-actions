import { BadRequestException, Body, Controller, Inject, Post } from '@nestjs/common';
import { Remote } from '../config';
import { OperationService } from './operation.service';

@Controller('/gitee_actions/operation')
export class OperationController {
    @Inject()
    private readonly operationService: OperationService;

    @Post('/deploy')
    async deploy(@Body() body: { branch: string; remote: Remote; folder: string }) {
        const { branch, remote, folder } = body;

        if (!branch || !remote || !folder) {
            throw new BadRequestException({
                message: '请求参数错误，请检查参数后重试',
            });
        }

        await this.operationService.deploy(remote, branch, folder);

        return {
            message: '触发 Deploy 成功',
        };
    }
}
