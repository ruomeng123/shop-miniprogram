<template>
	<view>
		<view class="goods-item">
			<!-- 左侧盒子 -->
			<view class="left-box">
				<radio :checked="goods.goods_state" color="#db639b" v-if="isRadioShow" @click="radioClick"></radio>
				<image :src="goods.goods_small_logo || defaultPic"></image>
			</view>
			<!-- 右侧盒子 -->
			<view class="right-box">
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info-box">
					<view class="goods-info">￥{{goods.goods_price | toFixed}}</view>
					<uni-number-box :min="1" :value="goods.goods_count" @change="numChange" v-if="isNumBoxShow"></uni-number-box>
				</view>
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
			},
			isRadioShow: {
				type: Boolean,
				default: false
			},
			isNumBoxShow: {
				type: Boolean,
				dafault: false
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
		},
		methods: {
			radioClick() {
				this.$emit('radio-click', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			numChange(val) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					// + 确保是数字类型
					goods_count: +val
				})
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
			display: flex;
			justify-content: center;
			align-items: center;
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
			.goods-info-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.goods-info {
					font-size: 16px;
					color: #c00000;
				}
			}
			
		}
	}
</style>