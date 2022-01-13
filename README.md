# Gitee-Actions

利用 Gitee Webhooks 钩子调用当前服务器中的接口，推送代码到 Github 上触发 Push 类型状态的 Git Actions。

## 流程

![IMG](./time-flow.png)

## 功能列表

-   [x] Pull Request 类型钩子
-   [ ] Issue 类型钩子
-   [ ] Comment 类型钩子
-   [ ] Push 类型钩子

## 准备

-   Gitee 的 SSH 公钥
-   Github 的 SSH 公钥
-   一台可以连接到 Github 的服务器(访问慢可以使用 Fastgithub 代理加速)
-   Github Actions 配置

## 直接使用

1. 克隆代码
2. 运行服务器
3. 添加配置项
4. 配置 webhooks 触发服务器中对应的接口
5. 成功

## Nest 集成

### 安装依赖

```bash
$> npm install gitee-actions
```

### 注册模块

```ts
import { GiteeActionsModule } from 'gitee-actions';
@Module({
    imports: [GiteeActionsModule.register(/* Options */)],
})
class AppModule {}
```

## 许可证

[MIT](./LICENSE)
