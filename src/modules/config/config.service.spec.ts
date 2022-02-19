import { Test } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { GLOBAL_CONFIG } from './constants';
import { GlobalConfig, Owner, Repo } from './interfaces';
import * as path from 'path';

describe('ConfigService', () => {
    let configService: ConfigService;

    const cwd = process.cwd();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ConfigService,
                {
                    provide: GLOBAL_CONFIG,
                    useValue: {},
                },
            ],
        }).compile();

        configService = module.get<ConfigService>(ConfigService);
    });

    it('ConfigService是否被定义', () => {
        expect(configService).toBeDefined();
    });

    it('默认配置项', () => {
        expect(configService.config.config).toBe(`${cwd}/actions.config.js`);
        expect(configService.config.workspace).toBe(`${cwd}/.workspace`);

        expect(typeof configService.config.rewrite === 'function').toBe(true);
        expect(configService.config.rewrite('test', 'test')).toStrictEqual(['test', 'test']);

        expect(configService.config.mode).toBe('ssh');

        expect(configService.config.pr.updateTriggerType).toStrictEqual([
            'source_branch_changed',
            'target_branch_changed',
        ]);
    });

    it('Mode Getter', () => {
        expect(configService.mode).toStrictEqual(['ssh', 'ssh']);
    });

    it('合并配置项', () => {
        const baseConfig: GlobalConfig = {
            workspace: `${cwd}/.workspace`,
            mode: 'ssh',
            config: `${cwd}/actions.config.js`,
            rewrite: (owner: Owner, repo: Repo) => [owner, repo],
            pr: {
                updateTriggerType: ['source_branch_changed', 'target_branch_changed'],
            },
        };

        const globalConfig: GlobalConfig = {
            workspace: path.resolve(cwd, '__workspace__'),
            config: path.resolve(cwd, '__config__'),
            pr: {
                updateTriggerType: ['source_branch_changed', 'target_branch_changed'],
            },
        };

        const mergedConfig = configService.mergeConfig(baseConfig, globalConfig);

        expect(mergedConfig.config).toBe(globalConfig.config);
        expect(mergedConfig.workspace).toBe(globalConfig.workspace);
        expect(mergedConfig.pr).toStrictEqual(globalConfig.pr);

        expect(mergedConfig.rewrite).toBe(baseConfig.rewrite);
    });

    it('检查URL是否是SSH', () => {
        expect(configService.isSSH('')).toBe(false);
        expect(configService.isSSH('@git')).toBe(false);
        expect(configService.isSSH('git@github.com')).toBe(true);
        expect(configService.isSSH('git@gitee.com')).toBe(true);
    });

    it('检查URL是否是HTTP', () => {
        expect(configService.isHTTP('')).toBe(false);
        expect(configService.isHTTP('http://xxxx.com')).toBe(false);
        expect(configService.isHTTP('https://github.com/')).toBe(true);
        expect(configService.isHTTP('https://gitee.com/')).toBe(true);
    });

    it('获取仓库地址', () => {
        const currentMode = configService.config.mode;

        configService.config.mode = 'ssh';

        expect(configService.getRemote('gitee', 'owner', 'repo')).toBe('git@gitee.com:owner/repo.git');
        expect(configService.getRemote('github', 'owner', 'repo')).toBe('git@github.com:owner/repo.git');

        configService.config.mode = 'http';

        expect(configService.getRemote('gitee', 'owner', 'repo')).toBe('https://gitee.com/owner/repo.git');
        expect(configService.getRemote('github', 'owner', 'repo')).toBe('https://github.com/owner/repo.git');

        configService.config.mode = currentMode;
    });

    it('根据URL获取仓库地址', () => {
        const currentMode = configService.config.mode;

        configService.config.mode = 'ssh';

        expect(configService.getRemoteByURL('gitee', 'https://gitee.com/owner/repo.git')).toBe(
            'git@gitee.com:owner/repo.git'
        );

        expect(configService.getRemoteByURL('github', 'git@github.com:owner/repo.git')).toBe(
            'git@github.com:owner/repo.git'
        );

        configService.config.mode = 'http';

        expect(configService.getRemoteByURL('gitee', 'https://gitee.com/owner/repo.git')).toBe(
            'https://gitee.com/owner/repo.git'
        );

        expect(configService.getRemoteByURL('github', 'git@github.com:owner/repo.git')).toBe(
            'https://github.com/owner/repo.git'
        );

        configService.config.mode = currentMode;
    });

    it('生成HTTP地址', () => {
        expect(configService.http('gitee', 'owner', 'repo')).toBe('https://gitee.com/owner/repo.git');
        expect(configService.http('github', 'owner', 'repo')).toBe('https://github.com/owner/repo.git');
    });

    it('生成SSH地址', () => {
        expect(configService.ssh('github', 'owner', 'repo')).toBe('git@github.com:owner/repo.git');
        expect(configService.ssh('gitee', 'owner', 'repo')).toBe('git@gitee.com:owner/repo.git');
    });
});
