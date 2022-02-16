import { defineConfig } from 'dumi';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
    title: 'Gitee Actions',
    mode: 'site',
    // more config: https://d.umijs.org/config
    description: 'Gitee Webhooks ✖️ Github Actions',
    locales: [['zh-CN', '中文']],
    logo: isProd ? '/gitee-actions/logo.svg' : '/logo.svg',
    favicon: isProd ? '/gitee-actions/logo.svg' : '/logo.svg',
    base: '/gitee-actions/',
    publicPath: '/gitee-actions/',
    outputPath: 'docs-dist',
    navs: [
        {
            title: '指南',
            path: '/guide',
        },
        {
            title: '配置项',
            path: '/config',
        },
        {
            title: 'API',
            path: '/api',
        },
        {
            title: '更新日志',
            path: '/release',
        },
        {
            title: 'GitHub',
            path: 'https://github.com/fanhaoyuan/gitee-actions',
        },
    ],
});
