<template>
	<view class="we-con">
		<view class="we-con-bg">
			<view class="we-ti-icon">
				<i class="icon icon-moren-tianqi"></i>
			</view>
			<view class="we-con-num">
				<text>{{curData.temp}}</text>
				<text class="we-con-num-c">℃</text>
			</view>
		</view>
		
		<view class="we-con-msg">
			<text>{{curData.templow}}℃ / {{curData.temphigh}}℃</text>
		</view>
		
		<view class="we-con-msg2">
			<text>{{curData.weather}}  空气{{curData.quality}}</text>
		</view>
		
		<view class="we-con-address">
			<text>{{city}}</text>
			<text class="icon icon-address"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['curData', 'city'],
		data() {
			return {
				search: 'search',
				more: 'success',
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.we-con{
		// height: 300px;
		text-align: center;
		// padding-top: 112rpx;
		.we-con-bg{
			position: relative;
			width: 240rpx;
			height: 240rpx;
			margin: 0 auto;
			text-align: center;
			.we-con-num{
				font-size: 60rpx;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				color: #6499d6;
				.we-con-num-c{
					font-size: 46rpx;
					position: absolute;
					top: -10rpx;
				}
			}
			.we-ti-icon{
				width: 240rpx;
				height: 240rpx;
				margin: 0 auto;
				color: $color;
				.icon{
					font-size: 240rpx;
					&::before{
						position: absolute;
						padding-top: 75rpx;
						left: 0;
					}
				}
			}
		}
		.we-con-msg{
			font-size: $font;
			font-weight: 600;
			margin:  0;
		}
		.we-con-msg2{
			margin: 0 0 30rpx;
			// color: $color2;
		}
		.we-con-address{
			font-size: $font18;
			.icon{
				margin-left: 20rpx;
			}
		}
	}
	
</style>