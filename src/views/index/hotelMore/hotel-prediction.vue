<template>
	<div class="popover-content">
		<div id="occupancyChart" ref="predictChart" style="width: 100%; height: 300px;"></div>
			
	</div>
</template>

<script setup>
	import { onMounted ,onUnmounted,ref } from 'vue';
	import * as echarts from 'echarts';
	
	// Data arrays for room occupancy
	const dates = [
            '2008-01-01', '2008-02-01', '2008-03-01', '2008-04-01', '2008-05-01', '2008-06-01', '2008-07-01', '2008-08-01', '2008-09-01', '2008-10-01', '2008-11-01', '2008-12-01', '2009-01-01', '2009-02-01', '2009-03-01', '2009-04-01', '2009-05-01', '2009-06-01', '2009-07-01', '2009-08-01', '2009-09-01', '2009-10-01', '2009-11-01', '2009-12-01', '2010-01-01', '2010-02-01', '2010-03-01', '2010-04-01', '2010-05-01', '2010-06-01', '2010-07-01', '2010-08-01', '2010-09-01', '2010-10-01', '2010-11-01', '2010-12-01', '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01', '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01', '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01', '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01', '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01', '2013-07-01', '2013-08-01', '2013-09-01', '2013-10-01', '2013-11-01', '2013-12-01', '2014-01-01', '2014-02-01', '2014-03-01', '2014-04-01', '2014-05-01', '2014-06-01', '2014-07-01', '2014-08-01', '2014-09-01', '2014-10-01', '2014-11-01', '2014-12-01', '2015-01-01', '2015-02-01', '2015-03-01', '2015-04-01', '2015-05-01', '2015-06-01', '2015-07-01', '2015-08-01', '2015-09-01', '2015-10-01', '2015-11-01', '2015-12-01', '2016-01-01', '2016-02-01', '2016-03-01', '2016-04-01', '2016-05-01', '2016-06-01', '2016-07-01', '2016-08-01', '2016-09-01', '2016-10-01', '2016-11-01', '2016-12-01', '2017-01-01', '2017-02-01', '2017-03-01', '2017-04-01', '2017-05-01', '2017-06-01', '2017-07-01', '2017-08-01', '2017-09-01', '2017-10-01', '2017-11-01', '2017-12-01', '2018-01-01', '2018-02-01', '2018-03-01', '2018-04-01', '2018-05-01', '2018-06-01', '2018-07-01', '2018-08-01', '2018-09-01', '2018-10-01', '2018-11-01', '2018-12-01', '2019-01-01', '2019-02-01', '2019-03-01', '2019-04-01', '2019-05-01', '2019-06-01', '2019-07-01', '2019-08-01', '2019-09-01', '2019-10-01', '2019-11-01', '2019-12-01', '2020-01-01', '2020-02-01', '2020-03-01', '2020-04-01', '2020-05-01', '2020-06-01', '2020-07-01', '2020-08-01', '2020-09-01', '2020-10-01', '2020-11-01', '2020-12-01', '2021-01-01', '2021-02-01', '2021-03-01', '2021-04-01', '2021-05-01', '2021-06-01', '2021-07-01', '2021-08-01', '2021-09-01', '2021-10-01', '2021-11-01', '2021-12-01', '2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01', '2022-06-01', '2022-07-01', '2022-08-01', '2022-09-01', '2022-10-01', '2022-11-01', '2022-12-01', '2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01', '2023-07-01', '2023-08-01', '2023-09-01', '2023-10-01', '2023-11-01', '2023-12-01', '2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01', '2024-06-01', '2024-07-01', '2024-08-01', '2024-09-01', '2024-10-01', '2024-11-01', '2024-12-01', '2025-01-01', '2025-02-01', '2025-03-01', '2025-04-01', '2025-05-01', '2025-06-01', '2025-07-01', '2025-08-01', '2025-09-01', '2025-10-01', '2025-11-01', '2025-12-01'
        ];
	
	const historicalData = [
            72.7, 70.7, 75.5, 75.2, 72.7, 73.1, 78.7, 76.5, 66.6, 71.3, 79.0, 78.8, 65.5, 69.3, 72.6, 73.5, 59.3, 60.5, 67.7, 80.2, 72.1, 73.8, 78.2, 82.2, 81.6, 77.8, 77.9, 80.9, 77.9, 75.8, 80.0, 82.4, 74.1, 78.5, 82.8, 87.7, 79.5, 82.2, 81.4, 84.5, 82.0, 82.5, 88.2, 88.5, 79.8, 81.7, 88.5, 89.7, 79.6, 86.3, 85.4, 82.4, 78.6, 80.8, 85.6, 88.1, 80.9, 81.4, 87.2, 86.7, 83.5, 76.2, 79.2, 81.1, 78.2, 80.9, 84.4, 90.3, 82.7, 82.9, 87.9, 89.8, 80.9, 91.5, 88.2, 85.3, 85.5, 84.5, 86.6, 90.0, 84.6, 85.6, 90.3, 85.1, 80.5, 81.2, 78.2, 80.5, 80.7, 76.1, 83.6, 87.0, 79.2, 81.8, 85.2, 83.5, 77.2, 79.2, 77.2, 79.7, 79.9, 82.7, 87.5, 91.0, 82.7, 84.1, 87.1, 89.7, 81.6, 86.5, 82.7, 86.1, 85.2, 85.4, 90.8, 86.8, 86.7, 89.1, 91.4, 93.6, 91.5, 89.6, 89.0, 91.1, 89.0, 89.8, 91.9, 95.2, 86.7, 89.9, 94.0, 94.7, 92.9, 91.9, 90.8, 91.5, 90.1, 89.4, 93.1, 93.0, 84.6, 88.3, 91.9, 92.0, 81.0, 14.8, 23.2, 12.6, 11.8, 11.8, 12.1, 13.3, 17.1, 39.8, 44.0, 53.1, 40.3, 38.4, 55.2, 59.0, 62.1, 45.4, 63.7, 38.4, 49.5, 44.8, 46.5, 54.8, 43.9, 48.6, 30.7, 29.8, 34.3, 39.9, 38.8, 34.9, 37.5, 41.7, 38.6, 42.8, 71.4, 76.1, 77.1, 79.3, 78.7, 84.1, 89.4, 88.5, 78.3, 82.8, 83.1, 85.7, 85.9, 85.1, 83.7, 83.1, 83.3, 82.8, 88.4, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
        ];
	
	const forecastedData = [
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 87.07053073339694, 83.09231700913664, 86.8413923983036, 89.81889975685677, 92.447084869734, 89.26919809631397, 85.86187999533264, 85.78868878202718, 86.09791748232391, 85.30472096149738, 85.03421595243957, 90.07484117389592, 88.86849018809045, 84.82331657382329, 88.6084505947296, 91.56631529446372, 94.20503486404051
        ];
	const predictChart = ref(null);
	let myChart = null;
	
	const showChart = ref(null);
	
	const initChart = () => {
	  showChart.value = true;
	  myChart = echarts.init(predictChart.value);
	  const option = {
		backgroundColor: "#e7e7e7",
	    title: {
	      text: 'Room Occupancy Forecast with SARIMA',
	      left: 'center'
	    },
	    tooltip: {
	      trigger: 'axis'
	    },
	    legend: {
	      data: ['Historical', 'Forecast'],
	      bottom: 10
	    },
	    xAxis: {
	      type: 'category',
	      data: dates,
	      axisLabel: {
	        formatter: (value) => value.slice(0, 7) // Format dates
	      }
	    },
	    yAxis: {
	      type: 'value',
	      name: 'Room \n Occupancy (%)'
	    },
	    series: [
	      {
	        name: 'Historical',
	        type: 'line',
	        data: historicalData,
	        smooth: true,
	        lineStyle: { color: 'blue' }
	      },
	      {
	        name: 'Forecast',
	        type: 'line',
	        data: forecastedData,
	        smooth: true,
	        lineStyle: { type: 'dashed', color: 'red' }
	      }
	    ]
	  };
	
	  myChart.setOption(option);
	};
	
	// Mount the chart after 5 seconds
	onMounted(() => {
	  setTimeout(() => {
	    initChart();
	  }, 5000);
	});
	
	onUnmounted(()=>{
		if(myChart){
			myChart.dispose();
			predictChart.value = null;
		}
	})
</script>

<style scoped>
.popover-content {
  height: 300px;
  width: 400px;
  background-image: url('https://img.macautourism.top/tourism/tourism/assert/2024/11/18/BrainStome_small.gif'); 
  background-size: cover; 
  color: white;
  padding: 20px; /* 添加一些内边距 */
  border-radius: 8px; /* 可选：设置圆角 */
}
.popover-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.4); /* 设置半透明的背景 */
  border-radius: 8px; /* 确保伪元素和内容区域的圆角一致 */
}
#occupancyChart{
	position: absolute;
	top: 13px;
	left: -2px;
}

</style>