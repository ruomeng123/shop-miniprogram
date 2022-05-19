import {
	mapGetters
} from 'vuex'

export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	watch: {
		total() {
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				// 选中购物车图标
				index: 2,
				// text 的值必须是字符串，不能是数字
				text: this.total + ''
			})
		}
	}
}
