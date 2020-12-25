<template>
	<view class="ql-tool">
		<view class="tool-con">
			<view class="tool-item" 
				v-for="item in menu" 
				@click="goTab(item.type)"
				:key="item.name"
			>
				<image :src="item.imgs" :class="{'we': item.type === 'weather'}"></image>
				<view class="tool-text">
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { api } from '@/utils/api.js'
	import weather from '@/static/image/weather.png'
	import bus from '@/static/image/bus.png'
	import joke from '@/static/image/joke-sel.png'
	import conste from '@/static/image/xz.png'
	import news from '@/static/image/news.png'
	
	// 主页
	export default {
		data() {
			return {
				menu: [{
					name: '天气',
					type: 'weather',
					imgs: weather
				},
				{
					name: '星座',
					type: 'constellation',
					imgs: conste
				},
				{
					name: '公交',
					type: 'bus',
					imgs: bus
				},
				{
					name: '笑话',
					type: 'joke',
					imgs: joke
				},{
					name: '新闻',
					type: 'news',
					imgs: news
				}]
			}
		},
		methods: {
			goTab(type) {
				uni.navigateTo({
					url: `/pages/${type}/index`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}
	
	$h: 80rpx;
	.ql-tool {
		width: calc(750rpx - 40rpx);
		height: 100%;
		padding: 0 20rpx;
		background-image: url(../../static/image/bg2.jpg);
		background-repeat: no-repeat;
		background-size: 100% 103%;
		background-attachment: fixed;
		
		.tool-con{
			display: flex;
			width: 540rpx;
			// height: 540rpx;
			margin: 0 auto 0;
			flex-wrap: wrap;
			text-align: center;
			color: $color;
			font-size: $font16;
			font-weight: bold;
			padding-top: 50%;
			.tool-item{
				width: 140rpx;
				height: 140rpx;
				background: rgba(250, 250, 250, .5);
				border-radius: 10rpx;
				margin: 0 17rpx 24rpx;
				border: 1px solid #e9f3fd;
			}
			image{
				width: 60rpx;
				height: 60rpx;
				padding-top: 20rpx;
			}
			.we{
				width: 80rpx;
			}
			.tool-text{
				height: 20px;
			}
		}
		
	}
</style>
