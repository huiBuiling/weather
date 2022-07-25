<template>
	<view class="we-city">
		<!-- <SearchBar
			:searchVal="searchVal"
			pages="city"
		/> -->
		
		<view class="ql-r-search">
			<view class="ql-r-input">
				<i class="icon icon-search"></i>
				<input 
					class="ql-r-sea-i" 
					:value="searchVal"
					placeholder="请输入城市"
					@input="change"
					confirm-type="search"
					@confirm="goCheckCity('-')"
				/>
			</view>
		</view>
		
		<view class="city-label">
			<text>推荐城市</text>
		</view>
		<view class="city-list">
			<view 
				class="city-item" 
				v-for="item in cityList" 
				:key="item.cityid" 
				@click="goCheckCity(item.city)"
				:class="{cur: item.city == city}"
			>
				<text>{{item.city}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 城市数据
	 */
	import SearchBar from '@/components/weather/search.vue';
	import { api } from '@/utils/api.js'
	import { setItemSync } from '@/utils/storage.js'
	export default {
		components: {
			'SearchBar': SearchBar
		},
		data() {
			return {
				cityList: [],
				city: '',
				searchVal: '',
			}
		},
		onLoad(options) {
			const city = options && options.city || '广州';
			this.city = city;
			uni.getStorage({
				key: 'CITY_DATA',
				success: (res) => {
					const len = res.data.filter(item => item.city === city);
					this.cityList = len > 0 ? [
						{ city},
						...res.data
					] : res.data;
				},
				fail: (err) => {
					this.getCityData(city);
				}
			});
		},
		methods: {
			change(event) {
				this.searchVal = event.detail.value
			},
			async getCityData(city) {
				const data = await api.getAllCity();
				let cityList = data.result.splice(0, 39);
				const newCityList = cityList.filter(item => item.city !== city);
				cityList = newCityList.length === cityList.length ? cityList : newCityList;
				cityList = [
					{ city },
					...cityList
				]
				
				uni.setStorage({
					key: 'CITY_DATA',
					data: cityList
				});
				
				this.cityList = cityList;
			},
			goCheckCity(city) {
				console.log(city, this.cityList)
				// setItemSync('city', city);
				uni.navigateTo({
					url: `/pages/weather/index?city=${city == '-' ? this.searchVal : city}`
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
		.city-list{
			display: flex;
			flex-wrap: wrap;
			.city-item{
				width: calc((100% / 4) - 2rpx);
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				border: 1rpx solid #ddd;
				border-width: 0 1rpx 1rpx 0;
				&:nth-child(4n){
					border-right: none;
				}
				// &.active{
				// 	color: $uni-color-error;
				// }
				&.cur{
					background: $themeColor;
					color: #fff;
				}
			}
			
		}
		
	}
	
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
