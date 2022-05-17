<template>
	<view>
		<view class="goods-list-box">
			<view class="good-item-box" v-for="(goods,index) in goodsList" :key="index" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isLoading: false, // 节流阀
			};
		},
		onLoad(option) {
			this.queryObj.query = option.query || ''
			this.queryObj.cid = option.cid || ''
			
			// 加载商品列表数据
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(callback) {
				this.isLoading = true
				const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading = false
				console.log(res);
				// 只要数据请求完毕,就立即按需调用callback回调函数
				callback && callback()
				if(res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		onReachBottom() {
			// 判断是否还有数据
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
				return uni.$showMsg('我也是有底线的!')
			}
			
			// 判断是否请求完成
			if(this.isLoading) return
			
			this.queryObj.pagenum++
			this.getGoodsList()
			console.log('加载了');
		},
		// 下拉刷新事件
		onPullDownRefresh() {
			// 重置关键数据
			this.queryObj.pagenum = 1,
			this.total = 0,
			this.isLoading = false,
			this.goodsList = []
			// 重新发起请求,并关闭下拉刷新
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
.goods-list-box {
	
}
</style>
