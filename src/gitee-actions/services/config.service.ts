import { Inject, Injectable } from '@nestjs/common';
import { GITEE_ACTIONS_OPTIONS } from '../constants';
import { GiteeActionsOptions } from '../interfaces';

@Injectable()
export class ConfigService {
    constructor(@Inject(GITEE_ACTIONS_OPTIONS) readonly config: GiteeActionsOptions) {}

    get workspaceDir() {
        return this.config.workspaceDir ?? `${process.cwd()}/.workspace`;
    }

    getSourceURL(url: string) {
        return this.config?.pullRequest?.sourceMap?.[url] ?? url.replace('gitee.com', 'github.com');
    }
}
