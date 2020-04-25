<template>
	<view class="we">
		<view class="we-header">
			<view class="we-h we-header-ser">
				<text class="icon icon-search"></text>
			</view>
			<view class="we-h we-header-text">
				<text>小榴可爱</text>
			</view>
			<view class="we-h we-header-m">
				<text class="icon icon-more"></text>
			</view>
		</view>
		
		<view class="we-con">
			<view class="we-con-bg">
				<view class="we-con-t"></view>
				<text class="icon icon-xiaoyu we-ti-icon"></text>
				<view class="we-con-num">
					<text>21</text>
					<text class="we-con-num-c">℃</text>
				</view>
			</view>
			
			<view class="we-con-msg">
				<text>21℃ / 19℃</text>
			</view>
			
			<view class="we-con-msg2">
				<text>多云  空气良</text>
			</view>
			
			<view class="we-con-address">
				<text>天河区</text>
				<text class="icon icon-address"></text>
			</view>
		</view>
		
		<view class="we-chart">
			<view class="we-chart-top">
				<text class="we-chart-top-i">中国天气</text>
				<text class="we-chart-top-i">10分钟前发布</text>
			</view>
			<!-- <view class="we-chart-title">
				<text>中国天气</text>
				<text>10分钟前发布</text>
			</view>
			<view class="we-chart-time">
				<text>中国天气</text>
				<text>10分钟前发布</text>
			</view> -->
		</view>
		
		<view class="we-list">
			<text>chart</text>
		</view>
		
		<!-- <WeatherIndex /> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search: 'search',
				more: 'success',
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	@import url('../../static/iconfont.css');
	$font: 14px;
	$font16: 16px;
	$font18: 18px;
	$font20: 20px;
	$color: #ffffff;
	$color2: #98c2ef;
	.we {
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		padding: 0 10px;
		font-size: $font16;
		line-height: 24px;
		background-image: url(../../static/image/bg2.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-attachment: fixed;
		color: $color;
		.we-header {
			height: 56px;
			display: flex;
			// align-items: center;
			.we-h {
				height: 56px;
				line-height: 56px;
				flex: 1;
			}
			.we-header-text {
				text-align: center;
			}
			.we-header-m {
				text-align: right;
			}
		}
		.we-con{
			// height: 300px;
			text-align: center;
			.we-con-bg{
				position: relative;
				width: 120px;
				margin: 0 auto;
				text-align: center;
				.we-con-t{
					margin-top: 50px;
				}
				.we-con-num{
					font-size: 30px;
					position: absolute;
					left: calc(50% - 30px);
					top: -10px;
					.we-con-num-c{
						font-size: 23px;
						position: absolute;
						top: -5px;
					}
				}
				.we-ti-icon{
					font-size: 120px;
					color: #6499d6;
				}
			}
			.we-con-msg{
				font-size: $font;
				font-weight: 600;
				margin: 10px 0 0;
			}
			.we-con-msg2{
				margin: 0 0 15px;
				color: $color2;
			}
			.we-con-address{
				font-size: $font18;
				.icon{
					margin-left: 10px;
				}
			}
		}
		.we-chart {
			height: 160px;
			margin-top: 30px;
			font-size: $font;
			.we-chart-top {
				display: flex;
				border-bottom: 1px solid $color2;
				padding-bottom: 10px;
				.we-chart-top-i{
					flex: 1;
					justify-content: space-around;
					&:last-child{
						text-align: right;
					}
				}
			}
		}
		.we-list{
			height: 300px;
			border: 1px solid #007AFF;
		}
	}
</style>
