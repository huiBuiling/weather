<template>
	<view class="ql-news">
		<view class="news-title"><text>{{data.title}}</text></view>
		<!-- <view class="news-content" v-html="data.content"></view> -->
		<!-- <rich-text class="news-content" :nodes="data.content"></rich-text> -->
		
		<block v-for="(item, index) in data.content" :key="index">
			<rich-text class="news-content" :nodes="item"></rich-text>
			<view style="height: 30rpx"></view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {}
			}
		},
		onLoad() {
			this.getDetailData()
		},
		methods: {
			// 获取新闻详情
			getDetailData() {
				let data = uni.getStorageSync('news_detail')
				let content = data.content
				content = content.replace(/figure/g, 'div')
				// 处理图片溢出屏幕
				content = content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ');
				data.content = content.split('</p>')
				this.data = {...data}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ql-news{
		// width: 750rpx;
		margin: 0 auto;
		color: #1a1a1a;
		padding: 20rpx;
	}
	
	.news-title{
		font-size: $font16;
		font-weight: bold;
		margin-bottom: 30rpx;
	}
	
	.news-content{
		font-size: $font;
		color: #1a1a1a;
		margin: 0 0 30rpx;
		word-break: normal;
		text-align: justify;
		word-break: break-all;
		
		/deep/ .editor{
			text-align: right;
		}
		
		/deep/ img {
			width: calc(750rpx - 40rpx);
			margin-bottom: 30rpx;
		}
	}
	
</style>
