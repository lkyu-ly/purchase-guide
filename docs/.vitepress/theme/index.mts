import DefaultTheme from "vitepress/theme";
import "./style/index.css";

import mediumZoom from "medium-zoom";
import { useRoute } from "vitepress";
import { nextTick, onMounted, watch } from "vue";

// 百度统计
// 2025-02-01: 将路由统计时机从 `onBeforeRouteChange` 改为 `onAfterRouteChange`，并增加 `_hmt` 未定义的检查
DefaultTheme.enhanceApp = ({ app, router, siteData }) => {
	router.onAfterRouteChange = (to) => {
		console.log("路由已改变为: ", to);
		if (typeof _hmt !== "undefined") {
			_hmt.push(["_trackPageview", to]);
			console.log("百度统计已记录: ", to);
		} else {
			console.error("百度统计未加载，请检查脚本是否正确引入。");
		}
	};
};

export default {
	extends: DefaultTheme,
	// ...DefaultTheme, //或者这样写也可

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
};
