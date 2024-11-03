<template>
  <div>
    <h1>過夜旅客消費模式總消費</h1>
    <el-select size="small"  v-model="selectedYear" @change="updateChart">
      <el-option v-for="year in years" :key="year" :label="year" :value="year"></el-option>
    </el-select>
    <div ref="chartContainer" style="width: 300px; height: 250px"></div>
    <el-button size="small" @click="startAutoPlay">{{isAutoPlay == true ?'Stop play':'Auto play'}}</el-button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted ,watch } from 'vue';
import * as echarts from 'echarts';
const isAutoPlay = ref(false);
export default {
  name: 'ConsumptionChart',
  setup() {
    const chartContainer = ref(null);
    const consumptionChart = ref(null);
    const selectedYear = ref(null);
    const years = ref([]);
    let intervalId = null;
    

    const data = [
    {
        "year": "年份",
        "category": "消費模式",
        "value": "NaN"
    },
    {
        "year": 2009,
        "category": "shopping",
        "value": "63.55"
    },
    {
        "year": 2009,
        "category": "hotel",
        "value": "16.67"
    },
    {
        "year": 2009,
        "category": "meals",
        "value": "10.94"
    },
    {
        "year": 2009,
        "category": "recreation",
        "value": "2.68"
    },
    {
        "year": 2009,
        "category": "sightseeing",
        "value": "0.58"
    },
    {
        "year": 2009,
        "category": "else",
        "value": "5.58"
    },
    {
        "year": 2010,
        "category": "shopping",
        "value": "61.69"
    },
    {
        "year": 2010,
        "category": "hotel",
        "value": "18.58"
    },
    {
        "year": 2010,
        "category": "meals",
        "value": "11.16"
    },
    {
        "year": 2010,
        "category": "recreation",
        "value": "2.82"
    },
    {
        "year": 2010,
        "category": "sightseeing",
        "value": "0.38"
    },
    {
        "year": 2010,
        "category": "else",
        "value": "5.37"
    },
    {
        "year": 2011,
        "category": "shopping",
        "value": "59.32"
    },
    {
        "year": 2011,
        "category": "hotel",
        "value": "20.73"
    },
    {
        "year": 2011,
        "category": "meals",
        "value": "11.17"
    },
    {
        "year": 2011,
        "category": "recreation",
        "value": "3.06"
    },
    {
        "year": 2011,
        "category": "sightseeing",
        "value": "0.44"
    },
    {
        "year": 2011,
        "category": "else",
        "value": "5.28"
    },
    {
        "year": 2012,
        "category": "shopping",
        "value": "59.54"
    },
    {
        "year": 2012,
        "category": "hotel",
        "value": "20.27"
    },
    {
        "year": 2012,
        "category": "meals",
        "value": "11.20"
    },
    {
        "year": 2012,
        "category": "recreation",
        "value": "3.11"
    },
    {
        "year": 2012,
        "category": "sightseeing",
        "value": "0.45"
    },
    {
        "year": 2012,
        "category": "else",
        "value": "5.44"
    },
    {
        "year": 2013,
        "category": "shopping",
        "value": "61.21"
    },
    {
        "year": 2013,
        "category": "hotel",
        "value": "18.68"
    },
    {
        "year": 2013,
        "category": "meals",
        "value": "11.14"
    },
    {
        "year": 2013,
        "category": "recreation",
        "value": "3.38"
    },
    {
        "year": 2013,
        "category": "sightseeing",
        "value": "0.35"
    },
    {
        "year": 2013,
        "category": "else",
        "value": "5.24"
    },
    {
        "year": 2014,
        "category": "shopping",
        "value": "61.73"
    },
    {
        "year": 2014,
        "category": "hotel",
        "value": "18.01"
    },
    {
        "year": 2014,
        "category": "meals",
        "value": "11.27"
    },
    {
        "year": 2014,
        "category": "recreation",
        "value": "3.38"
    },
    {
        "year": 2014,
        "category": "sightseeing",
        "value": "0.30"
    },
    {
        "year": 2014,
        "category": "else",
        "value": "5.33"
    },
    {
        "year": 2015,
        "category": "shopping",
        "value": "58.40"
    },
    {
        "year": 2015,
        "category": "hotel",
        "value": "18.44"
    },
    {
        "year": 2015,
        "category": "meals",
        "value": "13.00"
    },
    {
        "year": 2015,
        "category": "recreation",
        "value": "3.19"
    },
    {
        "year": 2015,
        "category": "sightseeing",
        "value": "0.35"
    },
    {
        "year": 2015,
        "category": "else",
        "value": "6.62"
    },
    {
        "year": 2016,
        "category": "shopping",
        "value": "54.48"
    },
    {
        "year": 2016,
        "category": "hotel",
        "value": "19.84"
    },
    {
        "year": 2016,
        "category": "meals",
        "value": "14.27"
    },
    {
        "year": 2016,
        "category": "recreation",
        "value": "3.66"
    },
    {
        "year": 2016,
        "category": "sightseeing",
        "value": "0.37"
    },
    {
        "year": 2016,
        "category": "else",
        "value": "7.39"
    },
    {
        "year": 2017,
        "category": "shopping",
        "value": "50.79"
    },
    {
        "year": 2017,
        "category": "hotel",
        "value": "21.38"
    },
    {
        "year": 2017,
        "category": "meals",
        "value": "15.18"
    },
    {
        "year": 2017,
        "category": "recreation",
        "value": "4.15"
    },
    {
        "year": 2017,
        "category": "sightseeing",
        "value": "0.39"
    },
    {
        "year": 2017,
        "category": "else",
        "value": "8.11"
    },
    {
        "year": 2018,
        "category": "shopping",
        "value": "51.05"
    },
    {
        "year": 2018,
        "category": "hotel",
        "value": "21.46"
    },
    {
        "year": 2018,
        "category": "meals",
        "value": "14.74"
    },
    {
        "year": 2018,
        "category": "recreation",
        "value": "4.38"
    },
    {
        "year": 2018,
        "category": "sightseeing",
        "value": "0.31"
    },
    {
        "year": 2018,
        "category": "else",
        "value": "8.06"
    },
    {
        "year": 2019,
        "category": "shopping",
        "value": "47.52"
    },
    {
        "year": 2019,
        "category": "hotel",
        "value": "22.16"
    },
    {
        "year": 2019,
        "category": "meals",
        "value": "16.26"
    },
    {
        "year": 2019,
        "category": "recreation",
        "value": "4.60"
    },
    {
        "year": 2019,
        "category": "sightseeing",
        "value": "0.29"
    },
    {
        "year": 2019,
        "category": "else",
        "value": "9.18"
    },
    {
        "year": 2023,
        "category": "shopping",
        "value": "45.90"
    },
    {
        "year": 2023,
        "category": "hotel",
        "value": "24.54"
    },
    {
        "year": 2023,
        "category": "meals",
        "value": "19.76"
    },
    {
        "year": 2023,
        "category": "recreation",
        "value": "3.40"
    },
    {
        "year": 2023,
        "category": "sightseeing",
        "value": "0.20"
    },
    {
        "year": 2023,
        "category": "else",
        "value": "6.20"
    },
    {
        "year": 2024,
        "category": "shopping",
        "value": "40.82"
    },
    {
        "year": 2024,
        "category": "hotel",
        "value": "25.86"
    },
    {
        "year": 2024,
        "category": "meals",
        "value": "20.11"
    },
    {
        "year": 2024,
        "category": "recreation",
        "value": "5.49"
    },
    {
        "year": 2024,
        "category": "sightseeing",
        "value": "0.30"
    },
    {
        "year": 2024,
        "category": "else",
        "value": "7.41"
    }
];

    const updateChart = () => {
      const filteredData = data.filter(item => item.year == selectedYear.value);
      const sortedData = filteredData.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
      const gaugeData = sortedData.map((item, index) => ({
        value: parseFloat(item.value).toFixed(2),
        name: item.category,
        title: {
          offsetCenter: getOffsetCenter(index),
        },
        detail: {
          valueAnimation: true,
          offsetCenter: getOffsetCenter(index, "detail"),
          width: 40,
          height: 12,
          fontSize: 12,
        },
      }));

      const option = {
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
            },
            axisLine: {
              lineStyle: {
                width: 50,
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 40,
            },
            data: gaugeData,
            title: {
              fontSize: 12,
            },
            detail: {
              width: 20,
              height: 8,
              fontSize: 8,
              color: "inherit",
              borderColor: "inherit",
              borderRadius: 18,
              borderWidth: 1,
              formatter: "{value}%",
            },
          },
        ],
      };

      consumptionChart.value.setOption(option);
    };

    const getOffsetCenter = (index, flag) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      const xOffset = col === 0 ? "-35%" : "35%";
      const yOffset = `${row * 33 - 33 + 3 + (flag === "detail" ? 0 : -14)}%`;
      return [xOffset, yOffset];
    };

    const autoPlay = () => {
      const currentIndex = years.value.indexOf(selectedYear.value);
      const nextIndex = (currentIndex + 1) % years.value.length;
      selectedYear.value = years.value[nextIndex];
    };

	const startAutoPlay = () => {
	  if (!isAutoPlay.value) {
		intervalId = setInterval(autoPlay, 3000);
		isAutoPlay.value = true;
	  } else {
		clearInterval(intervalId);
		isAutoPlay.value = false;
	  }
	};


    onMounted(() => {
      consumptionChart.value = echarts.init(chartContainer.value);
      years.value = [...new Set(data.map(item => item.year))].filter(year => year !== "年份").sort();
      selectedYear.value = years.value[0];
      updateChart();

    });

	onUnmounted(() => {
	  if (intervalId) {
	    clearInterval(intervalId);
	  }
	});


    watch(selectedYear, updateChart);

    return {
      chartContainer,
      selectedYear,
      years,
      updateChart,
      startAutoPlay,
	  isAutoPlay,
    };
  },
};
</script>
