# v3

博客新版的独立发布仓库，网站地址：https://ds63.eu.org/v3/ 。

- 页面代码：`EuDs63/EuDs63.github.io` 的 `codex/blog-v3` 分支。
- 文章和数据：同一仓库 `hugo-blog-backup` 分支的最新 `content/` 与 `data/`。
- 原博客与 `myThinking` 的推送、同步和发布方式保持不变。
- 本仓库推送会发布；源分支更新由每半小时的定时任务检查，有变化才重建。GitHub 定时运行可能延迟，长期无仓库活动时可能停用。
- 需要立即刷新时，在本仓库 Actions → Publish v3 → Run workflow 手动运行。勾选 force 可以强制重建。

发布任务只拥有本仓库的 Pages 写入权限，不持有原博客的写入凭证。构建使用生产内容的完整 Git 历史，以保留文章修改时间。

源码分支中的 `deploy/v3/pages.yml` 是此仓库 `.github/workflows/pages.yml` 的维护副本；修改副本后需要同步到本仓库。

v3 采用当代个人刊物设计：原创纸雕主视觉、自托管中文宋体、文章索引、全文搜索、阅读书架与专注阅读模式。支持手机布局与深色主题。此站不计入原站分析统计，HTML 使用 noindex，并独立保存主题偏好。
