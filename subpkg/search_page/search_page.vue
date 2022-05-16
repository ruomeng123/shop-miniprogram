<template>
	<view>
		<!-- 搜索区域 -->
		<view class="search-box">
			<uni-search-bar bgColor="rgba(255,255,255,.7)" placeholder="搜索" cancelButton="none" :radius="100" @input="input" />
		</view>
		<!-- 搜索建议区域 -->
		<view class="search-suggest-box" v-if="searchResult.length">
			<view class="suggest-item" v-for="(item, index) in searchResult" :key="index" @click="gotoDetail(item)">
				<text class="suggest-text">{{ item.goods_name }}</text>
				<uni-icons type="forward" size="18"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史区域 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" size="18" @click="clear"></uni-icons>
			</view>
			<view class="history-list" >
				<uni-tag class="history-item" :text="item" v-for="(item,index) in history" :key="index" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null, // 定时器id
				keyWord: '' , // 输入关键词
				searchResult: [], // 搜索联想列表
				historyList: [], // 搜索历史记录
			};
		},
		onLoad() {
			// 加载本地存储的搜索关键字
			this.historyList = JSON.parse(uni.getStorageSync('searchKeyWords') || '[]')
		},
		methods: {
			input(e) {
				// 输入框防抖功能
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keyWord = e
					this.getSearchList()
				}, 700)
			},
			// 获取搜索联想建议列表
			async getSearchList() {
				if(this.keyWord.length === 0) {
					this.searchResult = []
					return
				}
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.keyWord })
				if(res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.searchResult = res.message
				this.saveKeyWord()
			},
			// 搜索建议item点击事件
			gotoDetail(item) {
				uni.navigateTo({
					url: '../goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			// 存储搜索关键字到搜索历史中
			saveKeyWord() {
				// this.historyList.push(this.keyWord)
				// 解决关键词存储重复问题
				const set = new Set(this.historyList)
				set.delete(this.keyWord)
				set.add(this.keyWord)
				this.historyList = Array.from(set)
				// 永久存储到本地
				uni.setStorageSync('searchKeyWords',JSON.stringify(this.historyList))
			},
			// 清空搜索记录
			clear() {
				this.historyList = []
				uni.setStorageSync('searchKeyWords', '[]')
			},
			// 搜索历史跳转到商品列表页
			gotoGoodsList(keyWord) {
				uni.navigateTo({
					url: '../goods_list/goods_list?query=' + keyWord
				})
			}
		},
		computed: {
			history() {
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
.search-suggest-box {
	padding: 0 5px;
	.suggest-item {
		padding: 12px 0;
		font-size: 12px;
		border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.suggest-text {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			margin-right: 5px;
		}
	}
}
.history-box {
	padding: 5px;
	.history-title {
		height: 35px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #efefef;
		font-size: 13px;
	}
	.history-list {
		display: flex;
		// justify-content: left;
		// align-items: center;
		flex-wrap: wrap;
		.history-item {
			margin-right: 5px;
			margin-top: 10px;
		}
	}
}
</style>
