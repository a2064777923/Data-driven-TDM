<template>
  <div>
	  <h1>HK overnight contrast</h1>
	  <el-select size="small"  v-model="selectedYear" @change="updateChart">
	    <el-option
	      v-for="year in Object.keys(chartData)"
	      :key="year"
	      :label="year"
	      :value="year"
	    ></el-option>
	  </el-select>
	  	
	  <div class="chart">	  

      <div  ref="chartContainer" style="width: 300px; height: 250px"></div>
	  </div>
	  <el-button size="small" @click="toggleAutoPlay">
	    {{ isAutoPlay ? 'Stop play' : 'Auto play' }}
	  </el-button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

const chartData = {"2009":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[4914,5127,5330,3893,4460,5117,3069,6620],"nonOvernight":[476,567,560,444,706,568,2347,2352]},"2010":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[6476,6674,7050,4976,5251,5197,3824,7453],"nonOvernight":[329,560,573,377,543,610,2299,2356]},"2011":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[7004,7147,7849,5113,6121,5860,4363,8220],"nonOvernight":[465,593,714,506,716,627,2287,2439]},"2012":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[7266,7414,7943,5234,6501,5759,4304,8565],"nonOvernight":[451,411,623,503,604,521,1783,2489]},"2013":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[7300,7400,7959,4821,6678,5730,3918,8937],"nonOvernight":[379,465,532,518,676,565,2065,2721]},"2014":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[7151,7250,7558,4502,6735,5598,3875,8703],"nonOvernight":[455,438,474,442,709,596,2058,2701]},"2015":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[6737,6412,6530,4156,6255,5092,4383,7924],"nonOvernight":[458,510,491,441,630,587,1818,2696]},"2016":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[6196,5999,6636,3839,5638,4585,3886,7275],"nonOvernight":[413,515,534,425,685,611,1799,2377]},"2017":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[6184,5862,6500,3978,5687,4758,3979,7010],"nonOvernight":[378,520,487,374,752,553,1807,2298]},"2018":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[6215,6739,6726,4354,6026,5233,4240,7029],"nonOvernight":[416,586,430,519,603,693,2050,2410]},"2019":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[6008,5981,6200,4272,5732,4813,4481,5990],"nonOvernight":[444,581,423,526,704,634,1777,2198]},"2023":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[7854.495972904,9123.83779731081,8059.67247390022,7056.5357842661,8932.65476413959,7386.38542692186,3992.50616946718,6495.33119441603],"nonOvernight":[893.64416178031,1150.09014929369,833.050816287815,1121.73540942375,1140.76808732577,577.906576898293,882.97916348792,1383.39835507102]},"2024":{"markets":["美洲","歐洲，非洲及中東","澳洲、新西蘭及南太平洋","北亞","南亞及東南亞","台灣","澳門特區","中國內地"],"overnight":[7910.97410257757,7612.6610923129,7830.25203377913,4957.97585812682,7195.44251734611,5443.95333654483,3664.2752872696,5125.61132284846],"nonOvernight":[1092.35215305812,984.74063757116,970.751407435172,959.60386228075,923.105049836107,734.078952655484,1193.06359430151,1260.39842443122]}};

const chartContainer = ref(null);
const selectedYear = ref(Object.keys(chartData)[0]);
const isAutoPlay = ref(false);
let chart = null;
let autoPlayInterval = null;

const initChart = () => {
  chart = echarts.init(chartContainer.value);
  updateChart();
};

const updateChart = () => {
  const yearData = chartData[selectedYear.value];
  const sortedData = yearData.markets
    .map((market, index) => ({
      market,
      overnight: yearData.overnight[index],
      nonOvernight: yearData.nonOvernight[index],
    }))
    .sort((a, b) => b.overnight - a.overnight);

  const option = {
    tooltip: {
      trigger: 'item',
      axisPointer: { type: 'cross' },
      formatter: (params) => {
        const { seriesName, dataIndex } = params;
        const market = option.angleAxis.data[dataIndex];
        const overnightValue = option.series[0].data[dataIndex];
        const nonOvernightValue = option.series[1].data[dataIndex];
        return `${market}<br>过夜人均消费港元: ${overnightValue}<br>不过夜人均消费港元: ${nonOvernightValue}`;
      },
    },
    polar: {
      center: ['50%', '50%'],
      radius: '70%',
    },
    angleAxis: {
      type: 'category',
      data: sortedData.map(item => item.market),
      startAngle:90,
      endAngle: 450,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(0,0,0,0.05)', width: 1 },
      },
	  axisLabel: {
	        fontSize: 8
	}
    },
    radiusAxis: {
      min: 0,
      max: Math.max(...sortedData.map(item => Math.max(item.overnight, item.nonOvernight))),
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(0,0,0,0.05)', width: 1 },
      },
    },
    series: [
      {
        type: 'bar',
        data: sortedData.map(item => item.overnight),
        coordinateSystem: 'polar',
        name: '过夜人均消费港元',
        itemStyle: { color: '#5aadf2' },
        label: { show: false, position: 'inside', formatter: '{c}' },
        emphasis: { itemStyle: { opacity: 0.8 } },
      },
      {
        type: 'bar',
        data: sortedData.map(item => item.nonOvernight),
        coordinateSystem: 'polar',
        name: '不过夜人均消费港元',
        itemStyle: { color: '#5bcba1' },
        label: { show: false, position: 'inside', formatter: '{c}' },
        emphasis: { itemStyle: { opacity: 0.8 } },
      },
    ],
    legend: {
      show: true,
      data: ['过夜人均消费港元', '不过夜人均消费港元'],
    },
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
  };

  chart.setOption(option);
};

const autoPlay = () => {
  const years = Object.keys(chartData);
  const currentIndex = years.indexOf(selectedYear.value);
  const nextIndex = (currentIndex + 1) % years.length;
  selectedYear.value = years[nextIndex];
};

const toggleAutoPlay = () => {
  isAutoPlay.value = !isAutoPlay.value;
  if (isAutoPlay.value) {
    autoPlayInterval = setInterval(autoPlay, 3000);
  } else {
    clearInterval(autoPlayInterval);
  }
};

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  if (chart) {
    chart.dispose();
  }
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
});

watch(selectedYear, updateChart);
</script>

<style scoped>
.chart{
	display: flex;
	justify-content: center;
}
</style>
