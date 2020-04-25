<template>
	<view class="container">
		<view class="we-header">
			<view class="we-h we-header-ser">
				<icon :type="search" size="20"/>
			</view>
			<view class="we-h we-header-text">
				<text>haahha</text>
			</view>
			<view class="we-h we-header-m">
				<icon :type="more" size="20"/>
			</view>
		</view>
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
	.container {
		padding: 0 10px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
