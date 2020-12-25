<template>
	<view class="conste-week line">
		<view class="conste-mind">
			<view class="conste-text" v-show="detailData.love">
				<view class="conste-label">
					<text>恋爱运势</text>
				</view>
				<text>{{detailData.love}}</text>
			</view>
			
			<view class="conste-text" v-show="detailData.health">
				<view class="conste-label">
					<text>健康运势</text>
				</view>
				<text>{{detailData.health}}</text>
			</view>
			
			<view class="conste-text" v-show="detailData.money">
				<view class="conste-label">
					<text>财富运势</text>
				</view>
				<text>{{detailData.money}}</text>
			</view>
			
			<view class="conste-text" v-show="detailData.work">
				<view class="conste-label">
					<text>工作运势</text>
				</view>
				<text>{{detailData.work}}</text>
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
	.conste-week{
		position: relative;
		margin: 80rpx auto 40rpx;
		padding: 40rpx 20rpx 60rpx;
		background: $white;
		border-radius: 10rpx;
		transform: rotate(-1deg);
		.conste-mind{
			margin-top: 30rpx;
			.conste-text{
				line-height: 40rpx;
				font-size: 26rpx;
				margin-bottom: 30rpx;
				.conste-label{
					width: 150rpx;
					line-height: 50rpx;
					background: $borColor;
					border-radius: 10rpx;
					text-align: center;
					color: $black;
					font-size: 30rpx;
					margin-bottom: 15rpx;
				}
			}
		}
	}
</style>
