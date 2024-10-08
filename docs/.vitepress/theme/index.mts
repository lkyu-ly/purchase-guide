import DefaultTheme from 'vitepress/theme';
import './style/index.css';
// import './Layout.vue';

import mediumZoom from 'medium-zoom';
import { useRoute } from 'vitepress';
import { nextTick, onMounted, watch } from 'vue';

// 百度统计
DefaultTheme.enhanceApp = ({ app, router, siteData }) => {
	router.onBeforeRouteChange = to => {
		console.log('路由将改变为: ', to);
		if (typeof _hmt !== 'undefined') {
			_hmt.push(['_trackPageview', to]);
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
			mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
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
