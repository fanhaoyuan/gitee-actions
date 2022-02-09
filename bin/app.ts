import { Command } from 'commander';
import { version } from '../package.json';
import { bootstrap } from '../src/bootstrap';

const program = new Command();

program
    .name('gitee-actions')
    .usage('[...flags] <options>')
    .helpOption('-h, --help', '帮助信息')
    .version(version, '-v, --version', '版本信息')
    .option('-c, --config <path>', '配置项路径')
    .action(options => bootstrap(options));

program.parse(process.argv);
