<template>
	<view>
		<view class="goods-item">
			<!-- 左侧盒子 -->
			<view class="left-box">
				<image :src="goods.goods_small_logo || defaultPic"></image>
			</view>
			<!-- 右侧盒子 -->
			<view class="right-box">
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info">￥{{goods.goods_price | toFixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters: {
			// 将价格转换为带两位小数点的数字
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		.left-box {
			margin-right: 5px;
			image {
				display: block;
				width: 100px;
				height: 100px;
			}
		}
		.right-box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-name {
				font-size: 13px;
			}
			.goods-info {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>