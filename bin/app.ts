import { Command } from 'commander';
import { version } from '../package.json';
import { bootstrap } from '../src/bootstrap';
import * as path from 'path';
import * as fs from 'fs-extra';

const program = new Command();

/**
 * 获取绝对路径
 * @param p
 * @returns
 */
function getAbsolutePath(p: string) {
    if (path.isAbsolute(p)) {
        return p;
    }

    const resolvedPath = path.resolve(process.cwd(), p);

    if (!fs.pathExistsSync(resolvedPath)) {
        return null;
    }

    return resolvedPath;
}

program
    .name('gitee-actions')
    .usage('[...flags] <options>')
    .helpOption('-h, --help', '帮助信息')
    .version(version, '-v, --version', '版本信息')
    .option('-c, --config <path>', '配置项路径')
    .option('-w, --workspace <path>', '工作区路径')
    .action(options => {
        const configPath = getAbsolutePath(options.config);

        if (!configPath) {
            throw new Error('配置项路径解析错误');
        }

        options.config = configPath;

        const workspacePath = getAbsolutePath(options.workspace);

        if (!workspacePath) {
            throw new Error('工作区路径解析错误');
        }

        options.workspace = workspacePath;

        bootstrap(options);
    });

program.parse(process.argv);
