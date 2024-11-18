<template>
<div class="relative h-[500px] bg-Neutral-500 rounded-lg w-full bg-background overflow-hidden border">
	<FlickeringGrid
	  class="z-0 absolute inset-0 size-full"
	  :squareSize="5"
	  :gridGap="6"
	  color="#aaaaff"
	  :maxOpacity="0.5"
	  :flickerChance="0.1"
	  :height="800"
	  :width="800"
	/>
	<div id="macauMap" ref="mapChartDom" style="width: 100%; height: 500px;"></div>
	
  </div>
  </template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import { GETNOBASE } from "@/api";
import FlickeringGrid from '@/components/ui/flickering-grid.vue'; 

const mapChartDom = ref(null);
let macauMapChart = null;
const areaData = [
  { name: 'Cathedral Parish', value: 51430800 },
  { name: 'Cotai Reclamation Area', value: 44999792 },
  { name: 'Our Lady of Carmel Parish', value: 27172919 },
  { name: 'Our Lady of Fatima Parish', value: 20481757 },
  { name: 'St. Anthony Parish', value: 12953188 },
  { name: 'St. Lawrence Parish', value: 5711291 },
  { name: 'St. Francis Parish', value: 4642241 },
  { name: 'St. Lazarus Parish', value: 1875329 }
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
        text: '2024 Macau regional visitors',
        left: 'center',
		textStyle:{
			fontSize:18,
		}
      },
      tooltip: {
        trigger: 'item',
        formatter: params => `${params.name}<br/>person-time: ${params.value}`
      },
      visualMap: {
        min: 0,
        max: 51430800,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: true,
        inRange: {
          color: ['#f8f5f0', '#fcd7c4', '#efa37f', '#d65f4f', '#b4202e']
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
