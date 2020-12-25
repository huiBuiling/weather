<template>
	<view class="ql-news">
		<scroll-view class="menu" scroll-x :scroll-left="scrollLeft" @scroll="scroll">
			<block v-for="(menuTab,index) in menuData" :key="index">
				<view class="menu-con" :id="'tabNum'+index" @click="switchTab(index)">
					<view :class="{'active': currentTab === index}">
						<view class="menu-txt">{{menuTab}}</view>
						<view class="menu-bottom"></view>
					</view>    
				</view>
			</block>
		</scroll-view>
		
		<view class="list">
			<view class="list-item">
				<view class="item-text">
					<text class="item-title">泡泡玛特回应二次销售被拆盲盒：确认属实 涉事员工辞退永不录用</text>
					<text class="item-time">2020-12-25 04:46:00</text>
				</view>
				<image src="https://n.sinaimg.cn/finance/crawl/483/w550h733/20201225/b6c8-kftfpiw0872654.jpg"></image>
				<view class="item-label">中国消费者报</view>
			</view>
		</view>
		
		<view class="list" v-for="(item,index) in list" :key="index">
			<view class="list-item" @click="goDetail(item)">
				<view class="item-text">
					<text class="item-title">{{item.title}}</text>
					<text class="item-time">{{item.time}}</text>
				</view>
				<image :src="item.pic"></image>
				<view class="item-label">{{item.src}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { api } from '@/utils/api.js'
	// newsMenu, getNews, searchNews,
	export default {
		data() {
			return {
				// menu: ["头条","新闻","国内","国际","政治","财经","体育","娱乐","军事","教育","科技","NBA","股票","星座","女性","健康","育儿"],
				menuData: [],
				list: [],
				currentTab: 2,
				scrollLeft: 0,
				page: 0,
			}
		},
		onLoad() {
			this.getMenuData()
			this.getData()
		},
		methods: {
			scroll(e) {
				console.log(e)
				this.scrollLeft = e.detail.scrollLeft
			},
			onReachBottom() {
				console.log('滚动到底部')
				this.getData(this.currentTab)
			},
			// 获取频道列表
			async getMenuData(val = 0) {
				let reqData = await api.newsMenu();
				this.menuData = reqData.result
			},
			
			async getData(val = 0) {
				const channel = this.menuData[val]
				let reqData = await api.getNews({
					channel,
					page: this.page + 1,
				});
				
				reqData = reqData.result.list
				console.log(reqData)
				this.list = [...this.list, ...reqData]
				this.page += 1;
				
			},
			switchTab(val) {
				this.page = 0;
				this.currentTab = val;
				this.list = []
				this.getData(val);
			},
			goDetail(data) {
				// uni.setStorage('newsDetail', data);
				uni.setStorage({
					key: 'news_detail',
					data,
				})
				uni.navigateTo({
					url: './detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// page{
	// 	height: 100%;
	// }
	
	$fontC: #4e4d4d;
	.ql-news{
		width: 750rpx;
		margin: 0 auto;
	}
	
	.menu{
		height: 60rpx;
		white-space: nowrap;
		padding-top: 15rpx;
		border-bottom: 1px solid $borColor2;
		.menu-con{
			display: inline-block;
			vertical-align: middle;
			width: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: $fontC;
			.menu-bottom{
				width: 0;
				margin: auto;
				border-bottom: 6rpx solid $yellow;
				border-top: 6rpx solid $yellow;
				border-radius:20rpx;
				margin-top: 10rpx;
			}
			.active{
				color: $black;
				.menu-txt{
					font-weight: bold;
				}
				.menu-bottom{
					width: 40rpx;
					transition: width 0.4s;
				}
			}
		}
	}
	
	.list{
		padding: 0 20rpx;
	}
	.list-item{
		display: grid;
		grid-template-columns: auto 240rpx;
		border-bottom: 1px solid $borColor2;
		padding: 20rpx 0;
		.item-text{
			position: relative;
			font-size: $font;
			padding-right: 30rpx;
			text{
				display: block;
			}
			.item-title{
				@include text-overflow;
			}
			.item-time{
				position: absolute;
				left: 0;
				bottom: 10rpx;
				font-size: $font12;
				color: $color4;
				white-space: nowrap;
			}
		}
		image{
			width: 240rpx;
			height: 140rpx;
			border-radius: 10rpx;
		}
		.item-label{
			font-size: $font12;
			margin-top: 10rpx;
		}
	}
</style>
