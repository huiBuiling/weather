<template>
	<view class="we-list">
		<view class="list-time">
			<text class="list-time-i">中国天气</text>
			<text class="list-time-i">{{timepoint}}</text>
		</view>
		
		<view class="list-hover">
			<view class="hover-item"  v-for="(item, index) in hourly" :key="index">
				<text>{{item.time}}</text>
				<text>{{item.weather}}</text>
				<text class="text-w">{{item.temp}}℃</text>
			</view>
		</view>
		<view class="list-week">
			<view class="week-item" v-for="(item, index) in daily" :key="index">
				<view class="week-item-w">
					<text>{{dealTime(item.date)}} - {{item.week}}</text>
				</view>
				<view class="week-item-w item-c">
					<text>{{item.day.weather}}</text>
				</view>
				<view class="week-item-w item-r">
					<text>{{item.day.temphigh}}℃ </text>
					<text>/ {{item.night.templow}}℃</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['daily', 'hourly', 'timepoint'],
		data() {
			return {
				search: 'search',
				more: 'success',
			}
		},
		computed: {
			
		},
		methods: {
			dealTime(data) {
				const newData = data.split('-');
				// const month = newData[1][0] == 0 ? newData[1][1] : newData[1];
				// const day = newData[2][0] == 0 ? newData[2][1] : newData[2];
				return newData[1] + '/' + newData[2];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.we-list{
		width: 100%;
		.list-time {
			display: flex;
			border-bottom: 2rpx solid $color2;
			padding-bottom: 10rpx;
			margin-top: 30px;
			font-size: $font;
			.list-time-i{
				flex: 1;
				justify-content: space-around;
				&:last-child{
					text-align: right;
				}
			}
		}
		.list-hover{
			height: 200rpx;
			display: flex;
			flex-wrap: nowrap;
			overflow: auto;
			.hover-item{
				margin-top: 20rpx;
				padding: 0 20rpx;
				font-size: 24rpx;
				text-align: center;
				text{
					display: flex;
					flex-direction: column;
					white-space: nowrap;
				}
				.text-w{
					font-size: 28rpx;
				}
			}
		}
		.list-week{
			font-size: 24rpx;
			.week-item{
				display: flex;
				height: 100rpx;
				line-height: 100rpx;
				border-top: 1rpx solid $color;
				.week-item-w{
					flex: 1;
				}
				.item-c{
					text-align: center;
				}
				.item-r{
					text-align: right;
				}
			}
		}
	}
</style>