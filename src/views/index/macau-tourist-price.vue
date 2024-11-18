<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from "vue";
import { getMainlandTourist } from "@/api";
import { ElMessage } from "element-plus";
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

interface TouristPriceData {
  Year : number;
  [key: string]: number;
}

const option = ref<EChartsOption>({});
const macauTouristPrice = reactive({
  data: [
			{
				"Year": 2009,
				"Food, tobacco and alcohol": 95.9217909,
				"Clothing and shoes": 97.55239183,
				"Accommodation": 91.1651378,
				"Catering": 96.15402128,
				"Transportation and communication": 94.90270018,
				"Drugs and Personal": 99.22642589,
				"Entertainment and culture": 99.20819734,
				"Miscellaneous": 77.92816102
			},
			{
				"Year": 2010,
				"Food, tobacco and alcohol": 100.5255623,
				"Clothing and shoes": 101.11807309,
				"Accommodation": 105.42310898,
				"Catering": 100.905223,
				"Transportation and communication": 99.96671331,
				"Drugs and Personal": 100.37004839,
				"Entertainment and culture": 99.61446959,
				"Miscellaneous": 94.77840078
			},
			{
				"Year": 2011,
				"Food, tobacco and alcohol": 112.04719676,
				"Clothing and shoes": 105.84971513,
				"Accommodation": 143.04552197,
				"Catering": 112.74810807,
				"Transportation and communication": 104.90831101,
				"Drugs and Personal": 102.59362568,
				"Entertainment and culture": 104.50695014,
				"Miscellaneous": 113.51141749
			},
			{
				"Year": 2012,
				"Food, tobacco and alcohol": 120.06669582,
				"Clothing and shoes": 116.59884681,
				"Accommodation": 142.14376542,
				"Catering": 127.38788229,
				"Transportation and communication": 110.00114578,
				"Drugs and Personal": 107.10972257,
				"Entertainment and culture": 115.97174871,
				"Miscellaneous": 121.05763385
			},
			{
				"Year": 2013,
				"Food, tobacco and alcohol": 131.05816776,
				"Clothing and shoes": 128.8369935,
				"Accommodation": 155.9042685,
				"Catering": 135.84416225,
				"Transportation and communication": 116.27281687,
				"Drugs and Personal": 113.69348702,
				"Entertainment and culture": 123.67443061,
				"Miscellaneous": 116.74478071
			},
			{
				"Year": 2014,
				"Food, tobacco and alcohol": 137.89413056,
				"Clothing and shoes": 136.21583323,
				"Accommodation": 169.51770018,
				"Catering": 144.49139983,
				"Transportation and communication": 115.32277333,
				"Drugs and Personal": 116.8112055,
				"Entertainment and culture": 129.48847506,
				"Miscellaneous": 116.07831471
			},
			{
				"Year": 2015,
				"Food, tobacco and alcohol": 144.14486056,
				"Clothing and shoes": 133.78501387,
				"Accommodation": 157.50845454,
				"Catering": 150.29958245,
				"Transportation and communication": 117.00096762,
				"Drugs and Personal": 117.35258062,
				"Entertainment and culture": 134.95914151,
				"Miscellaneous": 115.04062075
			},
			{
				"Year": 2016,
				"Food, tobacco and alcohol": 146.89497887,
				"Clothing and shoes": 133.21681675,
				"Accommodation": 124.12140314,
				"Catering": 153.70948528,
				"Transportation and communication": 105.51077388,
				"Drugs and Personal": 116.00239959,
				"Entertainment and culture": 133.35345446,
				"Miscellaneous": 117.57001396
			},
			{
				"Year": 2017,
				"Food, tobacco and alcohol": 151.25073744,
				"Clothing and shoes": 123.67414905,
				"Accommodation": 130.2890885,
				"Catering": 161.56886788,
				"Transportation and communication": 98.63474769,
				"Drugs and Personal": 115.76816408,
				"Entertainment and culture": 138.05581089,
				"Miscellaneous": 115.05598883
			},
			{
				"Year": 2018,
				"Food, tobacco and alcohol": 157.74301317,
				"Clothing and shoes": 119.87415243,
				"Accommodation": 137.18767037,
				"Catering": 164.29120526,
				"Transportation and communication": 101.86155441,
				"Drugs and Personal": 115.8543501,
				"Entertainment and culture": 140.5783023,
				"Miscellaneous": 114.10946499
			},
			{
				"Year": 2019,
				"Food, tobacco and alcohol": 162.21226551,
				"Clothing and shoes": 113.50407628,
				"Accommodation": 133.75225296,
				"Catering": 167.36799633,
				"Transportation and communication": 101.33363581,
				"Drugs and Personal": 117.32180437,
				"Entertainment and culture": 145.0390296,
				"Miscellaneous": 114.49218572
			},
			{
				"Year": 2020,
				"Food, tobacco and alcohol": 160.12300635,
				"Clothing and shoes": 97.89710188,
				"Accommodation": 95.65272372,
				"Catering": 164.71976078,
				"Transportation and communication": 105.27173199,
				"Drugs and Personal": 118.69456689,
				"Entertainment and culture": 138.3084728,
				"Miscellaneous": 119.63192127
			},
			{
				"Year": 2021,
				"Food, tobacco and alcohol": 160.47105674,
				"Clothing and shoes": 97.21898917,
				"Accommodation": 67.6410999,
				"Catering": 172.33323143,
				"Transportation and communication": 97.89834264,
				"Drugs and Personal": 118.97109734,
				"Entertainment and culture": 139.93650528,
				"Miscellaneous": 119.30453864
			},
			{
				"Year": 2022,
				"Food, tobacco and alcohol": 168.67056625,
				"Clothing and shoes": 98.21649571,
				"Accommodation": 57.14418082,
				"Catering": 171.19976017,
				"Transportation and communication": 99.41742318,
				"Drugs and Personal": 123.39253742,
				"Entertainment and culture": 172.53579946,
				"Miscellaneous": 118.56120821
			},
			{
				"Year": 2023,
				"Food, tobacco and alcohol": 174.87209855,
				"Clothing and shoes": 104.97786753,
				"Accommodation": 147.39358926,
				"Catering": 174.63142749,
				"Transportation and communication": 103.67094757,
				"Drugs and Personal": 129.06926764,
				"Entertainment and culture": 201.51854492,
				"Miscellaneous": 122.33246482
			}
		] as TouristPriceData[]
});


const state = reactive({
  data: macauTouristPrice as any
});
/*
const getData = () => {
  getMainlandTourist().then((res) => {
    if (res.success) {
      console.log("遊客成功:" + res.data);
      state.data = res.data;
      setTimeout(() => {
        setOption();
      }, 10);
    } else {
      ElMessage.error(res.msg);
      setTimeout(() => {
        getData();
      }, 100);
    }
  }).catch(err => {
    ElMessage.error(err.toString());
  });
};
*/

const setOption = () => {
  if (!state.data) return;
  
  const years: number[] = [];
  const seriesData: echarts.SeriesOption[] = [];
  const colors = ["#5470c6", "#92cc75", "#ebbd55", "#73c0de", "#3aa272", "#fc8451", "#ea7ccc", "#6495ed"];

  const columns = Object.keys(macauTouristPrice.data[0]).filter(key => key !== "Year");

  columns.forEach((column, index) => {
    seriesData.push({
      name: column,
      type: "line",
      smooth: true,
      showAllSymbol: true,
      symbol: "circle",
      symbolSize: 10,
      lineStyle: {
        color: colors[index % colors.length],
      },
      label: {
        show: false,
        position: "top",
        color: colors[index % colors.length],
      },
      itemStyle: {
        color: colors[index % colors.length],
        borderColor: colors[index % colors.length],
        borderWidth: 0,
      },
      tooltip: {
        show: true,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            { offset: 0, color: colors[index % colors.length] + "4D" },
            { offset: 1, color: colors[index % colors.length] + "00" }
          ],
          false
        ),
        shadowColor: colors[index % colors.length] + "E6",
        shadowBlur: 20,
      },
      data: [],
    });
  });

  macauTouristPrice.data.forEach((row) => {
    years.push(row.Year);
    columns.forEach((column, index) => {
      seriesData[index].data!.push(parseFloat(row[column].toFixed(2)));
    });
  });

  option.value = {
    textStyle: {
      fontSize: 7
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(0, 255, 233,0)" },
              { offset: 0.5, color: "rgba(255, 255, 255,1)" },
              { offset: 1, color: "rgba(0, 255, 233,0)" }
            ],
            global: false
          }
        }
      }
    },
    legend: {
      orient: "horizontal",
      icon: "circle",
      //left: "5%",
      itemGap: 20,
      itemWidth: 10,
      itemHeight: 10,
      borderWidth: 0,
      textStyle: {
        fontSize: 8,
        color: "#6b7280" //(name: string) => {
          //const series = option.value.series?.find((s: any) => s.name === name);
          //return series ? series.lineStyle.color : "#4ca9ff";
        //}
      },
      formatter: (name: string) => {
        return name.length > 6 ? name.slice(0, 6) + "\n" + name.slice(6) : name;
      }
    },
	toolbox: {
		feature: {
		saveAsImage: {}
		},
	left: '1%',
	top: '1%' // Position the toolbox 5% from the bottom
	},
    grid: {
      //top: "10%",
      //left: "10%",
      right: "10%",
      bottom: "10%",
    },
    xAxis: [{
      type: "category",
      axisLine: {
        show: true,
        lineStyle: { color: "#6b7280" },
      },
      splitArea: {
        show: false,
      },
      axisLabel: { color: "#6b7280" },
      splitLine: { show: false },
      axisTick: { show: false },
      boundaryGap: true,
      data: years,
    }],
    yAxis: [{
      type: "value",
      min: 0,
      splitNumber: 4,
      splitLine: {
        show: false,
        lineStyle: { color: "rgba(255,255,255,0.1)" },
      },
      axisLine: {
        show: true,
        lineStyle: { color: "#6b7280" },
      },
      axisLabel: {
        show: true,
        margin: 20,
        //textStyle: { color: "#00aa00" },
      },
      axisTick: { show: false },
    }],
    series: seriesData,
  };
};
 const myChart = ref()
onMounted(async () => {
  await nextTick();
  //getData();
  setOption()
  var infoEl = myChart.value
});
</script>

<template>
  <v-chart id="mainland" class="chart" :option="option" v-if="Object.keys(option).length > 0" />
</template>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
