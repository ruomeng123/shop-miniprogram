<template>
	<!-- 最外层的容器 -->
	<view class="my-settle-container">
	  <!-- 全选区域 -->
	  <label class="radio" @click="changeAllState">
	    <radio color="#db639b" :checked="isFullChecked" /><text>全选</text>
	  </label>
	
	  <!-- 合计区域 -->
	  <view class="amount-box">
	    合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
	  </view>
	
	  <!-- 结算按钮 -->
	  <view class="btn-settle" @click="settlement">结算({{checkedGoodsCount}})</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', [ 'token']),
			...mapGetters('m_user', ['addressStr']),
			...mapGetters('m_cart', ['checkedGoodsCount', 'total', 'checkedGoodsAmount']),
			// 是否全选
			isFullChecked() {
				return this.total === this.checkedGoodsCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullChecked)
			},
			// 结算按钮点击事件
			settlement() {
				if(!this.checkedGoodsCount) {
					return uni.$showMsg('您还未选择要结算的商品!')
				}
				if(!this.addressStr) {
					return uni.$showMsg('请选择收货地址!')
				}
				if(!this.token) {
					return uni.$showMsg('请登录后再结算!')
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
	  // position: fixed;
	  // bottom: 0;
	  // left: 0;
	  // width: 100%;
	  height: 50px;
	  // 将背景色从 cyan 改为 white
	  background-color: white;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding-left: 5px;
	  font-size: 14px;
	
	  .radio {
	    display: flex;
	    align-items: center;
	  }
	
	  .amount {
	    color: #c00000;
	  }
	
	  .btn-settle {
	    height: 50px;
	    min-width: 100px;
	    background-color: #db639b;
	    color: white;
	    line-height: 50px;
	    text-align: center;
	    padding: 0 10px;
	  }
	}
</style>