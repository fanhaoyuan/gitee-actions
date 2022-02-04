import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { GLOBAL_CONFIG } from './constants';
import { GlobalConfig, Host, HTTP, Owner, Repo, SSH, Remote } from './interfaces';

/**
 * 配置服务
 *
 * 配置相关功能
 */
@Injectable()
export class ConfigService {
    constructor(@Inject(GLOBAL_CONFIG) config: GlobalConfig) {
        this._resolveConfig(config);
    }

    config: GlobalConfig;

    get mode() {
        const { mode } = this.config;

        return typeof mode === 'string' ? [mode, mode] : mode;
    }

    /**
     * 获取默认配置项
     */
    private _getDefaultConfig(): GlobalConfig {
        const cwd = process.cwd();

        return {
            workspace: `${cwd}/.workspace`,
            mode: 'ssh',
            config: `${cwd}/actions.config.js`,
            rewrite: (owner: Owner, repo: Repo) => [owner, repo],
        };
    }

    /**
     * 解析配置文件
     * @param filePath 配置项路径
     * @returns
     */
    private async _resolveConfigFile(filePath: string) {
        if (!fs.pathExistsSync(filePath)) {
            return {};
        }

        let content: GlobalConfig;

        try {
            content = (await import(filePath)).default || {};
        } catch (error) {
            content = {};
        }

        return content;
    }

    /**
     * 解析并合并配置
     * @param path
     */
    private async _resolveConfig(inlineConfig: GlobalConfig) {
        const defaultConfig = this._getDefaultConfig();

        const fileConfig = await this._resolveConfigFile(inlineConfig.config || defaultConfig.config);

        this.config = this.mergeConfig(defaultConfig, fileConfig, inlineConfig);
    }

    /**
     * 获取 SSH 地址
     */
    ssh<H extends Host, O extends Owner, R extends Repo>(host: H, owner: O, repo: R): SSH<H, O, R> {
        return `git@${host}.com:${owner}/${repo}.git`;
    }

    /**
     * 获取 HTTP 地址
     */
    http<H extends Host, O extends Owner, R extends Repo>(host: H, owner: O, repo: R): HTTP<H, O, R> {
        return `https://${host}.com/${owner}/${repo}.git`;
    }

    /**
     * 合并多个配置项
     */
    mergeConfig(...config: GlobalConfig[]): GlobalConfig {
        const [mergedConfig, cfg, ...rest] = config;

        if (!cfg) {
            return mergedConfig;
        }

        return this.mergeConfig(Object.assign({}, mergedConfig, cfg), ...rest);
    }

    private _getGiteeRemote<H extends Host, O extends Owner, R extends Repo>(host: H, owner: O, repo: R) {
        const [mode] = this.mode;

        if (mode === 'ssh') {
            return this.ssh(host, owner, repo);
        }

        return this.http(host, owner, repo);
    }

    private _getGithubRemote<H extends Host, O extends Owner, R extends Repo>(host: H, owner: O, repo: R) {
        const [, mode] = this.mode;

        const [_owner, _repo] = this.config.rewrite?.(owner, repo) || [owner, repo];

        if (mode === 'ssh') {
            return this.ssh(host, _owner, _repo);
        }

        return this.http(host, _owner, _repo);
    }

    /**
     * 用 URL 来获取仓库地址
     * @param host
     * @param url
     * @returns
     */
    getRemoteByURL(host: Host, url: Remote) {
        const [owner, repo] = this.resolveURL(url);

        return this.getRemote(host, owner, repo);
    }

    /**
     * 获取仓库地址
     * @param host
     * @param owner
     * @param repo
     * @returns
     */
    getRemote<H extends Host, O extends Owner, R extends Repo>(host: H, owner: O, repo: R) {
        if (host === 'gitee') {
            return this._getGiteeRemote(host, owner, repo);
        }

        return this._getGithubRemote(host, owner, repo);
    }

    /**
     * 判断 URL 是否为 HTTP
     * @param url
     * @returns
     */
    isHTTP(url: Remote): url is HTTP {
        return /^https:\/\//.test(url);
    }

    /**
     * 判断 URL 是否为 SSH
     * @param url
     * @returns
     */
    isSSH(url: Remote): url is SSH {
        return /^git@/.test(url);
    }

    /**
     * 解析 URL
     * @param url
     * @returns
     */
    resolveURL(url: Remote): [Owner, Repo] {
        let resolved;

        if (this.isHTTP(url)) {
            resolved = url.replace(/https:\/\/.*\.com\//, '');
        }

        if (this.isSSH(url)) {
            resolved = url.replace(/git@.*\.com:/, '');
        }

        return resolved.replace(/\.git$/, '').split('/') as [Owner, Repo];
    }
}
