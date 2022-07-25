# weather

- 当前城市天气展示
- 对应城市天气查询

# bus

- 城市定位
- 当前城市，公交查询

# 微信小程序使用高德地图

## 高德内操作

- 高德开放平台：
  - 注册账号(https://lbs.amap.com/)
  - 去高德地图平台申请小程序应用的 key
  - 应用管理(https://console.amap.com/dev/key/app) -> 我的应用 -> 创建新应用
    - 生成的 key 即可用在程序中
- 下载相关 sdk 文件，导入 amap-wx.js 到项目中：https://lbs.amap.com/api/wx/download

## 小程序内

### 创建 AMapWX 对象

```
import amap from "@/static/amap-wx.130.js";

this.amapPlugin = new amap.AMapWX({
  key: this.mapKey, // 对应高德里申请的key
});
```

### api

- getRegeo

```
// 获取位置
this.amapPlugin.getRegeo({
  success: (data) => {
    console.log('当前定位', data)
    ...
  },
  // 获取位置失败
  fail: (err) => {
    uni.showToast({
      title: "获取位置失败，请重启小程序",
      icon: "error",
    });
  },
});
```

### 获取路线

- 公交：getTransitRoute
- 步行：getWalkingRoute

```
getTransitRouteData() {
  // 注意格式，'23.18139, 113.48067'此格式无效, 经纬度小数点不超过6位
  const cur_des = {
    origin: "113.48067" + "," + "23.18139",
    destination: "113.30997" + "," + "23.08277",
  };
  this.amapPlugin.getTransitRoute({
    ...cur_des,
    city: this.city,
    strategy: 2,
    success: (data) => {
      console.log("getTransitRouteData", data);
    },
    // 获取位置失败
    fail: (err) => {
      ...
    },
  });
}
```

# 微信小程序地图

## 实用功能

- includePoints: 缩放视野以包含所有给定的坐标点

```
let mapc = uni.createMapContext("maps", this);
mapc.includePoints({
  points: cur_points,
  padding: [100, 100, 100, 100], // 设置上右下左的间距(px)
  success: function (e) {
    console.log("includePoints", e);
  },
});
```

- @anchorpointtap: 点击定位标时触发，e.detail = {longitude, latitude}
- show-compass: 显示指南针

## map 组件

```
<map
  id="maps"
  style="width: 100%; height: 100vh"
  show-location
  show-compass
  enable-poi
  :latitude="curLocation.latitude"
  :longitude="curLocation.longitude"
  :scale="scale" // 缩放
  :markers="markers" // 显示对应标记点
  :polyline="polyline" // 路线点
  @markertap="func" // 点击标记点触发
>
</map>
```

## js

```
<script>
import { api } from "@/utils/api.js";
import amap from "@/static/amap-wx.130.js";

export default {
  data() {
    return {
      city: "广州",
      transitno: "", // 车次 B16
      result: [],
      amapPlugin: null,
      mapKey: "xxxxx9",
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
    this.getLocations();
  },
  onShow() {},
  methods: {
    func(e) {
      let map = uni.createMapContext("maps", this);
      map.moveToLocation() // 移动到当前位置点
    },
    // 获取地理位置
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
        const cur_markers = [
          {
            iconPath: require("./imgs/start.png"),
            id: 0,
            latitude: cur_points[0]?.latitude,
            longitude: cur_points[0]?.longitude,
            width: 32,
            height: 32,
          },
          {
            iconPath: require("./imgs/end.png"),
            id: 1,
            latitude: cur_points[maxLen]?.latitude,
            longitude: cur_points[maxLen]?.longitude,
            width: 32,
            height: 32,
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
        this.scale = 14;
      }
    },
    onChange(event) {
      this.transitno = event.detail.value;
    },
    onSerach(event) {
      console.log("onSerach", event.detail.value);
      this.getRouteData(this.city, event.detail.value);
    },
  },
};
</script>
```
