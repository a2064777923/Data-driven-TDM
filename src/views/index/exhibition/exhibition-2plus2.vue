<template>
  <div>
    <el-row>
		<div :span="24" style="text-align: center; font-size: 18px; margin-top: 20px; margin-bottom: 20px;">
        Number of Exhibitors and Professional Visitors of Exhibitions (2015-2023)
		</div>
    </el-row>

    <el-row class="row">
      <el-col :span="12">
        <div class="chart-container">
          <div class="chart-title">Gov/ Non-Gov Exhibitor</div>
          <div ref="lineChartExhibitorsGov" class="chart"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-container">
          <div class="chart-title">Exhibitors by Region</div>
          <div ref="lineChartExhibitorsRegion" class="chart"></div>
        </div>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="12">
        <div class="chart-container">
          <div class="chart-title">Professional Visitors to Gov/ Non-Gov Exhibitions</div>
          <div ref="lineChartVisitorsGov" class="chart"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-container">
          <div class="chart-title">Professional Visitors by Region</div>
          <div ref="lineChartVisitorsRegion" class="chart"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

export default {
  name: 'ExhibitionCharts',
  setup() {
    const lineChartExhibitorsGov = ref(null);
    const lineChartExhibitorsRegion = ref(null);
    const lineChartVisitorsGov = ref(null);
    const lineChartVisitorsRegion = ref(null);

    const dataExhibitorsGov = [
      ['Year', 'Gov', 'Non-Gov'],
      ['2015', 1692, 3915],
      ['2016', 1919, 2868],
      ['2017', 2210, 3323],
      ['2018', 2414, 3204],
      ['2019', 2629, 3547],
      ['2020', 1519, 2033],
      ['2021', 1895, 3062],
      ['2022', 2209, 3437],
      ['2023', 2906, 4293]
    ];

    const dataExhibitorsRegion = [
      ['Year', 'Mainland', 'HK', 'Macao', 'Taiwan', 'Others'],
      ['2015', 1017, 1326, 2165, 355, 744],
      ['2016', 1233, 803, 1758, 409, 584],
      ['2017', 1582, 787, 1989, 303, 872],
      ['2018', 1429, 994, 2225, 266, 704],
      ['2019', 1845, 1034, 2053, 241, 1003],
      ['2020', 784, 220, 2450, 10, 88],
      ['2021', 1482, 199, 3135, 7, 134],
      ['2022', 1452, 198, 3900, 2, 94],
      ['2023', 2256, 819, 3483, 59, 582]
    ];

    const dataVisitorsGov = [
      ['Year', 'Gov', 'Non-Gov'],
      ['2015', 11779, 133087],
      ['2016', 9526, 89840],
      ['2017', 21194, 77365],
      ['2018', 17458, 76989],
      ['2019', 21159, 95132],
      ['2020', 10990, 23300],
      ['2021', 12904, 25309],
      ['2022', 11015, 30142],
      ['2023', 11615, 48264]
    ];

    const dataVisitorsRegion = [
      ['Year', 'Mainland', 'HK', 'Macao', 'Taiwan', 'Others'],
      ['2015', 28580, 23798, 75757, 3151, 13580],
      ['2016', 20836, 9172, 54237, 3283, 11838],
      ['2017', 21556, 10986, 52546, 4028, 9443],
      ['2018', 21625, 10154, 53113, 2642, 6913],
      ['2019', 39698, 15217, 41281, 2211, 17884],
      ['2020', 9950, 174, 23851, 25, 290],
      ['2021', 14625, 247, 23179, 4, 158],
      ['2022', 13680, 688, 26776, 0, 13],
      ['2023', 18685, 7522, 25737, 487, 7448]
    ];

    onMounted(() => {
      initChart(lineChartExhibitorsGov.value, dataExhibitorsGov);
      initChart(lineChartExhibitorsRegion.value, dataExhibitorsRegion);
      initChart(lineChartVisitorsGov.value, dataVisitorsGov);
      initChart(lineChartVisitorsRegion.value, dataVisitorsRegion);
    });

    function initChart(el, data) {
      const chartInstance = echarts.init(el);
      const option = generateLineChartOption(data, 'Number');
      chartInstance.setOption(option);
    }

    function generateLineChartOption(data, yAxisName) {
      const seriesList = data[0].slice(1).map((item, index) => ({
        type: 'line',
        name: item,
        encode: { x: 'Year', y: item },
        showSymbol: false,
        lineStyle: { width: 2 },
        endLabel: {
          show: false,
          formatter: function (params) {
            return params.seriesName + ': ' + params.value[params.encode.y[0]];
          }
        },
        label: {show:false},
        labelLayout: { moveOverlap: 'shiftY' },
        emphasis: { focus: 'series' }
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
          axisLabel: { margin: 1, fontSize: 10 }
        },
        yAxis: { name: yAxisName, axisLabel: { fontSize: 10 } },
        series: seriesList,
        color: ['#5470c6', '#92cc75', '#ebbd55', '#73c0de', '#fc8451'],
        legend: {
          top: '0%',
          left: '20%',
          right: '25%',
          data: data[0].slice(1).sort((a, b) => {
            const lastIndex = data.length - 1;
            return data[lastIndex][data[0].indexOf(b)] - data[lastIndex][data[0].indexOf(a)];
          })
        }
      };
    }

    return {
      lineChartExhibitorsGov,
      lineChartExhibitorsRegion,
      lineChartVisitorsGov,
      lineChartVisitorsRegion
    };
  }
};
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
}

.chart-title {
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.chart {
  width: 450px;
  height: 300px;
}

.row {
  display: flex;
  width: 1000px;
  margin-bottom: 20px;
}
</style>
