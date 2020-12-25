<template>
	<view class="we-header">
		<view class="we-h we-header-ser">
			<text class="icon icon-search" @click="goCity"></text>
		</view>
		<view class="we-h we-header-text">
			<text>小榴可爱</text>
		</view>
		<view class="we-h we-header-m">
			<text class="icon icon-more"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['city'],
		data() {
			return {
				search: 'search',
				more: 'success',
			}
		},
		methods: {
			goCity() {
				uni.navigateTo({
					url: `/pages/weather/city?city=${this.city}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
</style>

