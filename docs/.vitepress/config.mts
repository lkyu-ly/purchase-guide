import markdownItVideo from "@vrcd-community/markdown-it-video";
import mdFootnote from "markdown-it-footnote";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lang: "zh-CN",
	title: "MOE 购机指南",
	description: "MOE 频道 2025 年新生购机指南",
	head: [
		["link", { rel: "icon", href: "/icon.png" }],

		// 不好用的不蒜子
		[
			"script",
			{
				async: "",
				src: "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js",
			},
		],

		// 不蒜子数据修正
		[
			"script",
			{},
			`document.addEventListener("DOMContentLoaded", function () {
			const uvE = document.getElementById('busuanzi_value_site_uv');
			// const pvE = document.getElementById('busuanzi_value_site_pv');
			const uvObs = new MutationObserver((mutationsList) => {
				for (let mutation of mutationsList) {
					if (mutation.type === 'childList') {
						uvObs.disconnect();
						mutation.target.innerHTML = parseInt(mutation.target.innerHTML) + 50;
						break;
					}
				}
			});
			// const pvObs = new MutationObserver((mutationsList) => {
			// 	for (let mutation of mutationsList) {
			// 		if (mutation.type === 'childList') {
			// 			pvObs.disconnect();
			// 			mutation.target.innerHTML = parseInt(mutation.target.innerHTML) + 1800;
			// 			break;
			// 		}
			// 	}
			// });
			const config = {
				childList: true
			};
			uvObs.observe(uvE, config);
			// pvObs.observe(pvE, config);
		});`,
		],

		// 百度统计 https://blog.csdn.net/hjingfeng/article/details/135763120
		[
			"script",
			{ async: true, defer: true },
			`window._hmt = window._hmt || [];
			(function() {
			var hm = document.createElement("script");
			hm.src = "https://hm.baidu.com/hm.js?c897c23eafd0a95ee950211d63d82054";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
			})();`,
		],

		// 百度 SEO
		["meta", { name: "baidu-site-verification", content: "codeva-9MsWLbeqt6" }],

		// 谷歌分析 https://vitepress.dev/zh/reference/site-config#example-using-google-analytics
		[
			"script",
			{
				async: "",
				src: "https://www.googletagmanager.com/gtag/js?id=G-V759BJWZQH",
			},
		],
		[
			"script",
			{},
			`window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', 'G-V759BJWZQH');`,
		],
	],
	cleanUrls: true,
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		logo: "/icon.png",
		nav: [
			{ text: "主页", link: "/" },
			{ text: "机型推荐", link: "/recommend/推荐" },
			{ text: "常见问题解答", link: "/more" },
		],

		sidebar: [
			{ text: "写在前面", collapsed: false, items: [], link: "/前言" },
			{
				text: "笔记本电脑选购须知",
				collapsed: false,
				items: [
					{ text: "笔记本电脑的分类", link: "/introduction/分类" },
					{ text: "笔记本电脑的选择", link: "/introduction/选择" },
					{
						text: "笔记本电脑的购买渠道",
						link: "/introduction/购买",
					},
				],
			},
			{
				text: "笔记本电脑的评价体系",
				collapsed: false,
				items: [
					{ text: "处理器", link: "/evaluation/处理器" },
					{ text: "内存", link: "/evaluation/内存" },
					{ text: "显卡", link: "/evaluation/显卡" },
					{ text: "屏幕", link: "/evaluation/屏幕" },
					{ text: "拓展性", link: "/evaluation/拓展性" },
					{ text: "售后服务", link: "/evaluation/售后服务" },
				],
			},
			{
				text: "机型推荐",
				collapsed: false,
				items: [
					{
						text: "机械革命 无界 14X/15X",
						link: "/recommend/机械革命无界14Xor15X",
					},
					{
						text: "华硕 灵耀 14Air",
						link: "/recommend/华硕灵耀14Air",
					},
					{
						text: "联想来酷 Pro 14",
						link: "/recommend/联想来酷Pro14",
					},
					{
						text: "机械革命 无界15X Pro",
						link: "/recommend/机械革命无界15XPro",
					},
					// 2025年6月5日删除
					// {
					// 	text: "联想 ThinkBook14+ 2023/2024",
					// 	link: "/recommend/联想ThinkBook14plus",
					// }, // + 号导致直接访问页面 404, 改为 plus
					// {
					// 	text: "惠普 星 Book Pro14",
					// 	link: "/recommend/惠普星BookPro14",
					// },
					// {
					// 	text: "华硕 a豆 14Air",
					// 	link: "/recommend/华硕a豆14Air",
					// },
					// {
					// 	text: "惠普 星 Book Pro13",
					// 	link: "/recommend/惠普星BookPro13",
					// },
					// {
					// 	text: "机械革命 蛟龙 15K/Pro",
					// 	link: "/recommend/机械革命蛟龙15KorPRO",
					// },
					// {
					// 	text: "机械革命 极光 X",
					// 	link: "/recommend/机械革命极光X",
					// },
					// {
					// 	text: "机械革命 蛟龙 16Pro",
					// 	link: "/recommend/机械革命蛟龙16pro",
					// },
					// {
					// 	text: "七彩虹 橘宝 R16",
					// 	link: "/recommend/七彩虹橘宝R16",
					// },
					// {
					// 	text: "火影 焕 16Air",
					// 	link: "/recommend/火影焕16Air",
					// },
					// {
					// 	text: "机械革命 耀世/翼龙 15Pro",
					// 	link: "/recommend/机械革命耀世or翼龙15Pro",
					// },
					// {
					// 	text: "华硕 天选 5 锐龙版",
					// 	link: "/recommend/华硕天选5锐龙版",
					// },
					// {
					// 	text: "华硕 天选 5Pro 锐龙版",
					// 	link: "/recommend/华硕天选5pro锐龙版",
					// },
					// {
					// 	text: "联想 拯救者 R9000P 2024",
					// 	link: "/recommend/联想拯救者R9000P2024",
					// },
					// {
					// 	text: "联想 ThinkBook 16P 2024",
					// 	link: "/recommend/联想ThinkBook16P2024",
					// },
					// { text: "华硕 天选 Air ", link: "/recommend/华硕天选Air" },
					// { text: "百亿补贴或其他优秀机型", link: "/recommend/其他" },
					// 2025年1月20日删除
					// { text: "机械革命 无界14Pro", link: "/recommend/机械革命无界14Pro" },
					// { text: "红米 RedmiBook Pro 16 2024", link: "/recommend/RedmiBookPro16" },
					// { text: "七彩虹 隐星P15 TA ", link: "/recommend/p15ta" },
					// { text: "ROG 魔霸7plus", link: "/recommend/ROG魔霸7plus" },
				],
				link: "/recommend/推荐",
			},
			{
				text: "额外问题答疑",
				collapsed: false,
				link: "/more",
				items: [],
			},
			{
				text: "其他文章",
				collapsed: false,
				items: [
					{
						text: "Dive Deeper, Seek Further<br/>一种高效、稳定的 DeepSeek 系列模型调度方案",
						link: "/misc/DeepSeek-Guide",
					},
				],
			},
			{
				text: "更新日志",
				collapsed: false,
				link: "/changelog",
				items: [],
			},
		],

		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/lkyu-ly/purchase-guide",
			},
			{
				icon: {
					svg: '<svg t="1722964922512" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1448" data-darkreader-inline-fill="" width="200" height="200"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" p-id="1449"></path></svg>',
				},
				link: "https://qm.qq.com/q/HU05k45VmK",
			},
		],
		footer: {
			message:
				'<span id="busuanzi_container_site_uv" style="display:none">本站总访问量：<span id="busuanzi_value_site_uv"></span>人次</span><br>Copyright © 2024 MOE Channel',
		},
	},
	markdown: {
		image: {
			// 默认禁用图片懒加载
			lazyLoading: true,
		},
		config: (md) => {
			md.use(mdFootnote);

			// 源代码
			// function render_footnote_block_open(tokens, idx, options) {
			// 	return (
			// 		(options.xhtmlOut
			// 			? '<hr class="footnotes-sep" />\n'
			// 			: '<hr class="footnotes-sep">\n') +
			// 		'<section class="footnotes">\n' +
			// 		'<ol class="footnotes-list">\n'
			// 	);
			// }

			// 重写
			md.renderer.rules.footnote_block_open = () => {
				return (
					'<h2 id="参考资料">参考资料</h2>\n' +
					'<section class="footnotes">\n' +
					'<ol class="footnotes-list">\n'
				);
			};

			// 引入视频解析播放插件
			md.use(markdownItVideo, {
				bilibili: {
					width: "100%",
					height: "387px",
					parameters: {
						autoplay: false, // 自动播放
						poster: true, // 封面预览
						// danmaku:true // 弹幕开关
						muted: true, // 静音播放
					},
				},
			});
		},
	},

	lastUpdated: true,
	sitemap: {
		hostname: "https://moe.lkyu.cf",
	},
});
