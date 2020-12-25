<template>
	<view class="ql-joke">
		<view class="joke-tab">
			<view :class="{'tab-item': true, 'active': active == 0}" @click="checkTab(0)">
				<text v-show="active == 0" class="icon icon-star2"></text>
				<text>文字</text>
			</view>
			<view :class="{'tab-item': true, 'active': active == 1}" @click="checkTab(1)">
				<text v-show="active == 1" class="icon icon-star2"></text>
				<text>图文</text>
			</view>
		</view>
		
		<view class="joke-card-con">
			<view
				class="joke-card"
				v-for="(item, index) in jokeList"
				:key="item.hashId"
				v-if="active === 0"
			>
				<text class="card-num">{{index}}</text>
				<view class="card-title"><text>{{item.title}}</text></view>
				<text>{{item.text}}</text>
			</view>
			
			<view
				class="joke-card"
				v-for="(item, index) in jokeList"
				:key="item.hashId"
				v-if="active === 1"
			>
				<text class="card-num">{{index}}</text>
				<text>{{item.text}}</text>
				<image 
					class="card-image" 
					:src="item.img" 
					mode="aspectFit"
					@click="previewImage(item.url)"
				 ></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { api } from '@/utils/api.js'
	export default {
		data() {
			return {
				jokeList: [],
				active: 0, // 文字0，图片1
				page: 0,
				pullPage: 0,
			}
		},
		onLoad() {
			this.getJockData()
		},
		methods: {
			// 预览图片
			previewImage(item) {
				uni.previewImage({
					current: 0,
					urls: [item],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片'],
						success: function(data) {
							 if(data.tapIndex === 0) {
								 console.log('发送给朋友')
							 } else {
								 console.log('保存图片')
							 }
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			onReachBottom() {
				console.log('滚动到底部')
				this.getJockData(this.active)
			},
			
			async getJockData(val = 0) {
				// uni.showLoading({ mask: true })
				const type = val === 0 ? 'jockTextData':'jockGifData'
				let timeJockData = await api[type]({page: this.page + 1});
				
				timeJockData =  [...timeJockData.showapi_res_body.contentlist]
				console.log(timeJockData)
				
				this.jokeList = [...this.jokeList, ...timeJockData]
				this.page += 1;
				// uni.hideLoading();
			},
			checkTab(val) {
				this.page = 0;
				this.pullPage = 0;
				this.active = val;
				this.jokeList = []
				this.getJockData(val);
			}
		}
	}
</script>

<style lang="scss" scoped>
	// page{
	// 	height: 100%;
	// }
	.ql-joke{
		width: 750rpx;
		margin: 0 auto;
		.joke-tab{
			display: flex;
			height: 80rpx;
			line-height: 80rpx;
			background-color: $borColor;
			color: $white;
			.tab-item{
				flex: 1;
				text-align: center;
				margin: 0 0 30px;
				font-size: 30rpx;
				&.active{
					font-weight: bold;
					.icon{
						margin-right: 10rpx;
					}
				}
			}
		}
		.joke-card-con{
			width: 750rpx;
			height: calc(100% - 35px);
			overflow-y: auto;
			.joke-card{
				position: relative;
				margin: 40rpx;
				padding: 20rpx 50rpx 20rpx;
				box-shadow: 1px 0 10px rgba(0, 0, 0, .3);
				border-radius: 10rpx;
				font-size: 26rpx;
				color: $black;
				.card-num{
					display: block;
					position: absolute;
					left: -20rpx;
					top: -20rpx;
					width: 60rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border-radius: 50%;
					background: $borColor;
					color: $color2;
				}
				.card-title{
					color: $borColor;
					font-size: $font16;
					font-weight: bold;
					margin-bottom: 10px;
				}
				.card-image{
					margin-top: 30rpx;
					width: 100%;
					// height: auto;
					will-change: transform
				}
			}
		}
	}
</style>
