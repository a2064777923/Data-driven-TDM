<template>
  <div id="chart-container" ref="chartDom"></div>
</template>

<script setup>
import {ref ,onMounted,onUnmounted}from 'vue';
import * as echarts from 'echarts';
const chartDom = ref(null);
let myChart = null;

const data = [
        {
          name: 'Environmental Hygiene',
          values: [84.4, 86, 91.9, 96.6, 96.8]
        },
        {
          name: 'Public Facilities',
          values: [80.4, 83.4, 88.9, 95, 95.4]
        },
        {
          name: 'Hotel Establishments',
          values: [88.6, 88.8, 91.4, 94.1, 95]
        },
        {
          name: 'Gaming Establishments',
          values: [79.3, 81.1, 85.1, 90.1, 92.2]
        },
        {
          name: 'Restaurant and Similiar Establishments',
          values: [78.3, 81.1, 86.7, 91.1, 92.4]
        },
        {
          name: 'Retail Shops',
          values: [81.2, 84, 89.4, 93.1, 94.3]
        },
        {
          name: 'Public Transport',
          values: [71.1, 75.5, 81.6, 87.8, 89.2]
        },
        {
          name: 'Points of Tourist Attractions',
          values: [59, 61.2, 64.7, 71, 76]
        }
      ];

const initChart = () =>{
	if (chartDom.value){
		myChart = echarts.init(chartDom.value);
		renderChart();
	}
};

const renderChart = () =>{
	const categories = ['2018', '2019', '2020', '2021', '2022'];
	
	const series = data.map(item => ({
	  name: item.name,
	  type: 'line',
	  stack: 'Total',
	  label: {
	    show: true,
	    position: 'top'
	  },
	  areaStyle: {},
	  emphasis: {
	    focus: 'series'
	  },
	  data: item.values
	}));
	
	const option = {
	  textStyle:{
		  fontSize: 8
	  },
	  title: {
	    text: 'VISITORS SATISFACTORY LEVEL',
	    top: '0%',
	    left: 'center',
	    textStyle: {
	      fontSize: 10,
	      fontWeight: 'bold',
		  color:'#ec9d00'
	    }
	  },
	  tooltip: {
	    trigger: 'axis',
	    axisPointer: {
	      type: 'cross',
	      label: {
	        backgroundColor: '#6a7985'
	      }
	    }
	  },
	  legend: {
	    data: data.map(item => item.name),
	    top: '5%',
	    width: '80%',
	    left: 'center',
		textStyle:{
			fontSize:8,
			color:'#c5b910'
		}
	  },
	  toolbox: {
	    feature: {
	      saveAsImage: {}
	    }
	  },
	  grid: {
	    left: '3%',
	    right: '4%',
	    bottom: '3%',
	    top: '25%',
	    containLabel: true
	  },
	  xAxis: [
	    {
	      type: 'category',
	      boundaryGap: false,
	      data: categories,
		  axisLabel:{
			  color:'#ffaa7f'
		  }
	    }
	  ],
	  yAxis: [
	    {
	      type: 'value',
		  axisLabel:{
		  			  color:'#ffaa7f'
		  }
	    }
	  ],
	  series: series
	};
	
	myChart.setOption(option);
};
onMounted(()=>{
	initChart();
});
onUnmounted(()=>{
	if(myChart){
		myChart.dispose();
		
	}
});
</script>

<style scoped>
#chart-container {
  width: 100%;
  height: 270px; /* Increased height */
  max-width: 600px;
  margin: 0 auto;
}
</style>
