<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<search @click="gotoSearch"></search>
		</view>
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" indicator-active-color="#fefefe" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id" class="swiper-item">
					<image class="swiper-img" :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="cate-list">
			<view class="cate-item" v-for="(item, index) in navList" :key="index" @click="navClick(item)">
				<image class="cate-img" :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层标题区域 -->
				<image class="floor-title" :src="item.floor_title.image_src" ></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧图片 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧图片 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, index2) in item.product_list" :key="index2" v-if="index2 !== 0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
						</navigator>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [], // 轮播图数据
				navList: [], // 分类导航数据
				floorList: [], // 楼层区域数据
			};
		},
		onLoad() {
			// 加载轮播图数据
			this.getSwiperList()
			// 加载分类导航数据
			this.getNavList()
			// 加载楼层区域数据
			this.getFloorList()
		},
		methods: {
			// 获取轮播图方法
			async getSwiperList() {
				// 发起请求
				const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// 请求失败,提示消息
				if(res.meta.status !== 200) {
					return uni.showMsg()
				} 
				// 请求成功
				this.swiperList = res.message
			},
			// 获取分类导航方法
			async getNavList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
				// 请求失败
				if(res.meta.status !== 200) {
					return uni.$showMsg()
				}
				// 请求成功
				this.navList = res.message
			},
			// 点击分类项
			navClick(item) {
				if(item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 获取楼层区域数据方法
			async getFloorList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200) {
					return uni.$showMsg()
				}
				// 添加自定义属性url
				res.message.forEach(floor => {
					floor.product_list.forEach(prov => {
						// 将请求回来的url地址参数重新拼接到实际的路径中
						prov.url = '/subpkg/goods_list/goods_list?' + prov.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
			gotoSearch() {
				uni.navigateTo({
					url: '../../subpkg/search_page/search_page'
				})
			}
			
		}
		
	}
</script>

<style lang="scss">
	// 搜索框
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	// 轮播图
	.swiper {
		height: 330rpx;
		.swiper-item,
		.swiper-img {
			width: 100%;
			height: 100%;
		}
	}
	// 分类导航
	.cate-list {
		display: flex;
		justify-content: space-around;
		margin: 30rpx 0;
		.cate-item {
			width: 128rpx;
			height: 140rpx;
			.cate-img {
				width: 100%;
				height: 100%;
			}
		}
	}
	// 楼层区域
	.floor-list {
		.floor-item {
			padding-top: 30rpx;
		}
		.floor-title {
			height: 60rpx;
			width: 100%;
			display: flex;
		}
		.floor-img-box {
		  display: flex;
		  padding-left: 10rpx;
		  .right-img-box {
		    display: flex;
		    flex-wrap: wrap;
		    justify-content: space-evenly;
		  }
		}
	}
</style>
