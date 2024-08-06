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
					{ text: '机械革命 无界 14X/15X', link: '/recommended/mechrevowujie.md' },
					{ text: '联想 ThinkBook14+ 2023/2024', link: '/recommended/thinkbook' },
					{ text: '惠普 星BookPro14', link: '/recommended/hpstarbook' },
					{ text: '华硕 a豆14Air', link: '/recommended/ASUSadou' },
					{ text: '红米RedmiBook Pro 16 2024', link: '/recommended/redmibookpro16' },
					{ text: '机械革命 蛟龙15K/Pro', link: 'recommended/mechrevodragon15' },
					{ text: '机械革命 蛟龙16pro', link: '/recommended/mechrevodragon16pro' },
					{ text: '七彩虹隐星P15 TA ', link: '/recommended/p15ta' },
					{ text: '机械革命 极光X', link: '/recommended/mechrevoaurorax' },
					{
						text: '机械革命耀世/翼龙15Pro',
						link: '/recommended/machrevoyaoshi-yilong15pro',
					},
					{ text: '华硕天选5锐龙版', link: '/recommended/ASUStianxuan5AMD' },
					{ text: '华硕天选5pro锐龙版', link: '/recommended/ASUStianxuan5proAMD' },
					{ text: '华硕天选Air ', link: '/recommended/ASUStianxuanair' },
					{ text: 'ROG 魔霸7plus', link: '/recommended/ROGmoba7plus' },
				],
			},
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/lkyu-ly/purchase-guide' }],
	},
});
