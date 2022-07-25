<template>
	<view class="conste-today line">
		<view class="conste-item">
			<view class="conste-num" v-if="detailData.love && detailData.health">
				<view class="conste-item-i">
					<text class="label-l">恋爱：</text>
					<Star :data="detailData.love"></Star>
				</view>
				<view class="conste-item-i">
					<text class="label-l">健康：</text>
					<Star :data="detailData.health"></Star>
				</view>
			</view>
			
			<view class="conste-num"  v-if="detailData.money && detailData.work">
				<view class="conste-item-i">
					<text class="label-l">金钱：</text>
					<Star :data="detailData.money"></Star>
				</view>
				<view class="conste-item-i">
					<text class="label-l">工作：</text>
					<Star :data="detailData.work"></Star>
				</view>
			</view>
			
			<view class="conste-num">
				<view class="conste-item-i">
					<text class="label-l">幸运色：</text>
					<text>{{detailData.color}}</text>
				</view>
				<view class="conste-item-i">
					<text class="label-l">幸运数：</text>
					<text>{{detailData.number}}</text>
				</view>
			</view>
		</view>
		
		<view class="conste-item conste-mind">
			<view class="conste-label">
				<text>今日建议</text>
			</view>
			<view class="conste-text">
				<text>{{detailData.summary}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { api } from '../../utils/api.js'
	import Star from '../star/index.vue'
	export default {
		props: ['detailData'],
		components: {
			Star
		}
	}
</script>

<style lang="scss" scoped>
	.conste-today{
		position: relative;
		margin: 80rpx auto 40rpx;
		padding: 40rpx 20rpx 60rpx;
		background: $white;
		border-radius: 10rpx;
		transform: rotate(-1deg);
		
		.conste-item{
			font-size: 28rpx;
			color: #333;
			.conste-item-i{
				line-height: 60rpx;
			}
			.conste-num{
				display: flex;
				.conste-item-i{
					flex: 1;
				}
			}
			.label-l{
				width: 120rpx;
				display: inline-block;
				text-align: right;
			}
		}
		.conste-mind{
			margin-top: 30rpx;
			.conste-label{
				width: 150rpx;
				line-height: 50rpx;
				background: $borColor;
				border-radius: 10rpx;
				text-align: center;
				color: $white;
				font-size: 30rpx;
				margin-bottom: 30rpx;
			}
			.conste-text{
				line-height: 40rpx;
				font-size: 26rpx;
				text-indent: 2em;
			}
		}
	}
</style>
