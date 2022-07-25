<template>
  <view class="ql-weather">
    <WeHeader :city="city" />

    <view class="we-city">
      <!-- 当前城市信息 -->
      <WeContent :city="city" :curData="curData" />

      <!-- 日 和 星期 列表 -->
      <WeList :timepoint="curData.timepoint" :daily="daily" :hourly="hourly" />
    </view>
  </view>
</template>

<script>
import WeHeader from "@/components/weather/header.vue";
import WeContent from "@/components/weather/content.vue";
import WeList from "@/components/weather/list.vue";
import { setItemSync, getItemSync } from "@/utils/storage.js";
import { api } from "@/utils/api.js";
import amap from "@/static/amap-wx.130.js";

export default {
  components: {
    WeHeader: WeHeader,
    WeContent: WeContent,
    WeList: WeList,
  },
  data() {
    return {
      city: "",
      curData: {
        // temp: 0, // 气温
        // templow: 16,  // 最低气温
        // temphigh: 26, // 最高气温
        // weather: '多云', // 天气
        // quality: '优',  // 空气质量
        // timepoint: '2020-07-08 20:00:00', // 最近一次更新时间
      },
      daily: [], // 一星期
      hourly: [], // 按小时
      amapPlugin: null,
      mapKey: "005ecf4d7edcd8d6a05dfacbcec2bfb9",
    };
  },
  onLoad(options) {
    const citys = options && options.city;
    if (citys) {
      this.getPlatform(citys);
    } else {
      this.amapPlugin = new amap.AMapWX({
        key: this.mapKey,
      });
      this.getCurCity();
    }
  },
  // onShow() {
  // 	this.getPlatform()
  // },
  methods: {
    getCurCity() {
      // 获取位置
      this.amapPlugin.getRegeo({
        success: (data) => {
          // console.log(data, '当前定位', data[0]?.regeocodeData?.addressComponent?.city)
          let citys = data[0]?.regeocodeData?.addressComponent?.province || "";
          if (citys[2] && citys[2] == "省") {
            citys = citys.slice(0, 2);
          }
          this.city = citys;
          this.getPlatform(citys);
        },
        // 获取位置失败
        fail: (err) => {
          uni.showToast({
            title: "获取位置失败，请重启小程序",
            icon: "error",
          });
          this.city = getItemSync("city");
          this.getPlatform(getItemSync("city"));
        },
      });

      // 只能用于 app端 获取具体地理位置
      // uni.getLocation({
      //     type: 'wgs84',
      // 	geocode: true,
      //     success: function (res) {
      // 		debugger
      // 		console.log(res);

      // 		// res.address 仅App端支持
      // 		// uni.showToast({
      // 		// 	title: res.address
      // 		// });

      // 		this.getPlatform();
      //     },
      // 	fail: function (res) {
      // 		console.log(res);
      // 		uni.showToast({
      // 			title: '地理位置获取失败'
      // 		});
      // 		this.city = '北京'
      // 		this.getPlatform();
      //     },
      // });
    },
    getPlatform(citys) {
      console.log("getPlatform", citys, this.city);
      const city = citys || this.city;
      // console.log('城市呀呀呀呀---' + city);
      this.getCurrentCityData(city);
    },
    async getCurrentCityData(city) {
      this.city = city;
      uni.showToast({
        title: city,
      });
      const data = await api.curCityData(city);
      if (data && data.status === 0) {
        const { temp, templow, temphigh, timepoint, weather, daily, hourly } =
          data.result;

        this.curData = {
          temp,
          templow,
          temphigh,
          weather,
          timepoint: data.result.aqi.timepoint || "",
          quality: data.result.aqi.quality,
        };
        this.hourly = hourly;
        this.daily = daily;
      }
    },
  },
};
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
  .we-city {
  }
}
</style>
