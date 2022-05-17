<template>
	<!-- 解决商品价格闪烁的问题 -->
	<view class="goods-detail-container" v-if="goods_info.goods_name">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item, index) in goods_info.pics">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="goods-detail-info">
			<!-- 价格 -->
			<view class="goods-price">￥{{goods_info.goods_price}}</view>
			<!-- 主体 -->
			<view class="goods-info-body">
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<view class="collect">
					<uni-icons type="star" size="18" color="gary"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="freight">运费：免运费</view>
		</view>

		<!-- 商品详情区域 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		
		<!-- 商品导航组件 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: {}, // 商品信息数据
				// 左侧按钮组的配置对象
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				// 右侧按钮组的配置对象
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#e193db',
						color: '#fff'
				 },
					{
						text: '立即购买',
						backgroundColor: '#db639b',
						color: '#fff'
					}
				]
			};
		},
		onLoad(option) {
			const goods_id = option.goods_id
			this.getGoodsDetail(goods_id)
		},
		methods: {
			// 请求数据
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				// 解决渲染商品详情区域时图片之间有空隙的问题
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display: block;" ').replace(/webp/g, 'jpg')
				this.goods_info = res.message
			},
			// 点击轮播图进行预览
			preview(index) {
				uni.previewImage({
					// 从第几个开始预览
					current: index,
					// 预览图片url的数组
					urls: this.goods_info.pics.map(item => {
						return item.pics_big
					})
				})
			},
			// 底部导航左侧图标点击事件
			onClick(e) {
				if(e.content.text === "购物车") {
					uni.switchTab({
						url: '../../pages/cart/cart'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-container {
		margin-bottom: 50px;
	}
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-detail-info {
		margin: 10px;
		margin-right: 0;

		.goods-price {
			font-size: 18px;
			color: #c00000;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 5px;
			}

			.collect {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 120rpx;
				font-size: 12px;
				color: gary;
				border-left: 1px solid #efefef;
			}
		}

		.freight {
			margin: 10px 0;
			color: gary;
			font-size: 12px;
		}
	}
	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
