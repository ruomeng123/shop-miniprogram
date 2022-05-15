<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧滚动区 -->
			<scroll-view class="scroll-view-left" scroll-y enhanced :show-scrollbar="false"  :style="{height: screenHeight + 'px'}">
				<block v-for="(item, index) in categoryList" :key="index">
					<view :class="['scroll-view-item-left', index === active ? 'active' : '']" @click="activeChanged(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滚动区 -->
			<scroll-view class="scroll-view-right" scroll-y :scroll-top="scrollTop" :style="{height: screenHeight + 'px'}">
				<!-- 二级分类 -->
				<view class="cate-lv2" v-for="(item2, index2) in cateLevel2" :key="index2">
					<view class="cata-lv2-item">/ {{item2.cat_name}} /</view>
					<!-- 三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3, index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: [] ,// 分类数据
				screenHeight: 0, // 屏幕高度
				active: 0,
				cateLevel2: [], // 二级分类数据
				scrollTop: 0 // 滚动条位置
			};
		},
		onLoad() {
			// 加载分类数据
			this.getCategoryList()
			// 获取系统信息
			const sysInfo = uni.getSystemInfoSync()
			// 获取屏幕高度
			this.screenHeight = sysInfo.screenHeight
		},
		methods: {
			// 获取分类数据
			async getCategoryList() {
				const {data: res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.categoryList = res.message
				// 获取二级分类默认数据
				this.cateLevel2 = res.message[0].children
			},
			// 一级分类的点击事件
			activeChanged(index) {
				this.active = index
				// 获取二级分类每一个item的数据
				this.cateLevel2 = this.categoryList[index].children
				// 重置滚动条位置
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			// 三级分类点击事件
			gotoGoodsList(item3) {
				console.log(item3);
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
		// 左侧滚动区
		.scroll-view-left {
			width: 120px;
			.scroll-view-item-left {
				line-height: 60px;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 12px;
				&.active {
					background-color: #fff;
					position: relative;
					// 渲染激活项左侧的红色指示边线
					&::before {
					  content: '';
					  display: block;
					  width: 3px;
					  height: 30px;
					  background-color: #d299c2;
					  position: absolute;
					  left: 0;
					  top: 50%;
					  transform: translateY(-50%);
					}
				}
			}
		}
		// 右侧滚动区
		.scroll-view-right {
			.cata-lv2-item {
				font-size: 24rpx;
				font-weight: 700;
				text-align: center;
				padding: 30rpx 0;
			}
			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;
				.cate-lv3-item {
					width: 33.33%;
					margin-bottom: 10px;
					display: flex;
					flex-direction: column;
					align-items: center;
					image {
						width: 60px;
						height: 60px;
					}
					text {
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
