<template>
	<view class="ql-bus">
		<view class="ql-search">
			<view class="ql-city">
				<text>{{city}}</text>
			</view>
			
			<view class="ql-input">
				<i class="icon icon-search"></i>
				<input 
					class="ql-sea-i" 
					:value="transitno"
					placeholder="请输入"
					@input="onSerach"
				/>
			</view>
		</view>
		
		<view class="ql-bus-line">
			<view class="result-label">
				<text>线路查询结果: </text>
				<text class="result-label-line">{{transitno}}路</text>
			</view>
			<view class="result-list">
				<view 
					class="result-item"
					v-for="(item, index) in result" 
					:key="index"
					@click="goDetail"
				>
					<text>始发站：{{item.startstation}}</text>
					<text style="margin: 0 20rpx;"> | </text>
					<text>终点：{{item.endstation}}</text>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import { api } from '@/utils/api.js'
	
	export default {
		data() {
			return {
				city: '广州',
				// cityid: 382,
				transitno: 'B16',  // 车次
				result: [],
			}
		},
		onLoad(options) {
			this.getRouteData(this.city, this.transitno)
		},
		onShow() {
		},
		methods: {
			// 线路
			async getRouteData(city, transitno) {
				const data = await api.routeInquiry(city, transitno);
				if(data && data.status === 0) {
					console.log(data.result);
					this.result = [...data.result];
				}
			},
			// 换乘
			/* async getTransferData() {
				const data = await api.transferQuery({});
				if(data && data.status === 0) {
					console.log(data.result)
				}
			}, */
			onSerach(event) {
				// console.log(event.detail.value);
				this.transitno = event.detail.value;
				this.getRouteData(this.city, event.detail.value)
			},
			goDetail() {
				uni.navigateTo({
					url: `/pages/bus/detail?city=${this.city}&transitno=${this.transitno}`
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
	.ql-search{
		width: calc(750rpx - 40rpx);
		height: $h;
		line-height: $h;
		margin: 0 auto 20rpx;
		padding-top: 30rpx;
		display: flex;
		.ql-city{
			flex: 0 0 120rpx;
		}
		.ql-input{
			flex: 1;
			height: $h;
			line-height: $h;
			background: $color;
			border-radius: 10rpx;
			padding: 0 24rpx;
			color: $uni-color-title;
			.icon-search{
				display: inline-block;
				vertical-align: top;
				width: 60rpx;
				font-size: 40rpx;
			}
			.ql-sea-i{
				display: inline-block;
				vertical-align: top;
				width: calc(100% - 80rpx);
				height: $h;
				line-height: $h;
				font-size: 36rpx;
			}
		}
	}
	
	.ql-bus {
		width: calc(750rpx - 40rpx);
		height: 100%;
		padding: 0 20rpx;
		font-size: $font16;
		line-height: 48rpx;
		background-image: url(../../static/image/bg2.jpg);
		background-repeat: no-repeat;
		background-size: 100% 103%;
		background-attachment: fixed;
		color: $color;
		.result-label{
			background: $bgColor2;
			padding: 10rpx 30rpx;
			color: $color;
			font-size: 24rpx;
			.result-label-line{
				color: $uni-color-error;
				margin-left: 20rpx;
				font-size: 34rpx;
			}
		}
		.result-list{
			.result-item{
				height: 100rpx;
				line-height: 100rpx;
				border-bottom: 1rpx solid #ddd;
				font-size: 26rpx;
			}
			
		}
	}
</style>
