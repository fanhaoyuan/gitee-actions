## update-to-date

-   🐛 修复因解析 yaml 失败时导致的错误
-   🐛 修复因部分特殊提交信息或者 pr 标题导致的错误
-   🚀 添加 Pull Request 的 update 事件中触发条件

## v0.3.0

-   🚀 添加了 Gitee 模块的评论 Pull Request 功能
-   🚀 导出了 Gitee 的 Pull Request 基础功能（查询 Pull Request 详情）
-   🚀 添加了 Github Actions 的环境变量注入

## v0.2.0

-   🔧 修改 Pull Request 触发类型 'merge' 的通用处理方法
-   ❌ 去除了 Pull Request 触发类型 'close' 的通用处理方法
-   🚀 导出了 WorkspaceService 的 'setup' | 'cleanup' 等基础 API
-   🚀 导出了 WorkflowService 的 ‘run’ | 'push' | 'checkout' 的基础 API

## v0.1.0

-   🚀 添加 Pull Request 触发类型的 'open' | 'close' | 'merge' | 'update' 通用处理方法
