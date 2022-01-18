import { Injectable, Inject } from '@nestjs/common';
import { GiteeConfig } from '../interfaces';
import { GITEE_OPTIONS } from '../constants';

@Injectable()
export class ConfigService {
    @Inject(GITEE_OPTIONS)
    private readonly config: GiteeConfig;

    get accessToken() {
        return this.config.accessToken;
    }
}
