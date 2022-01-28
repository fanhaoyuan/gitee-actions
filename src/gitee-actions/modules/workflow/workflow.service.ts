import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import glob from 'fast-glob';
import yaml from 'yaml';

import { exec, uuid } from '../../utils';
import { ConfigService } from '../config';
import { WorkspaceService } from '../workspace';
import {
    WorkflowCheckoutOptions,
    WorkflowInjectOptions,
    WorkflowMergeOptions,
    WorkflowPushOptions,
    WorkflowRunnerOptions,
} from './interfaces';

@Injectable()
export class WorkflowService {
    @Inject()
    private readonly workspaceService: WorkspaceService;

    @Inject()
    private readonly configService: ConfigService;

    /**
     * 检出对应代码
     */
    async checkout(options: WorkflowCheckoutOptions) {
        const { branch, directory, remote } = options;
        let command = `git clone --no-tags -b ${branch} --single-branch ${remote}`;
        if (directory) {
            command = `${command} ${directory}`;
        }
        await exec(command);
    }

    /**
     * 进入临时文件夹推送代码
     */
    async push(options: WorkflowPushOptions) {
        const { directory, remote, commitMessage, branch } = options;

        const upstream = this.configService.getUpstream(remote);

        await fs.remove(path.resolve(directory, '.git'));

        const randomBranch = `gitee-actions/${uuid()}`;

        return exec(
            `cd ${directory} && git init && git add . && git checkout -b ${randomBranch} && git commit -m "${commitMessage}" --quiet --no-verify && git push -f ${upstream} ${randomBranch}:${branch}`
        );
    }

    /**
     * 运行工作流
     *
     * 拉取并推送代码
     */
    async run(options: WorkflowRunnerOptions, runner?: () => Promise<void> | void) {
        const { directory, remote, branch, message, inject } = options;
        /**
         * 创建临时工作区
         */
        await this.workspaceService.setup(directory);

        /**
         * 检出代码
         */
        await this.checkout({ remote, directory, branch });

        /**
         * 执行工作流
         */
        await runner?.();

        /**
         * 注入环境变量
         */
        if (inject) {
            await this.inject({
                directory,
                variables: inject,
            });
        }

        /**
         * 推送代码
         */
        await this.push({
            directory,
            remote: this.configService.getUpstream(remote),
            commitMessage: message,
        });

        /**
         * 清理当前工作区
         */
        await this.workspaceService.cleanup(directory);
    }

    /**
     * 注入github workflows环境变量
     * @param dirPath
     * @param variables 需要注入的环境变量
     */
    async inject(options: WorkflowInjectOptions) {
        const { directory, variables = {} } = options;

        const yamlFiles = await glob([
            path.resolve(directory, '.github/workflows', '*.yml'),
            path.resolve(directory, '.github/workflows', '*.yaml'),
        ]);

        for await (const filePath of yamlFiles) {
            const file = await fs.readFile(filePath, 'utf-8');

            let yml;

            try {
                yml = yaml.parse(file);

                Object.assign((yml.env ??= {}), variables);
            } catch (error) {
                console.log('YAML 文档解析错误：', error);
                yml = file;
            } finally {
                await fs.writeFile(
                    filePath,
                    yaml.stringify(yml, {
                        nullStr: '',
                        indent: 4,
                    }),
                    'utf-8'
                );
            }
        }
    }

    /**
     * 合并目标分支
     */
    async merge(options: WorkflowMergeOptions) {
        const { directory, targetBranch, targetRemote } = options;

        await exec(`cd ${directory} && git remote add upstream ${targetRemote} && git merge upstream/${targetBranch}`);
    }
}
