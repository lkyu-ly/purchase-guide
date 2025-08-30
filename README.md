# MOE 购机指南

《MOE 频道：2025 年笔记本购机指南》是我们为大学同学们精心编撰的电脑科普&购买一体方案，旨在为有笔记本电脑购买需求的同学提供计算机方面的一些必要知识，以及在选择机型时提供一定程度的参考。

文档目前正在持续维护中，也欢迎大家通过 issue 提供你的宝贵意见，如果本文档对你有所帮助的话，不妨点点 star 支持一下~

## 本地开发

本项目使用 [VitePress](https://vitepress.vuejs.org/)框架进行开发，项目为构建前的源码，可通过如下步骤在本地进行开发和构建:

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

- 换下来的旧图移至该文件夹`asset`下的`old`中

## 版权声明

本指南的所有页面默认采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en) 协议授权。未经许可，禁止用于商业用途。
