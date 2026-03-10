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

## 贡献指南

本项目在 dev 分支进行开发，达成发布条件后会通过 `Squash and merge` 合并到 main 分支以部署到生产环境 `production envrionment`。

下面是仓库拥有者给自己看的备忘（）：

### 第一步：创建 Pull Request（PR）

1. 打开仓库的 GitHub 页面
2. 点击 **`Pull requests`** 选项卡 → 点击 **`New pull request`**
3. 设置：
   - **base 分支**: `main`
   - **compare 分支**: `dev`
4. 点击 **`Create pull request`**，填写标题和描述后确认创建

### 第二步：使用 "Squash and merge" 选项

1. 在打开的 PR 页面中，找到合并按钮的下拉菜单（通常显示为 **`Merge pull request`**）
2. **点击下拉箭头** → 选择 **`Squash and merge`**
   - 这会将所有 `dev` 的提交压缩成一条新提交到 `main`
3. 编辑新提交的标题和描述（默认会列出所有被压缩的提交）
4. 点击 **`Squash and merge`** 确认

### 第三步：同步 `dev` 分支到最新状态

⚠️ 关键步骤：合并后 `main` 和 `dev` 会出现分叉（因为 `dev` 保留了原始提交，而 `main` 只有一条新提交）。**必须同步 `dev` 分支才能继续开发：**

```bash
git checkout dev
git pull origin dev         # 确保本地 dev 最新
git merge origin/main       # 将 main 的合并提交同步到 dev
git push origin dev         # 推送更新后的 dev
```

### 最终效果

1. **`main` 分支**：新增一条提交（包含所有 `dev` 的更改）
2. **`dev` 分支**：
   - 保留所有原始提交（未压缩）
   - 新增一条合并提交（同步 `main` 的压缩结果）
3. 后续开发可直接在 `dev` 继续提交，下次 PR 时重复上述流程即可

## 版权声明

本指南的所有页面默认采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en) 协议授权。未经许可，禁止用于商业用途。
