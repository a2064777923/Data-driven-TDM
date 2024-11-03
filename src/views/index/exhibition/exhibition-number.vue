<template>
  <el-container class="chart-page">
    <el-main>
      <div id="title" class="page-title">
        Exhibitions and Booths by Government and Non-Government (2015-2023)
      </div>
      
      <div class="row">
        <div class="chart-container">
          <div class="chart-title">Exhibitions</div>
          <div id="ChartExhibitions" ref="lineChartExhibitions" class="chart"></div>
        </div>
        <div class="chart-container">
          <div class="chart-title">Booths</div>
          <div id="ChartBooths" ref="lineChartBooths" class="chart"></div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted,onUnmounted, ref } from 'vue';

export default {
  name: 'ExhibitionBoothChart',
  setup() {
    const lineChartExhibitions = ref(null);
    const lineChartBooths = ref(null);
	let chartExhibitions = null;
	let chartBooths = null;

    onMounted(() => {
      const dataExhibitions = [
        ['Year', 'Gov', 'Non-Gov'],
        ['2015', 4, 74],
        ['2016', 6, 49],
        ['2017', 7, 44],
        ['2018', 7, 53],
        ['2019', 8, 50],
        ['2020', 6, 28],
        ['2021', 8, 47],
        ['2022', 7, 57],
        ['2023', 10, 54],
      ];

      const dataBooths = [
        ['Year', 'Gov', 'Non-Gov'],
        ['2015', 2828, 8441],
        ['2016', 3151, 5578],
        ['2017', 3487, 5705],
        ['2018', 3533, 6378],
        ['2019', 4016, 6091],
        ['2020', 2728, 2959],
        ['2021', 3153, 4006],
        ['2022', 3691, 5239],
        ['2023', 4406, 6532],
      ];

      chartExhibitions = echarts.init(lineChartExhibitions.value);
      chartBooths = echarts.init(lineChartBooths.value);

      chartExhibitions.setOption(generateLineChartOption(dataExhibitions, 'Number'));
      chartBooths.setOption(generateLineChartOption(dataBooths, 'Number'));
    });
	
	onUnmounted(() => {
	  if (chartExhibitions) {
		chartExhibitions.dispose();
		chartExhibitions = null;
	  }
	  if (chartBooths) {
		chartBooths.dispose();
		chartBooths = null;
	  }
	});

    function generateLineChartOption(data, yAxisName) {
      const seriesList = data[0].slice(1).map((item) => ({
        type: 'line',
        name: item,
        encode: { x: 'Year', y: item },
        showSymbol: false,
        lineStyle: { width: 2 },
        endLabel: {
          show: true,
          formatter: function (params) {
            return params.seriesName + ': ' + params.value[params.encode.y[0]];
          },
        },
        labelLayout: { moveOverlap: 'shiftY' },
        emphasis: { focus: 'series' },
      }));

      return {
        animationDuration: 10000,
        dataset: { source: data },
        tooltip: { order: 'valueDesc', trigger: 'axis' },
        grid: { left: '10%', right: '10%', bottom: '15%', top: '15%' },
        xAxis: {
          type: 'category',
          nameLocation: 'middle',
          name: 'Year',
          axisLabel: { margin: 1, fontSize: 14 },
        },
        yAxis: { name: yAxisName, axisLabel: { fontSize: 14 } },
        series: seriesList,
        color: ['#5470C6', '#91CC75', '#EE6666'],
        legend: {
          top: '5%',
          left: 'center',
          data: data[0].slice(1).sort((a, b) => {
            const lastIndex = data.length - 1;
            return data[lastIndex][data[0].indexOf(b)] - data[lastIndex][data[0].indexOf(a)];
          }),
        },
      };
    }

    return {
      lineChartExhibitions,
      lineChartBooths,
    };
  },
};
</script>

<style scoped>
.chart-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
}

.page-title {
  text-align: center;
  font-size: 24px;
  margin: 5px 0;
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
}

.chart-title {
  text-align: center;
  font-size: 20px;
  margin: 10px 0;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.chart {
  height: 300px;
  width: 900px;
}
</style>
