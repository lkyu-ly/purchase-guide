import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lang: 'zh-CN',
	title: 'MOE 购机指南',
	description: 'MOE频道2024年新生购机指南',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '主页', link: '/' },
			{ text: '机型推荐', link: '/markdown-examples' },
		],

		sidebar: [
			{
				text: '机型推荐',
				items: [
					{ text: '机械革命 无界 14X/15X', link: '/recommended/无界' },
					{ text: '联想 ThinkBook14+ 2023/2024', link: '/recommended/thinkbook' },
				],
			},
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
	},
});
