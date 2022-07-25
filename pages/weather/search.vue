<template>
	<view class="we-city">
		<SearchBar
			:searchVal="searchVal"
			pages="search"
		/>
		
		<view class="city-label">
			<text>搜索结果</text>
		</view>
		<view class="result-list">
			<view 
				class="result-item"
				v-for="item in cityList" 
				:key="item"
				@click="goCheckCity(item)"
			>
				<text>{{item}}</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	/**
	 * 城市数据
	 */
	import SearchBar from '@/components/weather/search.vue';
	import { api } from '@/utils/api.js';
	import { setItemSync } from '@/utils/storage.js'
	
	export default {
		components: {
			'SearchBar': SearchBar
		},
		data() {
			return {
				cityList: [],
				searchVal: '',
				val: '',
			}
		},
		onLoad() {
			const self = this;
			uni.$on('update', (data) => {
				self.getSearchData(data.val);
			})
		},
		methods: {
			async getSearchData(val) {
				const data = await api.curCityData(val);
				if(data && data.status === 0) {
					this.cityList = [val]
				} else {
					this.cityList = ['没有符合的结果']
				}
			},
			goCheckCity(city) {
				console.log(city)
				setItemSync('city', city)
				uni.switchTab({
					url: '/pages/weather/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.we-city{
		width: 750rpx;
		padding: 20rpx 0;
		.city-label{
			background: $bgColor2;
			padding: 10rpx 30rpx;
			color: $color;
			font-size: 24rpx;
		}
		.result-list{
			.result-item{
				height: 100rpx;
				line-height: 100rpx;
				border-bottom: 1rpx solid #ddd;
				padding: 0 40rpx;
				font-size: 30rpx;
			}
			
		}
		
	}
</style>
