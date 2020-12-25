<template>
	<view class="bus-detail">
		<view class="bus-card">
			<view class="bus-station">
				<text>{{detail.startstation}}</text>
				<text style="margin: 0 20rpx;">-</text>
				<text>{{detail.endstation}}</text>
			</view>
			
			<view class="bus-time">
				<text>首班:{{detail.starttime}}</text>
				<text style="margin-left: 10rpx;">晚班:{{detail.endtime}}</text>
				<text style="margin: 0 10rpx;"> · </text>
				<text>票价:{{detail.price}}元</text>
			</view>
		</view>
		
		<view class="bus-lists">
			<view
				class="lists-item"
				v-for="item in detail.list"
				:key="item.sequenceno"
			>
				<view class="lists-item-s">
					<view class="item-icon">
						<text></text>
					</view>
					<text class="item-name">{{item.sequenceno}}</text>
					<text class="item-name">{{item.station}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { api } from '@/utils/api.js'
	
	export default {
		props: ['city', 'transitno'],
		data() {
			return {
				result: [],
				detail: []
			}
		},
		onLoad(options) {
			this.getRouteData(options.city, options.transitno)
		},
		onShow() {
		},
		methods: {
			// 线路
			async getRouteData(city, transitno) {
				const data = await api.routeInquiry(city, transitno);
				if(data && data.status === 0) {
					// console.log(data.result[0]);
					// this.result = [...data.result];
					this.detail = data.result[0];
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bus-detail{
		width: calc(750rpx - 60rpx);
		margin: 0 auto;
		.bus-card{
			// width: calc(100% - 60rpx);
			height: 70px;
			box-shadow: 1px 0 10px rgba(0, 0, 0, .3);
			margin: 40rpx auto 0;
			padding: 20rpx;
			border-radius: 10rpx;
			.bus-station{
				font-size: 32rpx;
			}
			.bus-time{
				margin-top: 40rpx;
				font-size: 26rpx;
				color: $uni-text-color-grey;
			}
		}
		
		.bus-cur{
			
		}
		.bus-lists{
			display: flex;
			overflow: auto;
			margin-top: 100rpx;
			.lists-item{
				padding-top: 40rpx;
				.lists-item-s{
					position: relative;
					width: 80rpx;
					border-top: 6rpx solid #FFCD41;
					padding-top: 40rpx;
					font-size: 30rpx;
					.item-icon{
						width: 20rpx;
						height: 20rpx;
						border-radius: 50%;
						background: #fff;
						position: absolute;
						left: 6rpx;
						top: -16rpx;
						border: 4rpx solid #FFCD41;
						
					}
					.item-name{
						width: 40rpx;
						display: block;
						text-align: center;
					}
				}
				&:first-child, &:last-child{
					.lists-item-s{
						.item-icon{
							background: #FFCD41;
						}
					}
				}
				&:last-child{
					.lists-item-s{
						width: 40rpx;
					}
				}
			}
		}
	}
</style>
