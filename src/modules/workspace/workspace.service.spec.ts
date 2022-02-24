import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '../config';
import { WorkspaceService } from './workspace.service';
import * as fs from 'fs-extra';
import * as path from 'path';

describe('WorkspaceService', () => {
    let workspaceService: WorkspaceService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WorkspaceService],
            imports: [ConfigModule.register({})],
        }).compile();

        workspaceService = module.get<WorkspaceService>(WorkspaceService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('WorkspaceService是否被定义', () => {
        expect(workspaceService).toBeDefined();
    });

    it('获取对应文件夹路径', () => {
        expect(workspaceService.getDirectory('a/b/c/d/e/f')).toBe(configService.config.workspace + '/' + 'a+b+c+d+e+f');
        expect(workspaceService.getDirectory('fanhaoyuan/gitee-actions', 'master')).toBe(
            configService.config.workspace + '/' + 'fanhaoyuan+gitee-actions+master'
        );
    });

    it('建立工作区', async () => {
        const directory = path.resolve(__dirname, './setup-test');

        await workspaceService.setup(directory);

        expect(await fs.pathExists(directory)).toBe(true);

        await fs.remove(directory);
    });

    it('清理工作区', async () => {
        const directory = path.resolve(__dirname, './cleanup-test');

        await fs.mkdir(directory);

        await workspaceService.cleanup(directory);

        expect(await fs.pathExists(directory)).toBe(false);
    });
});
