# v3

保留作者真实文章与写作方式，重新组织呈现。界面文字只保留内容名称、操作、数据与必要提示；不添加口号、装饰性英文或代替作者表达的文案。

## 设计方向：C · 现代书页
- 用户选定的 C 方案：浅纸色、墨色宋体、暗红首字，竖向分类与中文日期构成页边；移除首页大刊头与装饰纸雕。
- 首页从《为什么要写博客》的真实开头进入阅读。摘要来自 frontmatter，首段从页面渲染内容中提取，跳过与摘要相同的段落；不另抄原文，不改写文章。
- 选读后接两篇真实文章入口，再进入按 Lastmod 排列的最近更新目录和实际在读书目。
- 阅读页正文使用自托管宋体，代码继续等宽字体。桌面目录移至左侧；无目录文章与专注模式正文居中；700px 及以下保留折叠目录。
- 全站深色模式、键盘搜索、移动导航、失败封面占位、减少动画偏好及打印布局继续可用。

## 内容与发布边界
源码分支：codex/blog-v3。仅发布到 EuDs63/v3 的 /v3/ Pages。
myThinking 的正文、content/、data/、生产分支和原同步流程不作修改。
正文中确认存在的本站链接由渲染钩子映射到 v3，源 Markdown 保持原样。
书架只展示同步结果实际提供的书目，并标明总数与展示数。

## 留存的原创图像资产
内置 image_gen 工具生成并视觉检查。项目资产：assets/images/v3-paper-sculpture.png。C 方案不再展示、预加载或处理该图像；保留源资产便于后续使用。
它是原创艺术意象，不是作者拍摄的实物照片。

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
- 首页页边和目录分区首次进入视野时上移 6px 并淡入，400ms 后结束；文章标题上移 12px，600ms 后结束。首页原文与正文段落直接可见，不逐项播放。
- 标题以细下划线回应悬停，链接箭头移动 2–3px，书封围绕书脊轻转 6–7° 并上移 2px；仅在精确指针上启用，键盘焦点保留对应反馈。
- 搜索与手机菜单打开时淡入 180ms，关闭立即生效；明暗配色过渡 220ms。
- 减少动态效果时取消入场、悬停位移与过渡；无 JavaScript 时内容直接可见。聚焦、打印、回到历史页面时不等待动效。
- 阅读进度使用 transform: scaleX，无额外依赖或持续播放的动画。


## 排版与细节调整
- Cormorant Garamond 的正常体用于站名和作者署名；真斜体资产保留但不再在首页预加载，自托管 Latin 可变字重文件。来源：@fontsource-variable/cormorant-garamond@5.3.0，Google Fonts v21；许可证保存在 static/fonts/cormorant/OFL.txt。
- 文章原文构成首屏主体，页边与正文以细线分开。目录固定日期列，书架保留封面及自然投影。
- 文章标题轻微入场，导航细线跟随鼠标/键盘焦点；书封围绕书脊轻转，正文保持稳定。
- 上述细节继续遵循系统减少动态效果设置，不增加页面文案。


## 前一轮方案的参考
- [Craig Mod / Collected Essays](https://craigmod.com/essays/)：借鉴日期、文章标题、摘要的层级，把字号对比用于真实内容。
- [Frank Chimero / Post Archive](https://frankchimero.com/blog/)：借鉴稳定日期列与细线目录，提高文章入口密度。
- [The Gentlewoman / Library](https://thegentlewoman.co.uk/library)：参考索引的分组、对齐与留白节奏，不使用其照片、标识或文案。
- 参考仅用于布局研究，未复制原站图片、标识或文案。
- 本轮 Chrome 检查 320、390、700、701、768、850、851、1100、1440px；手机与桌面无横向溢出，验证菜单焦点恢复、搜索真实结果、深浅色和主打文章跳转。


## C 方案验证
- Hugo 0.119.0 构建及 verify_v3.py：210 个 HTML 页面、136 条搜索记录通过。
- 首页、文章目录、含代码及目录的文章、无目录文章分别检查 320、390、700、701、768、1440px，无横向溢出。
- 浏览器验证宋体正文与等宽代码、左侧粘性目录、700px 折叠边界、专注模式及无目录文章居中、手机深浅色。
- 首页节选与原始 Markdown 的首个非摘要段落一致；中文日期来自文章 Date。
