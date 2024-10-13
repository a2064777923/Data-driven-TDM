<script setup lang="ts">
import { ref, reactive, watch, nextTick ,onMounted,onUnmounted} from "vue";
import { centerMap, GETNOBASE } from "@/api";
import * as charts from "echarts/core";
import { optionHandle, regionCodes } from "./center.map";
import BorderBox13 from "@/components/datav/border-box-13";
import { ElMessage } from "element-plus";

import type { MapdataType } from "./center.map";
import 'echarts-extension-amap';
import AMapLoader from '@amap/amap-jsapi-loader'; //動態加載Amap api
import type{global} from './global.d';

import { CanvasRenderer } from 'echarts/renderers';
import { install as AMapComponent, AMapComponentOption} from 'echarts-extension-amap/export';
import { TooltipComponent, TitleComponentOption} from 'echarts/components';
import ECharts from "vue-echarts";
import * as echarts from 'echarts';


// 使用组合式API
const option = ref({});
const code = ref("Macau");

// 使用默认值
const props = withDefaults(
  defineProps<{
    title: number | string;
  }>(),
  {
    title: "地图",
  }
);

let chart: any = null;
let map: any = null;

// 组件挂载时加载地图
onMounted(async () => {
  try {
    const AMap = await AMapLoader.load({
      key: "b13953f0423806b6565ff927a6cd84a5",
      version: "2.0",
      plugins: ["AMap.Scale"],
    });

    await getData(code.value);
    initializeMap();

    map = new AMap.Map('container', {
      resizeEnable: true,
      mapStyle: "amap://styles/light"
    });

  } catch (error) {
    console.error("地图加载失败", error);
  }
});

// 组件卸载时销毁地图实例
onUnmounted(() => {
  if (map) {
    map.destroy();
  }
});

// 更新地图数据
const updateMapData = (regionCode: string, list: any) => {
  option.value = optionHandle(regionCode, list, []);
};

// 初始化地图
const initializeMap = () => {
  if (!chart) {
    const mapElement = document.getElementById("macau");
    if (mapElement) {
      chart = echarts.init(mapElement);
      chart.setMapStyle("amap://styles/light");
    }
  }
  chart.setOption(option.value);
};

// 监听option变化
watch(option, (newOption) => {
  if (chart) {
    chart.setOption(newOption);
  }
});

// 数据处理
const dataSetHandle = async (regionCode: string, list: object[]) => {
  const geojson = await getGeojson(regionCode);
  const cityCenter: Record<string, any> = {};
  const mapData: MapdataType[] = [];

  geojson.features.forEach((element: any) => {
    cityCenter[element.properties.name] = element.properties.centroid || element.properties.center;
  });

  list.forEach((item: any) => {
    if (cityCenter[item.name]) {
      mapData.push({
        name: item.name,
        value: cityCenter[item.name].concat(item.value),
      });
    }
  });

  await nextTick();
  option.value = optionHandle(regionCode, list, mapData);
};

// 获取数据
const getData = async (regionCode: string) => {
  try {
    const res = await centerMap({ regionCode });
    if (res.success) {
      await dataSetHandle(res.data.regionCode, res.data.dataList);
    } else {
      ElMessage.error(res.msg);
    }
  } catch (err:any) {
    ElMessage.error(err);
  }
};

// 获取GeoJSON
const getGeojson = (regionCode: string): Promise<any> => {
  return new Promise(async (resolve) => {
    let mapjson = charts.getMap(regionCode);
    if (mapjson) {
      resolve(mapjson.geoJSON);
    } else {
      mapjson = await GETNOBASE(`./map-geojson/${regionCode}.json`);
      code.value = regionCode;
      charts.registerMap(regionCode, {
        geoJSON: mapjson,
        specialAreas: {},
      });
      resolve(mapjson);
    }
  });
};

// 处理地图点击事件
const mapClick = (params: any) => {
  const xzqData = regionCodes[params.name];
  if (xzqData) {
    getData(xzqData.adcode);
  } else {
    window["$message"].warning("暂无下级地市");
  }
};

// 初始化数据
getData(code.value);
</script>

<template>

  <div class="centermap">
    <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext">{{ title }}</span>
      <div class="you"></div>
    </div>
    <div class="mapwrap">
      <BorderBox13>
        <div class="macau" @click="getData('Macau')" v-if="code !== 'Macau'">全澳</div>
        <v-chart
		  id="macua"
          class="chart"
          :option="option"
          ref="centerMapRef"
          @click="mapClick"
          v-if="JSON.stringify(option) != '{}'"
        />
      </BorderBox13>
    </div>
  </div>
</template>

<style scoped lang="scss">
.centermap {
  margin-bottom: 30px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(92deg, #2e4744 0%, #4f7472 48.8525390625%, #284d42 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("@/assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("@/assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    height: 580px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;

    .quanguo {
      position: absolute;
      right: 20px;
      top: -46px;
      width: 80px;
      height: 28px;
      border: 1px solid #00eded;
      border-radius: 10px;
      color: #00f7f6;
      text-align: center;
      line-height: 26px;
      letter-spacing: 6px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5), 0 0 6px rgba(0, 237, 237, 0.4);
      z-index: 10;
    }
  }
}
</style>
