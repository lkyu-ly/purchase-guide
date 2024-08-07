import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lang: 'zh-CN',
	title: 'MOE 购机指南',
	description: 'MOE频道2024年新生购机指南',
	head: [['link', { rel: 'icon', href: '/icon.png' }]],
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		logo: '/icon.png',
		nav: [
			{ text: '主页', link: '/' },
			{ text: '机型推荐', link: '/recommend/推荐' },
		],

		sidebar: [
			{ text: '写在前面', items: [{ text: '前言', link: '/前言' }] },
			{
				text: '机型推荐',
				collapsed: false,
				items: [
					{ text: '机械革命 无界 14X/15X', link: '/recommend/机械革命无界14Xor15X' },
					{ text: '机械革命 无界14Pro', link: '/recommend/机械革命无界14Pro' },
					{ text: '联想 ThinkBook14+ 2023/2024', link: '/recommend/联想ThinkBook14+' },
					{ text: '惠普 星BookPro14', link: '/recommend/惠普星BookPro14' },
					{ text: '华硕 a豆14Air', link: '/recommend/华硕a豆14Air.md' },
					{ text: '红米 RedmiBook Pro 16 2024', link: '/recommend/RedmiBookPro16' },
					{ text: '机械革命 蛟龙15K/Pro', link: '/recommend/机械革命蛟龙15KorPRO' },
					{ text: '机械革命 蛟龙16pro', link: '/recommend/机械革命蛟龙16pro' },
					{ text: '七彩虹 隐星P15 TA ', link: '/recommend/p15ta' },
					{ text: '机械革命 极光X', link: '/recommend/机械革命极光X' },
					{
						text: '机械革命 耀世/翼龙15Pro',
						link: '/recommend/机械革命耀世or翼龙15Pro',
					},
					{ text: '华硕 天选5锐龙版', link: '/recommend/华硕天选5锐龙版' },
					{ text: '华硕 天选5pro锐龙版', link: '/recommend/华硕天选5pro锐龙版' },
					{ text: '华硕 天选Air ', link: '/recommend/华硕天选Air' },
					{ text: 'ROG 魔霸7plus', link: '/recommend/ROG魔霸7plus' },
				],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/lkyu-ly/purchase-guide' },
			{
				icon: {
					svg: '<svg t="1722964922512" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1448" data-darkreader-inline-fill="" width="200" height="200"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" p-id="1449"></path></svg>',
				},
				link: 'https://qm.qq.com/q/HU05k45VmK',
			},
		],
	},
});
