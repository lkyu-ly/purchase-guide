import DefaultTheme from "vitepress/theme";
import "./style/index.css";
import { googleAnalytics, baiduAnalytics, trackPageview, Announcement } from "@theojs/lumen";

import mediumZoom from "medium-zoom";
import { useRoute } from "vitepress";
import { nextTick, onMounted, watch, h } from "vue";
import { NProgress } from "nprogress-v2/dist/index.js"; // 进度条组件
import { inBrowser } from "vitepress";
import "nprogress-v2/dist/index.css"; // 进度条样式

import notice from "./components/notice.vue";
import { Icon } from "@iconify/vue";

// // 百度统计
// // 2025-02-01: 将路由统计时机从 `onBeforeRouteChange` 改为 `onAfterRouteChange`，并增加 `_hmt` 未定义的检查
// DefaultTheme.enhanceApp = ({ app, router, siteData }) => {
// 	router.onAfterRouteChange = (to) => {
// 		console.log("路由已改变为: ", to);
// 		if (typeof _hmt !== "undefined") {
// 			_hmt.push(["_trackPageview", to]);
// 			console.log("百度统计已记录: ", to);
// 		} else {
// 			console.error("百度统计未加载，请检查脚本是否正确引入。");
// 		}
// 	};
// };

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

		if (inBrowser) {
			NProgress.configure({ showSpinner: false });
			router.onBeforeRouteChange = () => {
				NProgress.start(); // 开始进度条
			};
			router.onAfterRouteChanged = () => {
				NProgress.done(); // 停止进度条
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

	Layout() {
		return h(DefaultTheme.Layout, null, {
			"layout-top": () => h(notice), // 使用layout-top插槽
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
