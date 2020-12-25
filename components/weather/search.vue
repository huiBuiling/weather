<template>
	<view class="ql-r-search">
		<view class="ql-r-input">
			<i class="icon icon-search"></i>
			<input 
				class="ql-r-sea-i" 
				:value="searchVal"
				placeholder="请输入城市"
				@input="func"
			/>
		</view>
	</view>
</template>

<script>
		export default {
			props: ['searchVal', 'pages'],
			data() {
				return {}
			},
			methods: {
				func(event) {
					if(this.pages === 'city') {
						this.goSearch();
					} else {
						this.sentVal(event.detail.value)
					}
				},
				goSearch() {
					uni.navigateTo({
						url: '/pages/weather/city'
					})
				},
				sentVal(val) {
					uni.$emit('update', { val })
				}
			}
		} 
</script>

<style scoped lang="scss">
	$h: 80rpx;
	.ql-r-search{
		width: calc(750rpx - 40rpx);
		height: $h;
		line-height: $h;
		margin: 0 auto 20rpx;
		.ql-r-input{
			height: $h;
			line-height: $h;
			background: $bgColor2;
			border-radius: 10rpx;
			padding: 0 24rpx;
			color: $color;
			.icon-search{
				display: inline-block;
				vertical-align: top;
				width: 60rpx;
				font-size: 40rpx;
			}
			.ql-r-sea-i{
				display: inline-block;
				vertical-align: top;
				width: calc(100% - 80rpx);
				height: $h;
				line-height: $h;
				font-size: 36rpx;
			}
		}
	}
</style>
