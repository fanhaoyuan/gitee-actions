export function analyzeRemoteURL(remote: string) {
    const prefix = /^https/.test(remote) ? 'https://gitee.com/' : 'git@gitee.com:';

    const [owner, repo] = remote.replace(prefix, '').split('/');

    return {
        owner,
        repo: repo.replace('.git', ''),
    };
}
