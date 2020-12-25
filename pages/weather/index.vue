<template>
	<view class="ql-weather">
		<WeHeader
			:city="city"
		/>
		
		<view class="we-city">
			<!-- 当前城市信息 -->
			<WeContent
				:city="city"
				:curData="curData"
			 />
			
			<!-- 日 和 星期 列表 -->
			<WeList
				:timepoint="curData.timepoint"
				:daily="daily"
				:hourly="hourly"
			 />
		 </view>
	</view>
</template>

<script>
	import WeHeader from '@/components/weather/header.vue';
	import WeContent from '@/components/weather/content.vue';
	import WeList from '@/components/weather/list.vue';
	import { setItemSync, getItemSync } from '@/utils/storage.js';
	import { api } from '@/utils/api.js'
	
	export default {
		components:{
			'WeHeader': WeHeader,
			'WeContent': WeContent,
			'WeList': WeList,
		},
		data() {
			return {
				city: '北京',
				curData: {
					temp: 0, // 气温
					templow: 16,  // 最低气温
					temphigh: 26, // 最高气温
					weather: '多云', // 天气
					quality: '优',  // 空气质量
					timepoint: '2020-07-08 20:00:00', // 最近一次更新时间
				},
				daily: [],     // 一星期
				hourly: [],   // 按小时
			}
		},
		onLoad() {
			// this.getCurCity();
			this.getPlatform();
		},
		onShow() {
			this.getPlatform()
		},
		methods: {
			getCurCity() {
				uni.getLocation({
				    type: 'wgs84',
					geocode: true,
				    success: function (res) {
						console.log(res);
						uni.showToast({
							title: res.address
						});
						this.getPlatform();
				    }
				});
			},
			getPlatform() {
				const city = getItemSync('city') || this.city;
				// console.log('城市呀呀呀呀---' + city);
				this.getCurrentCityData(city);
			},
			async getCurrentCityData(city) {
				this.city = city;
				uni.showToast({
					title: city
				})
				const data = await api.curCityData(city);
				if(data && data.status === 0) {
					const {
						temp, templow, temphigh, timepoint,
						weather, daily, hourly,
					} = data.result;
					
					this.curData = {
						temp, templow, temphigh, weather, 
						timepoint: data.result.aqi.timepoint || '',
						quality: data.result.aqi.quality
					}
					this.hourly = hourly;
					this.daily = daily;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ql-weather {
		// font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		width: calc(750rpx - 40rpx);
		// height: 100%;
		padding: 0 20rpx;
		font-size: $font16;
		line-height: 48rpx;
		background-image: url(../../static/image/bg2.jpg);
		background-repeat: no-repeat;
		background-size: 100% 103%;
		background-attachment: fixed;
		// background: $nightColor;
		color: $color;
		.we-city{}
	}
</style>
