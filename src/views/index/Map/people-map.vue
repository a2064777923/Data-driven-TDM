<template>
  <div id="macauMap" ref="mapChartDom" style="width: 100%; height: 500px;"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import { GETNOBASE } from "@/api";

const mapChartDom = ref(null);
let macauMapChart = null;
const areaData = [
  { name: '大堂区', value: 51430800 },
  { name: '路凼填海区', value: 44999792 },
  { name: '嘉模堂区', value: 27172919 },
  { name: '花地玛堂区', value: 20481757 },
  { name: '花王堂区', value: 12953188 },
  { name: '风顺堂区', value: 5711291 },
  { name: '圣方济各堂区', value: 4642241 },
  { name: '望德堂区', value: 1875329 }
];

async function fetchMacauGeoJson() {
  try {
    const mapJson = await GETNOBASE('./map-geojson/Macau.json');
    return mapJson;
  } catch (error) {
    console.error('地图数据加载失败:', error);
    throw error;
  }
}

const initializeMap = async () => {
  try {
    const mapJson = await fetchMacauGeoJson();
    if (!mapChartDom.value) return;
  
    macauMapChart = echarts.init(mapChartDom.value);
    echarts.registerMap('macau', mapJson);

    const option = {
      title: {
        text: '2024年澳门区域人次数据',
        left: 'center',
		textStyle:{
			fontSize:18,
		}
      },
      tooltip: {
        trigger: 'item',
        formatter: params => `${params.name}<br/>人次: ${params.value}`
      },
      visualMap: {
        min: 0,
        max: 51430800,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: true,
        inRange: {
          color: ['#d4ffec', '#06dd84']
        }
      },
      geo: {
        map: 'macau',
        roam: true,
        label: {
          show: true
        }
      },
      series: [
        {
          name: '澳门区人次数据',
          type: 'map',
          geoIndex: 0,
          data: areaData
        }
      ]
    };

    macauMapChart.setOption(option);
  } catch (error) {
    console.error('初始化地图失败:', error);
  }
};

onMounted(() => {
  initializeMap();
});

onUnmounted(() => {
  if (macauMapChart) {
    macauMapChart.dispose();
  }
});
</script>
