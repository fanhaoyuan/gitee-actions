import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { exec, uuid } from '../utils';
import { WorkspaceService } from './workspace.service';
import { WorkflowTriggerType } from '../constants';
import glob from 'fast-glob';
import * as path from 'path';
import * as fs from 'fs-extra';
import yaml from 'yaml';

yaml.scalarOptions.null.nullStr = '';

interface RunnerOptions {
    /**
     * 代码源仓库地址
     *
     * SSH or HTTPS
     */
    origin: string;

    /**
     * 临时工作区文件夹名称
     */
    dirName: string;

    /**
     * 源代码分支
     */
    branch: string;

    /**
     * 要推送到的分支
     *
     * 默认等于 `branch`
     */
    targetBranch?: string;

    /**
     * 提交信息
     *
     * @default 最新的提交消息
     */
    commitMessage?: string;

    /**
     * 注入环境变量
     */
    env?: Record<string, string | number>;
}

@Injectable()
export class WorkflowService {
    @Inject()
    private readonly workspaceService: WorkspaceService;

    @Inject()
    private readonly configService: ConfigService;

    /**
     * 运行工作流
     *
     * 拉取并推送代码
     */
    async run(type: WorkflowTriggerType, options: RunnerOptions) {
        const { dirName, origin, branch, targetBranch, env = {}, commitMessage } = options;
        /**
         * 创建临时工作区
         */
        await this.workspaceService.setup(type, dirName);

        const workspacePath = this.workspaceService.getFolderAbsolutePath(type, dirName);

        /**
         * 检出代码
         */
        await this.checkout(origin, branch, workspacePath);

        /**
         * 注入环境变量
         */
        await this.injectEnv(workspacePath, {
            ...env,
            trigger_type: type,
        });

        const message = commitMessage ?? (await exec('git log -1 --pretty=%s'));

        /**
         * 推送代码到指定位置
         */
        await this.push(workspacePath, origin, message, branch, targetBranch);

        /**
         * 清理当前工作区
         */
        await this.workspaceService.cleanup(type, dirName);
    }

    /**
     * 检出对应代码
     * @param origin
     * @param branch
     * @param dirPath
     */
    async checkout(origin: string, branch: string, dirPath?: string) {
        let command = `git clone --no-tags -b ${branch} --single-branch ${origin}`;

        if (dirPath) {
            command = `${command} ${dirPath}`;
        }

        await exec(command);
    }

    /**
     * 注入github workflows环境变量
     * @param dirPath
     * @param variables
     */
    async injectEnv(dirPath: string, variables: Record<string, string>) {
        const yamlFiles = await glob([
            path.resolve(dirPath, '.github/workflows', '*.yml'),
            path.resolve(dirPath, '.github/workflows', '*.yaml'),
        ]);

        for await (const filePath of yamlFiles) {
            const file = await fs.readFile(filePath, 'utf-8');

            const yml = yaml.parse(file);

            Object.assign((yml.env ??= {}), variables);

            await fs.writeFile(filePath, yaml.stringify(yml), 'utf-8');
        }
    }

    /**
     * 进入临时文件夹推送代码
     * @param dirPath 临时文件夹目录路径
     * @param origin 源仓库地址
     * @param commitMessage 提交信息
     * @param sourceBranch 源分支名称
     * @param targetBranch 要推送到的目标分支
     */
    async push(
        dirPath: string,
        origin: string,
        commitMessage: string,
        sourceBranch: string,
        targetBranch = sourceBranch
    ) {
        const upstream = this.configService.getSourceURL(origin);

        await fs.remove(path.resolve(dirPath, '.git'));

        const randomBranch = `gitee-actions/${uuid()}`;

        return exec(
            `cd ${dirPath} \
      && git init \
      && git add . \
      && git checkout -b ${randomBranch} \
      && git commit -m ${commitMessage} --quiet --no-verify \
      && git push -f ${upstream} ${randomBranch}:${targetBranch}`
        );
    }
}
