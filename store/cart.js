export default {
	// 为当前模块开启命名空间
	namespaced: true,
	// 购物车数据
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
	}),
	mutations: {
		// 添加购物车方法
		addToCart(state, goods) {
			// 先判断购物车里是否有该商品
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if (!findResult) {
				// 代表没有该商品
				state.cart.push(goods)
			} else {
				// 代表有该商品,将商品数量+1即可
				findResult.goods_count++
			}
			// 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			this.commit('m_cart/saveToStorage')
		},
		// 将数据存储到本地
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车选中状态
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if (findResult) {
				// 更新商品状态
				findResult.goods_state = goods.goods_state
				// 持久化存储到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新商品加购数量
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if (findResult) {
				// 更新商品数量
				findResult.goods_count = goods.goods_count
				// 持久化存储到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		// 购物车滑动删除
		removeGoodsById(state, goods) {
			// 过滤掉要删除的商品
			state.cart = state.cart.filter(item => item.goods_id !== goods.goods_id)
			// 持久化存储到本地
			this.commit('m_cart/saveToStorage')
		},
		// 更新全选按钮的选中状态
		updateAllGoodsState(state, newState) {
			state.cart.forEach(item => item.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},
	getters: {
		// 计算购物车商品总数
		total(state) {
			// let count = 0
			// state.cart.forEach(goods => count += goods.goods_count)
			// return count
			return state.cart.reduce((total, goods) => total += goods.goods_count, 0)
		},
		// 勾选商品的总数量
		checkedGoodsCount(state) {
			// 过滤出选中的商品，将它们的数量进行叠加
			return state.cart.filter(item => item.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		// 计算所有选中商品的总价
		checkedGoodsAmount(state) {
			return state.cart.filter(item => item.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
		}
	}
}
