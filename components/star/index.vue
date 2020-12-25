<template>
	<view class="star">
		<text 
			v-for="(item, index) in star" 
			:key="index"
			:class="{'icon icon-star2': true, 'icon2': bigSatr, 'check': item === 1}"
		></text>
	</view>
</template>

<script>
	export default {
		props: ['data', 'bigSatr'],
		data() {
			return {
				star: [0, 0, 0, 0, 1],
			}
		},
		created() {
			const data = this.data.replace('%', '');
			this.star = this.setStar(parseInt(data));
		},
		methods: {
			setStar(val) {
				const checkStar = (val / 100).toFixed(1) * 5;
				const star = [0, 0, 0, 0, 0];
				star.map((item, index) => {
					star[index] = index < checkStar ? 1 : 0;
				})
				return star;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.star{
		display: inline-block;
		.icon{
			font-size: 30rpx;
			margin-right: 6rpx;
			color: $color3;
		}
		.icon2{
			font-size: 45rpx;
			margin-right: 10rpx;
		}
		.check{
			color: #FFD857;
		}
	}
</style>
