<template>
  <div>
    <div id="year">{{ currentYearDisplay }}</div>
    <div ref="chartDom" id="chart1" class="chart"></div> <!-- 使用 ref 替代 id -->
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
    const colors = ['#FF0000', '#0000FF', '#00FF00', '#006400'];

    const currentYear = ref(0);
    const chartDom = ref(null); // 用ref来引用DOM
    let myChart = null;

    const currentYearDisplay = computed(() => `Current year: ${2015 + currentYear.value}`);

    const updateChart = (data, themes) => {
      const sortedIndices = data.map((value, index) => ({ value, index }))
                               .sort((a, b) => b.value - a.value)
                               .map(item => item.index);

      const option = {
        title: {
          text: "Participants & Attendees(No.)",
          left: "center",
          textStyle: {
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [{
          name: '会展活动',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
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
            show: false
          },
          data: data.map((value, index) => ({
            value,
            name: themes[index],
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

    const updateData = () => {
      updateChart(rawData1[currentYear.value], themes1);
      currentYear.value = (currentYear.value + 1) % rawData1.length;
    };

    onMounted(() => {
      myChart = echarts.init(chartDom.value); // 初始化图表
      updateData();
      setInterval(updateData, 3000);
    });

    return {
      currentYearDisplay,
      chartDom // 返回ref以便在template中使用
    };
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 250px;
}

#year {
  text-align: right;
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
