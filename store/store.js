import Vue from 'vue'
import Vuex from 'vuex'
// 引入购物车模块
import moduleCart from '@/store/cart.js'
// 引入用户信息模块
import moduleUser from '@/store/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 挂载模块
	modules: {
		'm_cart': moduleCart,
		'm_user': moduleUser
	}
})

export default store