import * as progress from 'child_process';

/**
 * 执行命令
 * @param command 命令
 * @param params 命令参数
 * @returns
 */
export function exec(command: string, ...params: string[]) {
    console.log(command);
    return new Promise((resolve, reject) => {
        const process = progress.spawn(command, params, {
            shell: true,
        });

        process.once('close', (code, signal) => {
            if (code) {
                return reject(new Error(JSON.stringify({ code, signal })));
            }
            resolve(code);
        });
    });
}
