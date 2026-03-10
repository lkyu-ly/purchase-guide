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

**维护提示：**

- 换下来的旧图文移至该文件夹下的`old`中，图片照原结构存放。
- 使用 `tools/convert2webp.py` 可以清理废弃图片并将 PNG/JPG 批量转换为 WebP（需 `pip install Pillow`）：

  ```bash
  # 第一步：扫描预览（只读，不修改任何文件）
  python tools/convert2webp.py

  # 第二步：确认报告无误后，执行实际转换
  python tools/convert2webp.py --confirm
  ```

  脚本会自动：将 PNG/JPG 转为 WebP 并更新 `.md` 引用；将原始图片和未被引用的废弃图片归档；任一步骤失败则完整回滚。
  - [ ] TODO: 取消输入输出路径硬编码，支持全仓库 markdown 扫描而不是预定义路径

- 若图片为**透明底黑字**，在暗色模式下文字会不可见。
  为 `<img>` 标签加上 `class="dark-invert"` 即可自动在暗色模式下反色显示：

  ```html
  <img src="./assets/XXX.svg" class="dark-invert" />
  ```

  该 class 定义于 `docs/.vitepress/theme/style/var.css`。

## 版权声明

本指南的所有页面默认采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en) 协议授权。未经许可，禁止用于商业用途。
