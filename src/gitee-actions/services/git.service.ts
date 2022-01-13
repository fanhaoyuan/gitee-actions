import { Injectable } from '@nestjs/common';
import { exec } from '../utils';

@Injectable()
export class GitService {
    /**
     * 进入文件夹并拉取代码
     * @param dir
     * @returns
     */
    enterFolderAndPull(dir: string) {
        return this.folderExec(dir, this.getCommandWithPull());
    }

    /**
     * 进入文件夹并强制推送代码
     * @param dir
     * @param remote
     * @param source
     * @param target
     * @returns
     */
    enterFolderAndForcePush(dir: string, remote: string, source: string, target = source) {
        return this.folderExec(dir, this.getCommandWithForcePush(remote, source, target));
    }

    /**
     * 在对应文件夹中执行命令
     * @param dir 指定文件夹路径
     * @param command 执行的命令
     */
    folderExec(dir: string, command: string) {
        return exec(`cd ${dir} && ${command}`);
    }

    /**
     * 获取强制推送命令
     * @param remote
     * @param source
     * @param target
     */
    getCommandWithForcePush(remote: string, source: string, target = source) {
        return `git push -f ${remote} ${source}:${target}`;
    }

    /**
     * 获取拉取指定地址指定分支命令
     * @param remote
     * @param branch
     * @param targetDir
     * @returns
     */
    getCommandWithPullFromRemote(remote: string, branch: string, targetDir?: string) {
        let command = `git clone --no-tags -b ${branch} --single-branch ${remote}`;

        if (targetDir) {
            command = `${command} ${targetDir}`;
        }

        return command;
    }

    /**
     * 获取拉取代码的命令
     * @returns
     */
    getCommandWithPull() {
        return 'git pull';
    }

    /**
     * 从**指定地址拉**取**指定分支**的代码到**指定文件夹**
     * @param remote 仓库地址
     * @param branch 需要拉取的分支
     * @param targetDir 拉取到的文件夹（可选）
     */
    pullFromRemote(remote: string, branch: string, targetDir = '') {
        return exec(this.getCommandWithPullFromRemote(remote, branch, targetDir));
    }
}
