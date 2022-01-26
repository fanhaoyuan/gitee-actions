import { Inject, Injectable } from '@nestjs/common';
import { GLOBAL_CONFIG } from './constants';
import { GlobalConfig } from './interfaces';

/**
 * 配置服务
 *
 * 配置相关功能
 */
@Injectable()
export class ConfigService {
    constructor(@Inject(GLOBAL_CONFIG) readonly config: GlobalConfig) {}

    get workspace() {
        return this.config.workspace || `${process.cwd()}/.workspace`;
    }

    getUpstream(origin: string) {
        //todo
    }
}
