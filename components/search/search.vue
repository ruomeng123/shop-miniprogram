<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search-container" :style="{'background-color':bgcolor}" @click="searchBoxHangler">
			<view class="search-box" :style="{'border-radius': radius + 'px'}">
				<uni-icons type="search" size="18" color="#c0c4cc"></uni-icons>
				<text>搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		data() {
			return {
				
			};
		},
		props: {
			bgcolor: {
				type: String,
				default: '#fdcbf1'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		methods: {
			searchBoxHangler() {
				// 触发外界通过 @click 绑定的 click 事件处理函数
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.search-container {
	height: 56px;
	// background-color: #fdcbf1;
	display: flex;
	justify-content: center;
	align-items: center;
	.search-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 95%;
		height: 36px;
		color: #808080;
		background-color: rgba(255, 255, 255, .7);
		// border-radius: 20px;
		// box-shadow: 1px 1px 3px rgba(0, 0, 0, .2);
		text {
			font-size: 15px;
			margin-left: 5px;
			
		}
	}
}
</style>