import * as progress from 'child_process';

/**
 * 执行命令
 * @param command 命令
 * @param params 命令参数
 * @returns
 */
export function exec(command: string, ...params: string[]): Promise<string> {
    console.log('[Running]: ', command);
    return new Promise((resolve, reject) => {
        const process = progress.spawn(command, params, {
            shell: true,
        });

        let result = '';

        process.stdout.on('data', data => {
            result += data.toString();
            console.log('[Info]: ', data.toString());
        });

        process.stdout.on('error', err => {
            console.log('[Error]: ', err.message);
        });

        process.once('close', (code, signal) => {
            if (code) {
                return reject(new Error(JSON.stringify({ code, signal })));
            }
            resolve(result);
        });
    });
}

/**
 * 生成 UUID
 */
export function uuid() {
    return Math.random().toString(36).slice(-6);
}
