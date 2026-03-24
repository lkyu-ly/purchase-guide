# MOE 购机指南

《MOE 频道：2025 年笔记本购机指南》是我们为大学同学们精心编撰的电脑科普&购买一体方案，旨在为有笔记本电脑购买需求的同学提供计算机方面的一些必要知识，以及在选择机型时提供一定程度的参考。

文档目前正在持续维护中，也欢迎大家通过 issue 提供你的宝贵意见，如果本文档对你有所帮助的话，不妨点点 star 支持一下~

## 本地开发

本项目使用 [VitePress](https://vitepress.vuejs.org/) 框架进行开发，项目为构建前的源码，可通过如下步骤在本地进行开发和构建：

1. 安装部署 Node.js 和 pnpm 环境

   ```bash
   # Node.js 请自行针对您的开发环境进行安装
   npm install -g pnpm@latest-10
   ```

2. 克隆项目到本地

   ```bash
   git clone https://github.com/lkyu-ly/purchase-guide.git
   cd purchase-guide
   ```

3. 安装项目依赖

   ```bash
   pnpm install
   ```

4. 启动开发服务器

   ```bash
   pnpm run doc:dev # 其他命令详见 package.json
   ```

## 维护规范

- 任何引用图片超过一张的markdown文章都推荐使用独立文件夹形式目录结构组织，这是为了便于更新图片和标识图片位置。例如：

  ```text
  docs/moduleA
        └─ postA          # 源目录
           ├─ assets      # 图片目录
           └─ index.md    # 文章主文件（文件名需为index.md）
  ```

  这样，就可以通过 `/moduleA/postA` 访问文章。更多详细讲解请参见 [vitepress基于文件的路由](https://vitepress.dev/zh/guide/routing)。

  同时，为了保证页面尾部的“上一篇/下一篇”能正常显示正确的上/下文，在config.mts的侧边栏配置中，需要保证：
  - 单文件markdown形式的页面，以文件以其文件基名（basename，即拓展名前的部分）作为结尾。
    例如：`{ text: "常见问题解答", link: "/more" },`
  - 文件夹形式的页面，须以`/`结尾
    例如：`{ text: "处理器", link: "/evaluation/processer/" },`

  否则会导致该篇文章不显示其上篇，而下一篇为sidebar中的第一篇文章。
  - [ ] TODO: 目前正在向上述组织结构逐步迁移，如果添加新文章请参考上述结构组织。

- 换下来的旧图文移至该文件夹下的`old`中，图片照原结构存放。

- 使用 `tools/convert2webp.py` 可以将脚本所在目录中的常见位图图片就地无损压缩为 WebP（需 `pip install Pillow`）：

  ```bash
  python tools/convert2webp.py
  ```

  脚本会扫描 `tools/` 目录下当前一级的 `.png`、`.jpg`、`.jpeg`、`.bmp`、`.tif`、`.tiff` 文件，
  并在同目录输出同基础名的 `.webp` 文件。运行结束后会在控制台输出每个文件的转换前后大小、
  单文件压缩率以及本次运行的平均压缩率。

- 若图片为**透明底黑字**，在暗色模式下文字会不可见。
  为 `<img>` 标签加上 `class="dark-invert"` 即可自动在暗色模式下反色显示：

  ```html
  <img src="./assets/XXX.svg" class="dark-invert" />
  ```

  该 class 定义于 `docs/.vitepress/theme/style/var.css`。

## 版权声明

本指南的所有页面默认采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en) 协议授权。未经许可，禁止用于商业用途。
