import { defineConfig } from 'vitepress';
import mdFootnote from 'markdown-it-footnote';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lang: 'zh-CN',
	title: 'MOE 购机指南',
	description: 'MOE频道2024年新生购机指南',
	head: [
		['link', { rel: 'icon', href: '/icon.png' }],

		// 不好用的不蒜子
		['script', { async: '', src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }],

		// 百度统计 https://blog.csdn.net/hjingfeng/article/details/135763120
		[
			'script',
			{},
			`window._hmt = window._hmt || [];
			(function() {
			var hm = document.createElement("script");
			hm.src = "https://hm.baidu.com/hm.js?c897c23eafd0a95ee950211d63d82054";
			var s = document.getElementsByTagName("script")[0]; 
			s.parentNode.insertBefore(hm, s);
			})();`,
		],

		// 谷歌分析 https://vitepress.dev/zh/reference/site-config#example-using-google-analytics
		['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-V759BJWZQH' }],
		[
			'script',
			{},
			`window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', 'G-V759BJWZQH');`,
		],
	],
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
				text: '笔记本电脑选购须知',
				collapsed: false,
				items: [
					{ text: '笔记本电脑的分类', link: '/introduction/分类' },
					{ text: '笔记本电脑的选择', link: '/introduction/选择' },
					{ text: '笔记本电脑的购买渠道', link: '/introduction/购买' },
				],
			},
			{
				text: '笔记本电脑的评价体系',
				collapsed: false,
				items: [
					{ text: '处理器', link: '/evaluation/处理器' },
					{ text: '内存', link: '/evaluation/内存' },
					{ text: '显卡', link: '/evaluation/显卡' },
					{ text: '屏幕', link: '/evaluation/屏幕' },
					{ text: '拓展性', link: '/evaluation/拓展性' },
					{ text: '售后服务', link: '/evaluation/售后服务' },
				],
			},
			{
				text: '机型推荐',
				collapsed: false,
				items: [
					{ text: '机械革命 无界 14X/15X', link: '/recommend/机械革命无界14Xor15X' },
					{ text: '机械革命 无界14Pro', link: '/recommend/机械革命无界14Pro' },
					{ text: '联想 ThinkBook14+ 2023/2024', link: '/recommend/联想ThinkBook14+' },
					{ text: '惠普 星BookPro14', link: '/recommend/惠普星BookPro14' },
					{ text: '华硕 a豆14Air', link: '/recommend/华硕a豆14Air' },
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
					{ text: '百亿补贴或其他优秀机型', link: '/recommend/其他' },
				],
			},
			{ text: '额外问题答疑', link: '/more' },
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
		footer: {
			message:
				'<span id="busuanzi_container_site_pv" style="opacity: 0" >本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>',
		},
	},
	markdown: {
		image: {
			// 默认禁用图片懒加载
			lazyLoading: true,
		},
		config: md => {
			md.use(mdFootnote);

			// function render_footnote_block_open(tokens, idx, options) {
			// 	return (
			// 		(options.xhtmlOut
			// 			? '<hr class="footnotes-sep" />\n'
			// 			: '<hr class="footnotes-sep">\n') +
			// 		'<section class="footnotes">\n' +
			// 		'<ol class="footnotes-list">\n'
			// 	);
			// }
			md.renderer.rules.footnote_block_open = () => {
				return (
					'<h2 id="参考资料">参考资料</h2>\n' +
					'<section class="footnotes">\n' +
					'<ol class="footnotes-list">\n'
				);
			};
		},
	},
	lastUpdated: true,
	sitemap: {
		hostname: 'https://你的网址.com',
	},
});
