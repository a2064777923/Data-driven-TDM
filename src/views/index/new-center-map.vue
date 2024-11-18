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

import { install as AMapComponent, AMapComponentOption} from 'echarts-extension-amap/export';
import ECharts from "vue-echarts";
import * as echarts from 'echarts';
import type { TabsPaneContext } from 'element-plus';
import PeopleMap from './Map/people-map.vue';
import RealMap from './Map/real-map.vue';
import GlobalVisitors from './Map/global-visitors.vue';

const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

// 使用组合式API
const option = ref({});

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
onMounted(()=>{
	console.log("Yeah");
});/*async () => {
  try {
	  
    const AMap = await AMapLoader.load({
      key: "b13953f0423806b6565ff927a6cd84a5",
      version: "2.0",
      plugins: ["AMap.Scale"],
    });


    map = new AMap.Map('container', {
      resizeEnable: true,
    });

  } catch (error) {
    console.error("地图加载失败", error);
  }
});*/

// 组件卸载时销毁地图实例
onUnmounted(() => {
  if (map) {
    map.destroy();
  }
});
// 监听option变化
watch(option, (newOption) => {
  if (chart) {
    chart.setOption(newOption);
  }
});
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
		  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
		    <el-tab-pane label="Data Map" name="first">
		  		<div class="tab-content">
		  		      <PeopleMap v-if="activeName==='first'"/>
		  		</div>
		  	</el-tab-pane>
		    <el-tab-pane label="Real Map" name="second">
				<div class="tab-content">
				      <RealMap v-if="activeName==='second'"/>
				</div>
		  	</el-tab-pane>
		    <el-tab-pane label="Global visitors" name="third">
		  		
		  	</el-tab-pane>
		  </el-tabs>

      </BorderBox13>
    </div>
  </div>
</template>

<style scoped lang="scss">
.centermap {
  margin-bottom: 25px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 22px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(92deg, #2e4744 0%, #4f7472 48.8525390625%, #284d42 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 80% 80%;
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
  }
  
  .demo-tabs .el-tabs__content {
    padding: 0px; /* 去除内边距 */
    margin-top: -80px; /* 根据需要调整此值，以减少与标签的间距 */
  }
  
  .tab-content {
    padding: 0px; /* 可以根据需要调整内容的内边距 */
	margin-top: -50px;
  }

}
</style>
