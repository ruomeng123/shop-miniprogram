<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址组件 -->
		<my-address></my-address>
		<!-- 购物车头部标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="text">购物车</text>
		</view>
		<!-- 购物车商品列表 -->
		<uni-swipe-action>
			<block v-for="(goods, index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
					<my-goods :goods="goods" :isRadioShow="true" :isNumBoxShow="true" @radio-click="radioClickHandler"
						@num-change="numChange"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 底部结算组件 -->
		<view class="settle-box">
			<my-settle></my-settle>
		</view>

	</view>
	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
		<text class="tip-text">购物车空空如也~</text>
		<image src="/static/cart03_zz.png" class="empty-img" mode="widthFix"></image>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#fa5151'
					}
				}]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioClickHandler(e) {
				this.updateGoodsState(e)
			},
			numChange(e) {
				this.updateGoodsCount(e)
			},
			swipeActionClickHandler(goods) {
				this.removeGoodsById(goods)
			}
		}

	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}

	.cart-title {
		display: flex;
		align-items: center;
		padding-left: 5px;
		height: 40px;
		border-bottom: 1px solid #efefef;

		.text {
			font-size: 14px;
			margin-left: 5px;
		}
	}

	.settle-box {
		z-index: 999;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	
	.empty-cart {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding-top: 150px;
	  .tip-text {
	    font-size: 16px;
	    color: gray;
	    margin-bottom: 15px;
	  }
	}
</style>
