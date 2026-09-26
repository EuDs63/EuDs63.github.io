# v3

保留作者真实文章与写作方式，重新组织呈现。界面文字只保留内容名称、操作、数据与必要提示；不添加口号、装饰性英文或代替作者表达的文案。

## 设计方向
- 纸白、墨黑、朱红，配以开源自托管中文宋体。首页用横向刊头、真实文章标题和细线分栏建立层次，纸雕缩为辅助配图。
- 首屏用一篇主打与三条近期更新提供阅读入口，另外两篇选读随后展开；文章目录与真实书架并排。近期更新按 Lastmod 排序，更多文章按 Date 排序，排除上方已展示的文章。
- 文章目录、主题索引、时间归档与全文搜索形成多种阅读入口。
- 正文支持 h1–h6 目录、进度提示、专注阅读、代码复制；桌面与手机分别调整布局。
- 全站深色模式、键盘搜索、移动导航、失败封面占位、减少动画偏好及打印布局。

## 内容与发布边界
源码分支：codex/blog-v3。仅发布到 EuDs63/v3 的 /v3/ Pages。
myThinking 的正文、content/、data/、生产分支和原同步流程不作修改。
正文中确认存在的本站链接由渲染钩子映射到 v3，源 Markdown 保持原样。
书架只展示同步结果实际提供的书目，并标明总数与展示数。

## 原创主视觉
内置 image_gen 工具生成并视觉检查。项目资产：assets/images/v3-paper-sculpture.png。
Hugo 自动产出 600px WebP；桌面使用约 210px 配图，850px 及以下隐藏并通过 lazy 避免抢占手机加载。桌面媒体条件 preload 负责提前获取。它是原创艺术意象，不是作者拍摄的实物照片。

### Final generation prompt
Use case: photorealistic-natural
Asset type: Original art photography for the right-hand hero panel of an exceptionally refined contemporary independent literary website.
Primary request: A single sculptural still life made from one very wide ribbon of thick ivory paper, like an unfurled blank book page, curling freely into a tall incomplete loop. The form suggests thought before it is fixed into a definition: open, suspended, asymmetrical, quietly alive. Gallery-quality physical paper sculpture photographed with remarkable realism and taste.
Scene/backdrop: Seamless warm off-white/light-gray studio background and floor, close to paper white #f3f1eb, with no horizon line. Unified matte material atmosphere.
Subject: One continuous broad sheet of heavyweight ivory paper. It rises from a softly resting lower curl into an open, irregular oval loop, with a deliberate subtle folded crease and a darker shadowed interior. The ends do not join. A single tiny vermilion red paper bookmark peeks from one fold near the lower side, only a small arresting accent.
Style/medium: Sophisticated large-format art photography, tactile and believable, not a digital 3D render. Exacting editorial still-life art direction.
Composition/framing: Portrait 4:5 composition. The sculpture occupies roughly 70 percent of frame, fully visible with generous crop-safe margin on all sides. Off-center balance, natural sculptural silhouette, nothing else in the scene. Leave sufficient breathing room for responsive website cropping.
Lighting/mood: Strong but very soft natural side light from upper left. Carefully modeled deep charcoal inner shadows, subtle tonal gradations, long soft grounded shadow to the right. Quiet, contemplative, graphic, elegant, with a sense of tension in the curved paper.
Color palette: Warm paper white, pale gray, rich charcoal shadows, and just one tiny vermilion accent. Restrained almost monochrome palette.
Materials/textures: Authentic fine paper fibers and soft matte tooth visible at close range, thick clean paper edges, delicate creases, no gloss, no plastic. Extremely high visual craftsmanship.
Constraints: No text, no lettering, no logo, no watermark, no border. No hands, no people, no additional objects. No decorative typography baked into the picture. Avoid generic technology imagery, spheres, shiny 3D materials, colored gradients, perfect torus shapes, tangled ribbons, busy backgrounds, artificial grain overlays, excessive wrinkles.

## 字体
Noto Serif SC，来源 @fontsource-variable/noto-serif-sc@5.3.0，SIL Open Font License。
static/fonts/OFL.txt 保留完整许可证；101 个 unicode-range 分片按需从本站加载，无运行时字体 CDN 依赖。

## 验证
- Hugo 0.119.0 构建；verify_v3.py 验证 210 个 HTML 页面、136 条搜索记录、RSS、资源路径与 v3 隔离。
- Chrome 实际交互：全局与页面搜索、键盘导航、深色偏好、订阅过滤、目录、代码复制、专注模式、文章图片与站内链接。
- 8 个页面分别检查 1440、768、390、320px 宽度，无横向溢出；浏览器无脚本异常。


## 动效
- 首页分区首次进入视野时上移 6px 并淡入，400ms 后结束；横向刊头上移 12px，600ms 结束，斜体部分延迟 60ms。正文段落、归档和文章列表不逐项播放。
- 标题以细下划线回应悬停，链接箭头移动 2–3px，书封围绕书脊轻转 6–7° 并上移 2px；仅在精确指针上启用，键盘焦点保留对应反馈。
- 搜索与手机菜单打开时淡入 180ms，关闭立即生效；明暗配色过渡 220ms。
- 减少动态效果时取消入场、悬停位移与过渡；无 JavaScript 时内容直接可见。聚焦、打印、回到历史页面时不等待动效。
- 阅读进度使用 transform: scaleX，无额外依赖或持续播放的动画。


## 排版与细节调整
- Cormorant Garamond 的正常体与真斜体用于西文标题，自托管 Latin 可变字重文件。来源：@fontsource-variable/cormorant-garamond@5.3.0，Google Fonts v21；许可证保存在 static/fonts/cormorant/OFL.txt。
- 选读使用一主两次的层级，文章目录固定日期列，书架保留封面及自然投影。导航、按钮、标题的粗细保持协调。
- 横向刊头轻微入场，导航细线跟随鼠标/键盘焦点；书封围绕书脊轻转，正文保持稳定。
- 上述细节继续遵循系统减少动态效果设置，不增加页面文案。


## 2026-09-26：首页结构重排与参考
- [Craig Mod / Collected Essays](https://craigmod.com/essays/)：借鉴日期、文章标题、摘要的层级，把字号对比用于真实内容。
- [Frank Chimero / Post Archive](https://frankchimero.com/blog/)：借鉴稳定日期列与细线目录，提高文章入口密度。
- [The Gentlewoman / Library](https://thegentlewoman.co.uk/library)：参考索引的分组、对齐与留白节奏，不使用其照片、标识或文案。
- 全部标题和摘要继续来自原文章；刊头年份取最早发布日期至最近修改年份，分类数由 taxonomy 生成。
- 本轮 Chrome 检查 320、390、700、701、768、850、851、1100、1440px；手机与桌面无横向溢出，验证菜单焦点恢复、搜索真实结果、深浅色和主打文章跳转。
