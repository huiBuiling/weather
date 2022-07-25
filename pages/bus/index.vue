<template>
  <view class="ql-bus">
    <view class="ql-search">
      <!-- <view class="ql-city">
        <text>{{ city }}</text>
      </view> -->

      <view class="ql-input">
        <i class="icon icon-search"></i>
        <input
          class="ql-sea-i"
          :value="transitno"
          placeholder="请输入"
          @input="onChange"
          confirm-type="search"
          @confirm="onSerach"
        />
      </view>
    </view>

    <view class="ql-map">
      <!-- @tap="goWhere" -->
      <map
        id="maps"
        style="width: 100%; height: 100vh"
        show-location
        show-compass
        enable-poi
        :latitude="curLocation.latitude"
        :longitude="curLocation.longitude"
        :scale="scale"
        :markers="markers"
        :polyline="polyline"
        @markertap="func"
      >
      </map>
    </view>

    <view class="ql-bus-line">
      <view class="result-list">
        <view
          class="result-item"
          v-for="(item, index) in result"
          :key="index"
          @click="goDetail"
        >
          <view class="result_item_t">
            <text class="ri_t_num">{{ transitno }}</text>
            <text>路（</text>
            <text class="ri_t_sta">{{ item.startstation }}</text>
            <text class="ri_t_jt"> → </text>
            <text>{{ item.endstation }}）</text>
          </view>

          <view class="result_item_b">
            <view class="ri_b_i">
              <view class="ri_t_label">首</view>
              <text class="ri_t_clock">{{ item.starttime }}</text>
            </view>
            <view class="ri_b_i">
              <view class="ri_t_label ri_t_label2">末</view>
              <text class="ri_t_clock">{{ item.endtime }}</text>
            </view>
            <view class="ri_b_i">
              <text>票价：{{ item.price }}元</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { api } from "@/utils/api.js";
import amap from "@/static/amap-wx.130.js";

export default {
  data() {
    return {
      city: "",
      transitno: "", // 车次 B16
      result: [],
      amapPlugin: null,
      mapKey: "005ecf4d7edcd8d6a05dfacbcec2bfb9",
      curLocation: {}, // 地理位置

      scale: 16,
      markers: [
        //  {
        // iconPath: require("./imgs/start.png"),
        // id: 0,
        // latitude: 23.18139,
        // longitude: 113.48067,
        // width: 32,
        // height: 32
        //  },{
        // iconPath: require("./imgs/end.png"),
        // id: 0,
        // latitude: 23.08277,
        // longitude: 113.30997,
        // width: 32,
        // height: 32
        //  },
      ],
      polyline: [
        // {
        //   points: [
        // 	{ latitude: 23.18139, longitude: 113.48067 },
        // 	{ latitude: 23.08277, longitude: 113.30997 },
        //   ], //路线的存放做标数组
        //   color: "#42b983", //路线颜色 #42b983 #E74C3C
        //   width: 3, //线的宽度
        // },
      ],
    };
  },
  onLoad() {
    this.amapPlugin = new amap.AMapWX({
      key: this.mapKey,
    });

    // this.getLocations();
    this.getCurCity();
  },
  onShow() {},
  methods: {
    func(e) {
      console.log("e", e);
      let map = uni.createMapContext("maps", this);
      // map.moveToLocation() // 移动到当前位置点
    },
    // 获取地理位置
    /* 
	getLocations() {
      const _self = this;
      uni.getLocation({
        type: "wgs84",
        geocode: true,
        success: function (res) {
          console.log(res);
          _self.curLocation = {
            latitude: res?.latitude,
            longitude: res?.longitude,
          };
        },
        fail: function (res) {
          console.log(res);
        },
      });
    },
	*/
    getCurCity() {
      // 获取位置
      this.amapPlugin.getRegeo({
        success: (data) => {
          const cur_data = data[0]?.regeocodeData?.addressComponent;
          console.log("当前定位", cur_data);
          const citys = cur_data?.city || "广州";
          this.city = citys;
          const location = cur_data?.streetNumber?.location;
          this.curLocation = {
            latitude: location.split(",")[1],
            longitude: location.split(",")[0],
          };
        },
        // 获取位置失败
        fail: (err) => {
          uni.showToast({
            title: "获取位置失败，请重启小程序",
            icon: "error",
          });
        },
      });
    },
    // 高德获取公交路线
    getTransitRouteData(origin, destination) {
      // 注意格式，'23.18139, 113.48067'此格式无效
      // const cur_des = {
      //   origin: "113.48067" + "," + "23.18139",
      //   destination: "113.30997" + "," + "23.08277",
      // };
      console.log("origin", origin, destination);
      this.amapPlugin.getTransitRoute({
        // ...cur_des,
        origin,
        destination,
        city: this.city,
        // cityd: this.city,
        strategy: 2,
        success: (data) => {
          console.log("getTransitRouteData", data);
          // 根据返回地理位置距离设置缩放
          // distance: "9535";
        },
        // 获取位置失败
        fail: (err) => {
          uni.showToast({
            title: "获取位置失败，请重启小程序",
            icon: "error",
          });
        },
      });
    },

    // 查询公交线路
    async getRouteData(city, transitno) {
      const data = await api.routeInquiry(city, transitno);
      if (data && data.status === 0) {
        console.log(data.result);
        this.result = [...data.result];

        const cur_points = data?.result[0]?.list.map((item) => {
          return {
            latitude: item?.lat,
            longitude: item?.lng,
            station: item?.station,
          };
        });
        console.log("cur_points", cur_points);

        const maxLen = cur_points.length - 1;
        const markers_data = {
          start: {
            latitude: cur_points[0]?.latitude,
            longitude: cur_points[0]?.longitude,
          },
          end: {
            latitude: cur_points[maxLen]?.latitude,
            longitude: cur_points[maxLen]?.longitude,
          },
        };

        const cur_markers = [
          {
            iconPath: require("./imgs/start.png"),
            id: 0,
            width: 32,
            height: 32,
            ...markers_data.start,
          },
          {
            iconPath: require("./imgs/end.png"),
            id: 1,
            width: 32,
            height: 32,
            ...markers_data.end,
          },
        ];
        this.markers = cur_markers;
        this.polyline = [
          {
            points: cur_points, // 根据多个点形成线路， 只有两个点那就是直线
            color: "#42b983", //路线颜色 #42b983 #E74C3C
            width: 5, //线的宽度
            dottedLine: true,
            arrowLine: true,
          },
        ];

        // const origin =
        //   markers_data?.start?.longitude + "," + markers_data?.start?.latitude;
        // const destination =
        //   markers_data?.end?.longitude + "," + markers_data?.end?.latitude;
        // this.getTransitRouteData(origin, destination);

        // 缩放视野以包含所有给定的坐标点
        let mapc = uni.createMapContext("maps", this);
        mapc.includePoints({
          points: cur_points,
          padding: [100, 100, 100, 100], // 设置上右下左的间距(px), **其实只能用第一个值100.
          success: function (e) {
            console.log("includePoints", e);
          },
        });
      }
    },
    // 换乘
    /* async getTransferData() {
				const data = await api.transferQuery({});
				if(data && data.status === 0) {
					console.log(data.result)
				}
			}, */
    onChange(event) {
      // console.log(event.detail.value);
      this.transitno = event.detail.value;
    },
    onSerach(event) {
      console.log("onSerach", event.detail.value);
      // this.getRouteData(this.city, event.detail.value);
    },
    goDetail() {
      uni.navigateTo({
        url: `/pages/bus/detail?city=${this.city}&transitno=${this.transitno}`,
      });
    },
    // 打开地图
    goWhere(e) {
      console.log("goWhere", e.detail.latitude);
      wx.openLocation({
        latitude: e.detail.latitude,
        longitude: e.detail.longitude,
        scale: 14,
        name: "天安门广场",
        address: "北京市东城区长安街",
      });
    },
    // 高德获取公交路线
    getTransitRouteData2() {
      // 公交：getTransitRoute
      // 步行：getWalkingRoute

      // 注意格式，'23.18139, 113.48067'此格式无效
      // 经纬度小数点不超过6位
      const cur_des = {
        origin: "113.48067" + "," + "23.18139",
        destination: "113.30997" + "," + "23.08277",
        // origin: '116.434307' + ',' + '39.90909',
        // destination: '116.434446' + ',' + '39.90816',
      };
      this.amapPlugin.getTransitRoute({
        ...cur_des,
        city: this.city,
        cityd: this.city,
        strategy: 2,

        success: (data) => {
          console.log("getTransitRouteData", data);
        },
        // 获取位置失败
        fail: (err) => {
          uni.showToast({
            title: "获取位置失败，请重启小程序",
            icon: "error",
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  height: 100%;
}

.ql-bus {
  width: 100%;
  height: 100%;
  font-size: $font16;
  line-height: 48rpx;
  background-image: url(../../static/image/bg2.jpg);
  background-repeat: no-repeat;
  background-size: 100% 103%;
  background-attachment: fixed;
  color: $color;
  $h: 66rpx;
  .ql-search {
    position: fixed;
    top: 0;
    width: 100%;
    height: $h;
    line-height: $h;
    background: $uni-color-primary;
    margin: 0 auto 20rpx;
    padding: 15rpx 0;
    display: flex;
    z-index: 1;
    .ql-city {
      flex: 0 0 80rpx;
      color: #fff;
      margin-left: 20rpx;
    }
    .ql-input {
      // flex: 1;
      // width: calc(750rpx - 180rpx);
      width: calc(750rpx - 80rpx);
      height: $h;
      line-height: $h;
      background: $color;
      border-radius: 10rpx;
      padding: 0 24rpx;
      margin: 0 24rpx;
      color: $uni-color-title;
      .icon-search {
        display: inline-block;
        vertical-align: top;
        width: 60rpx;
        font-size: 30rpx;
      }
      .ql-sea-i {
        display: inline-block;
        vertical-align: top;
        width: calc(100% - 80rpx);
        height: $h;
        line-height: $h;
        font-size: 30rpx;
      }
    }
  }

  .ql-map {
  }

  .ql-bus-line {
    position: fixed;
    bottom: 80rpx;
    .result-label {
      background: $bgColor2;
      padding: 10rpx 30rpx;
      color: $color;
      font-size: 24rpx;
      .result-label-line {
        color: $uni-color-error;
        margin-left: 20rpx;
        font-size: 34rpx;
      }
    }
    .result-list {
      width: calc(750rpx - 40rpx);
      margin-left: 20rpx;
      .result-item {
        background: #fff;
        color: #000;
        padding: 20rpx;
        border-radius: 10rpx;
        margin: 20rpx 0;
      }
      .result_item_t {
        font-size: 30rpx;
        padding: 0 20rpx;
        margin-bottom: 6rpx;
      }
      .ri_t_num {
        color: $themeColor;
      }
      .ri_t_sta {
        color: #777;
      }
      .ri_t_jt {
        margin: 0 10rpx;
      }

      .result_item_b {
        display: flex;
        padding: 0 20rpx;
        font-size: 24rpx;
      }
      .ri_b_i {
        width: 200rpx;
        display: inline-flex;
        align-items: center;
        color: #777;
      }
      .ri_t_label {
        background: #16cc40;
        width: 32rpx;
        height: 32rpx;
        line-height: 32rpx;
        border-radius: 4rpx;
        text-align: center;
        margin-right: 5rpx;
        color: #fff;
        font-size: 24rpx;
      }
      .ri_t_label2 {
        background: #f60;
      }
      .ri_t_clock {
        height: 32rpx;
        line-height: 32rpx;
      }
    }
  }
}
</style>
