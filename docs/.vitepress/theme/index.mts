import DefaultTheme from "vitepress/theme";
import "./style/index.css";

import { baiduAnalytics, googleAnalytics, trackPageview } from "@theojs/lumen";
import mediumZoom from "medium-zoom";
import { inBrowser, useRoute } from "vitepress";
import { h, nextTick, onMounted, watch } from "vue";

// 路由切换进度条
import "nprogress-v2/dist/index.css"; // 进度条样式
import { NProgress } from "nprogress-v2/dist/index.js"; // 进度条组件

// 通知
import notice from "./components/notice.vue";

// iconify 图标
import { Icon } from "@iconify/vue";

// 不蒜子
import busuanzi from "busuanzi.pure.js";

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined;

export default {
	extends: DefaultTheme,
	// ...DefaultTheme, //或者这样写也可
	enhanceApp: ({ app, router }) => {
		// 图标组件
		app.component("Icon", Icon);

		// 谷歌统计
		googleAnalytics({ id: "G-V759BJWZQH" });

		// 百度统计
		baiduAnalytics({ baiduId: "c897c23eafd0a95ee950211d63d82054" });
		if (typeof window !== "undefined") {
			trackPageview("c897c23eafd0a95ee950211d63d82054", window.location.href);
		}

		// 路由切换时的操作：处理进度条、更新不蒜子
		// VuePress 的 router.onAfterRouteChanged 等是一个单次赋值属性，第二次赋值会完全覆盖第一次，所以需要合并事件处理函数。
		if (inBrowser) {
			NProgress.configure({ showSpinner: false });
			router.onBeforeRouteChange = () => {
				NProgress.start(); // 开始进度条
			};
			router.onAfterRouteChanged = () => {
				NProgress.done(); // 停止进度条
				busuanzi.fetch();
				console.log("busuanzi", busuanzi);
			};
		}

		// 彩虹背景动画样式
		if (typeof window !== "undefined") {
			watch(
				() => router.route.data.relativePath,
				() => updateHomePageStyle(location.pathname === "/"),
				{ immediate: true }
			);
		}
	},

	setup() {
		const route = useRoute();
		const initZoom = () => {
			// mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
			mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
		};
		onMounted(() => {
			initZoom();
		});
		watch(
			() => route.path,
			() => nextTick(() => initZoom())
		);
	},

	// 注入布局插槽
	Layout() {
		return h(DefaultTheme.Layout, null, {
			"layout-top": () => h(notice), // 通知layout-top插槽
		});
	},
};

// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
	if (value) {
		if (homePageStyle) return;

		homePageStyle = document.createElement("style");
		homePageStyle.innerHTML = `
			:root {
			animation: rainbow 12s linear infinite;
			}`;
		document.body.appendChild(homePageStyle);
	} else {
		if (!homePageStyle) return;

		homePageStyle.remove();
		homePageStyle = undefined;
	}
}
