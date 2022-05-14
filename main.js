import App from './App'
// 导入 $http 对象
import { $http } from '@escook/request-miniprogram'

// 挂载到uni上
uni.$http = $http
// 配置请求根路径
// $http.baseUrl = 'http://localhost:8080/'
$http.baseUrl = 'https://www.uinav.com'

// 请求开始之前TODO
$http.beforeRequest = function (options) {
  uni.showLoading({
	  title: '数据加载中...'
  })
}
// 请求完成后TODO
$http.beforeRequest = function (options) {
  uni.hideLoading()
}

// 全局封装一个请求失败后的消息提示方法
uni.$showMsg = function (title = '数据加载失败!', duration = 1500, icon = 'none') {
	uni.showToast({
		title,
		duration,
		icon
	})
}








// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif