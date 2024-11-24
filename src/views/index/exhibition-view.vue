<template>
  <div>
    <div class="chart-container">
      <el-slider
        v-model="currentYear"
        :min="minYear"
        :max="maxYear"
        :step="1"
        :marks="marks"
        show-tooltip
        @change="updateChart"
        style="height: 200px; width: 15px; font-size: 8px; color: grey;"
        vertical
        class="vertical-slider"
      ></el-slider>
      <div ref="chartDom" id="chart1" class="chart"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import * as echarts from 'echarts';

export default {
  name: 'ChartComponent',
  setup() {
    const rawData1 = [
      [9771, 38685, 49111, 20284], [11430, 44131, 95916, 24375], [7404, 46981, 169273, 22121],
      [8511, 49105, 213704, 24747], [11847, 60646, 178676, 39700], [2101, 14716, 16977, 5309],
      [3322, 17780, 17809, 3701], [4794, 20574, 14964, 3189], [16438, 41079, 93789, 18682]
    ];

    const themes1 = ['Government Meeting', 'Association Meeting', 'Corporate Meeting', 'Conference'];
    const colors = ['#5470c6', '#92cc75', '#ebbd55', '#ee6666'];

    const minYear = 2015;
    const maxYear = 2023;
    const currentYear = ref(minYear);

    const marks = {
      [minYear]: '2015', [minYear + 1]: '2016', [minYear + 2]: '2017',
      [minYear + 3]: '2018', [minYear + 4]: '2019', [minYear + 5]: '2020',
      [minYear + 6]: '2021', [minYear + 7]: '2022', [maxYear]: '2023'
    };

    const chartDom = ref(null);
    let myChart = null;

    const updateChart = () => {
      const dataIndex = currentYear.value - minYear;
      const data = rawData1[dataIndex];

      const sortedIndices = data.map((value, index) => ({ value, index }))
                                .sort((a, b) => b.value - a.value)
                                .map(item => item.index);

      const option = {
        //title: {
          //text: "Participants & Attendees(No.)",
          //left: "center",
          //top: "0%",
          //textStyle: {
          //  fontSize: 16,
          //},
        //},
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        toolbox: {
	        feature: {
	        saveAsImage: {}
	      }
	      },
        legend: {
          orient: 'horizontal', // Change to 'horizontal' or 'vertical' as needed
          top: '0%', // Adjust the top value to move the legend up or down
          left: 'center', // Center the legend horizontally
          padding: [0, 20], // Add padding around the legend
          textStyle: {
                      color: 'grey', // Set font color to grey
                      fontSize: 8 // Set font size (adjust as needed)
                      }
                },
        series: [{
          name: 'Event Type',
          type: 'pie',
          top: '5%',
          radius: ['40%', '70%'],
          //center: ['50%', '50%'], 
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: 'inside',
            formatter: (params) => {
              const total = data.reduce((sum, value) => sum + value, 0);
              const percent = ((params.value / total) * 100).toFixed(2);
              return `${percent}%`;
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: data.map((value, index) => ({
            value,
            name: themes1[index],
            itemStyle: {
              color: index === sortedIndices[0] ? colors[0] :
                     index === sortedIndices[1] ? colors[1] :
                     index === sortedIndices[2] ? colors[2] :
                     colors[3]
            }
          }))
        }]
      };

      myChart.setOption(option);
    };

    onMounted(() => {
      myChart = echarts.init(chartDom.value);
      updateChart();
    });

    return {
      currentYear,
      chartDom,
      marks,
      updateChart,
      minYear,
      maxYear
    };
  }
}
</script>

<style scoped>
.chart-container {
  display: flex;
  align-items: flex-start; /* Aligns the slider and chart at the top */
}

.chart {
  width: 100%;
  height: 250px;
  margin-left: 5px; /* Adjust as needed to create space between slider and chart */
}

#year {
  text-align: right;
  font-size: 18px;
  margin-bottom: 10px;
}

.vertical-slider {
  margin-right: 20px;
}

::v-deep .el-slider__marks-text {
  font-size: 8px; /* 设置字体大小 */
  color: grey; /* 设置字体颜色 */
  }
</style>
