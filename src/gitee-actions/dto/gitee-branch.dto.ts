import { GiteeProjectDto } from './gitee-project.dto';
import { GiteeUserDto } from './gitee-user-dto';

export class GiteeBranchDto {
    /**
     * 分支标记。eg：oschina:master
     */
    readonly label: string;

    /**
     * 分支名。eg：master
     */
    readonly ref: string;

    /**
     * git 提交记录中 sha 值。eg：51b1acb1b4044fcdb2ff8a75ad15a4b655101754
     */
    readonly sha: string;

    /**
     * 分支所在仓库的所有者信息
     */
    readonly user: GiteeUserDto;

    /**
     * 分支所在仓库的信息
     */
    readonly repo: GiteeProjectDto;
}
