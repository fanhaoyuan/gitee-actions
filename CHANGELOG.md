## v1.2.0

-   🚀 添加自定义注入项 ([#9](https://github.com/fanhaoyuan/gitee-actions/pull/9))

## v1.1.1

-   🐛 修复修复发布 API 路径解析错误问题 ([#6](https://github.com/fanhaoyuan/gitee-actions/pull/6))

## v1.1.0

-   🚀 添加 `OperationModule`，用于服务器简易发布操作 ([#5](https://github.com/fanhaoyuan/gitee-actions/pull/5))

## v1.0.1

-   🐛 修复命令行启动失败问题

## v1.0.0

-   🔧 重构 `Workspace` 模块
-   🔧 重构 `Workflow` 模块
-   🔧 重构 `Config` 模块
-   🔧 重构 `PullRequest` 模块
-   🚀 添加 `PR` 预合并功能
-   🚀 对 `PR` 触发类型进行过滤
-   🚀 对 `PR` 更新触发类型进行过滤
-   🚀 细化了 `PR` 的 HTTP 接口
-   🚀 添加 `Push` 钩子支持
-   🚀 添加 `Tag Push` 钩子支持
-   🚀 添加 `CLI` 命令启动模式

## v0.4.0

-   🚀 添加 `Pull Request` 的 `update` 事件中触发条件
-   🐛 修复因解析 `yaml` 失败时导致的错误
-   🐛 修复因部分特殊提交信息或者 `pr` 标题导致的错误

## v0.3.0

-   🚀 添加了 `Gitee` 模块的评论 `Pull Request` 功能
-   🚀 导出了 `Gitee` 的 `Pull Request` 基础功能（查询 `Pull Request` 详情）
-   🚀 添加了 `Github Actions` 的环境变量注入

## v0.2.0

-   🚀 导出了 `WorkspaceService` 的 '`setup' | 'cleanup'` 等基础 API
-   🚀 导出了 `WorkflowService` 的 `‘run’ | 'push' | 'checkout'` 的基础 API
-   ❌ 去除了 `Pull Request` 触发类型 `'close'` 的通用处理方法
-   🔧 修改 `Pull Request` 触发类型 `'merge'` 的通用处理方法

## v0.1.0

-   🚀 添加 `Pull Request` 触发类型的 `'open' | 'close' | 'merge' | 'update'` 通用处理方法
