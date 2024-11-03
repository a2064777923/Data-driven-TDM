<template>
  <div class="chart-container">
    <div class="chart-title">Participants & Attendees of Mice Meet by Subject (2015-2023)</div>
    <div id="year"></div>
    <div id="chartSubject" ref="chartSubject" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted,onUnmounted,ref } from 'vue';

export default {
  name: 'MiceMeetChart',
  setup(){
	  const rawData = [
	    [7567, 2100740, 30308, 145691, 24472, 53706, 134143, 4152, 0, 15313],
	    [17504, 1370339, 26685, 79311, 27760, 41723, 140358, 4355, 0, 13492],
	    [19750, 1627339, 11166, 35026, 28370, 59229, 98417, 3296, 0, 19081],
	    [25664, 1800928, 10687, 42230, 63417, 51328, 105545, 3434, 0, 14587],
	    [24569, 1540185, 15708, 99573, 78538, 43669, 183665, 4694, 0, 21838],
	    [5530, 789985, 616, 6374, 24600, 16436, 60896, 1897, 0, 8130],
	    [7421, 1210126, 2133, 24789, 9383, 18619, 123037, 1628, 0, 4156],
	    [5646, 1217729, 1339, 10165, 23883, 25907, 120009, 1206, 0, 15453],
	    [16484, 1309138, 4238, 33569, 55147, 45525, 97210, 3452, 9872, 27797]
	  ];
	  const chartSubject = ref(null);
	  let chartMice = null;
	  onMounted(()=>{
      try {
        if (chartSubject.value) {
          chartMice = echarts.init(chartSubject.value);
          chartMice.setOption(initChart());
        }
      } catch (error) {
        console.error('Error initializing chart:', error);
      }
	  });
	  onUnmounted(()=>{
		  if (chartMice) {
		  		chartMice.dispose();
				chartMice = null;
		  }
	  })
	  
	  function initChart() {
		  
		  const themes = [
			'Banking & Finance',
			'Commerce, Trade & Management',
			'Education',
			'IT & Technology',
			'Medical & Health',
			'Tourism',
			'Culture & Arts',
			'Judiciary & Law',
			'Sports',
			'Others'
		  ];

		  const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];

		  const seriesData = themes.map((theme, index) => ({
			name: theme,
			type: 'bar',
			stack: 'total',
			emphasis: {
			  focus: 'series'
			},
			data: rawData.map(yearData => yearData[index]),
			label: {
			  show: true,
			  position: 'inside',
			  formatter: '{c}'
			},
			itemStyle: {
			  borderWidth: 1,
			  borderColor: '#fff'
			}
		  }));

			return {
					tooltip: {
					  trigger: 'axis',
					  axisPointer: {
						type: 'shadow'
					  }
					},
					legend: {
					  top: '5%',
					  left: 'center'
					},
					grid: {
					  left: '5%',
					  right: '25%',
					  top: '15%',
					  bottom: '3%',
					  containLabel: true
					},
					xAxis: {
					  type: 'category',
					  data: years,
					  name: 'Year'
					},
					yAxis: {
					  type: 'value',
					  max: 2500000,
					  name: 'Number'
					},
					dataZoom: [
					        {
					          type: 'slider',
					          yAxisIndex: 0, 
					          filterMode: 'weakFilter',
					          start: 0,
					          end: 100,
					          handleIcon: 'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
					          handleSize: '80%',
					          showDetail: false
					        },
					],
					series: seriesData
				  };
		}
		return{
			chartSubject,
		};	  
  },
};
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1000px;
}

#year {
  text-align: right;
  font-size: 18px;
  margin-bottom: 10px;
  width: 100%;
}

.chart-title {
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.chart{
	width: 850px; 
	height: 900px;
}
</style>
