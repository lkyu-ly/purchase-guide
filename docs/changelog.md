# 更新日志 Changelog

<!-- 由于全局使用`text-indent: 2rem`，即默认段落缩进两个字符，本页面列表较多，普通文本若显示不美观请用`<p style="text-indent: 0"></p>`包裹 -->

## VER 2.0.0.20250630_release

- 更新机型：联想 来酷 斗战者 战 7000
- 其他细节改动
- PDF 版本发布

## VER 2.0.0.20250609_release

- 额外问题答疑新增两条内容，新增国补政策详细说明
- 更新百亿补贴推荐机型及链接
- 更新来酷 Pro14 的图片资源，天选 air 的图片
- 整理全局样式代码
- 再次对所有文章进行勘误

## VER 2.0.0.2.20250608_beta

<p style="text-indent: 0">汇总 6 月 5 日到 8 日的更新内容：</p>

<p style="text-indent: 0">内容部分</p>

- 添加两张 GPU 相关的图片资源，更新 USB 协议的新图片
- 完成现阶段所有 2025 年推荐机型的更新，已有文案勘误
- 为所有机型增加图片资源
- 部分综述性内容更新，见[笔记本电脑的分类](/introduction/分类)和[笔记本电脑的选择](/introduction/选择)
- 针对本次机型推荐新增的“优缺点”部分作出[统一说明](/recommend/推荐#优缺点)
- 选取 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en) 协议作为本站协议。并添加在首页页脚

<p style="text-indent: 0">技术部分</p>

- 实现针对国补的全站通知功能
- 引入`@theojs/lumen`库，引入封装好的百度统计和 Google Analytics 功能，同时删除二者的手动实现
- 重新实现不蒜子统计的引入，调用逻辑；修改页脚的样式实现。
- 实现路由转换时加载指示器（进度条）
- 实现首页大标题和 logo 的 RGB 渐变效果
- 引入`iconify`组件库以实现图标显示功能，用于每个机型的“优缺点”章节添加一个 info 图标
- 在 Vite 优化中包含 `recaptcha-v3` 以修复本地开发热更新问题，see [Theo-Messi/lumen:issue#295](https://github.com/Theo-Messi/lumen/issues/295)
- 更新依赖项并将一些开发依赖项移至生产环境，因为这并不是用于分发的 npm 包，详情请参见[此文章](https://blog.csdn.net/zz_jesse/article/details/139348751)
- 调整首页 QQ 群链接为新建空白页，防止顶掉当前页面
- 调整自定义 markdown 渲染的部分 css 代码
- 其他细节改动

## VER 2.0.0.1.20250604_beta

- 删去旧机型，在此列出：惠普 星 Book Pro14、华硕 a 豆 14Air、惠普 星 Book Pro13、机械革命 蛟龙 15K/Pro、七彩虹 橘宝 R16、火影 焕 16Air、机械革命 耀世/翼龙 15Pro、华硕 天选 5 锐龙版、华硕 天选 5Pro 锐龙版、联想 拯救者 R9000P 2024、联想 ThinkBook 16P 2024、华硕 天选 Air
- 移除过时的图像资源并更新为新版本的引用
- 添加处理旧图像的维护说明，将它们移动到 `asset/old` 文件夹
- 修复图片迁移导致的文档文件中的图像路径引用错误
- 部分依赖包版本更新
- 为 ThinkBook 16P 添加遗漏的产品图像

## VER 2.0.0.20250418_base

- 更新第二版前言
- 删改部分引用链接
- 更新过时图片，修改部分文案
- 新增对 OCuLink 接口的介绍

## VER 1.1.3.20250225_release

- 添加了新的文章集合
- 发布了新文章：[《Dive Deeper, Seek Further 一种高效、稳定的 DeepSeek 系列模型调度方案》](misc/DeepSeek-Guide)

## VER 1.1.2.20250223_release

- 部分文本勘误；
- 同步更新发布 PDF 版（试阅，勘误后上传首页蓝奏云）。

## VER 1.1.1.20250127_release

- 审核所有文本，提高严谨性；
- 对机型减配现象进行筛查，并做出提醒；
- 页面排版优化，修改某些不美观的元素；
- 修复部分页面 Bug；
- 已删除的旧机型统一移动，不再与现有机型位于一处。

## VER 1.1.0.20250126_beta

- 新增近期新上市的机器，在下方列出：
  - 惠普 星 Book Pro 13
  - 华硕灵耀 14Air
  - 火影 焕 16Air
  - 七彩虹 橘宝 R16
  - 联想拯救者 R9000P 2024
  - 联想 ThinkBook 16P 2024
- 新增 [国补说明](/introduction/购买#国补)，修改了部分不妥文案，更新了国补后所有机器的购买链接。
- 更新所有机型的配置变更
- 新增对 2024 年新发布 CPU 的介绍与命名规则参考
- 加入更新日志版块
- 统一展示机型的名称写法

## VER 1.0.3.20250120_release

- 全面使用透明底图片，便于夜间模式观看；<br/>
  抠图模型：[BRIA-RMBG-2.0](https://huggingface.co/spaces/briaai/BRIA-RMBG-2.0)
- 删除一批旧机型，开始准备新版本编写
  - 机械革命 无界 14Pro、红米 RedmiBook Pro 16 2024、七彩虹 隐星 P15 TA 、ROG 魔霸 7plus

## VER 1.0.2.20240823_release

- 更新了所有机器的购买链接
- 修改了 ThinkBook 14+ 页面的 Bug

## VER 1.0.1.20240814_release

- 更新了所有机器的购买链接
- 增加了 Zen 5 架构 CPU 与 890M 核显的介绍
- 增加了百亿补贴与其他机型介绍
- 更新了额外问题答疑
- 新增内存与外存等概念的对比解释

## VER 1.0.0.20240807_beta

<p style="text-indent: 0">首次发布。</p>
