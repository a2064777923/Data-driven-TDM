<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from "vue";
import { getMainlandTourist } from "@/api";
import { ElMessage } from "element-plus";
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

interface TouristPriceData {
  年份: number;
  [key: string]: number;
}

const option = ref<EChartsOption>({});
const macauTouristPrice = reactive({
  data: [
			{
				"年份": 2009,
				"食品煙酒類": 95.9217909,
				"衣履類": 97.55239183,
				"住宿類": 91.1651378,
				"餐飲類": 96.15402128,
				"交通通訊類": 94.90270018,
				"藥物及個人": 99.22642589,
				"娛樂文化類": 99.20819734,
				"雜項物品類": 77.92816102
			},
			{
				"年份": 2010,
				"食品煙酒類": 100.5255623,
				"衣履類": 101.11807309,
				"住宿類": 105.42310898,
				"餐飲類": 100.905223,
				"交通通訊類": 99.96671331,
				"藥物及個人": 100.37004839,
				"娛樂文化類": 99.61446959,
				"雜項物品類": 94.77840078
			},
			{
				"年份": 2011,
				"食品煙酒類": 112.04719676,
				"衣履類": 105.84971513,
				"住宿類": 143.04552197,
				"餐飲類": 112.74810807,
				"交通通訊類": 104.90831101,
				"藥物及個人": 102.59362568,
				"娛樂文化類": 104.50695014,
				"雜項物品類": 113.51141749
			},
			{
				"年份": 2012,
				"食品煙酒類": 120.06669582,
				"衣履類": 116.59884681,
				"住宿類": 142.14376542,
				"餐飲類": 127.38788229,
				"交通通訊類": 110.00114578,
				"藥物及個人": 107.10972257,
				"娛樂文化類": 115.97174871,
				"雜項物品類": 121.05763385
			},
			{
				"年份": 2013,
				"食品煙酒類": 131.05816776,
				"衣履類": 128.8369935,
				"住宿類": 155.9042685,
				"餐飲類": 135.84416225,
				"交通通訊類": 116.27281687,
				"藥物及個人": 113.69348702,
				"娛樂文化類": 123.67443061,
				"雜項物品類": 116.74478071
			},
			{
				"年份": 2014,
				"食品煙酒類": 137.89413056,
				"衣履類": 136.21583323,
				"住宿類": 169.51770018,
				"餐飲類": 144.49139983,
				"交通通訊類": 115.32277333,
				"藥物及個人": 116.8112055,
				"娛樂文化類": 129.48847506,
				"雜項物品類": 116.07831471
			},
			{
				"年份": 2015,
				"食品煙酒類": 144.14486056,
				"衣履類": 133.78501387,
				"住宿類": 157.50845454,
				"餐飲類": 150.29958245,
				"交通通訊類": 117.00096762,
				"藥物及個人": 117.35258062,
				"娛樂文化類": 134.95914151,
				"雜項物品類": 115.04062075
			},
			{
				"年份": 2016,
				"食品煙酒類": 146.89497887,
				"衣履類": 133.21681675,
				"住宿類": 124.12140314,
				"餐飲類": 153.70948528,
				"交通通訊類": 105.51077388,
				"藥物及個人": 116.00239959,
				"娛樂文化類": 133.35345446,
				"雜項物品類": 117.57001396
			},
			{
				"年份": 2017,
				"食品煙酒類": 151.25073744,
				"衣履類": 123.67414905,
				"住宿類": 130.2890885,
				"餐飲類": 161.56886788,
				"交通通訊類": 98.63474769,
				"藥物及個人": 115.76816408,
				"娛樂文化類": 138.05581089,
				"雜項物品類": 115.05598883
			},
			{
				"年份": 2018,
				"食品煙酒類": 157.74301317,
				"衣履類": 119.87415243,
				"住宿類": 137.18767037,
				"餐飲類": 164.29120526,
				"交通通訊類": 101.86155441,
				"藥物及個人": 115.8543501,
				"娛樂文化類": 140.5783023,
				"雜項物品類": 114.10946499
			},
			{
				"年份": 2019,
				"食品煙酒類": 162.21226551,
				"衣履類": 113.50407628,
				"住宿類": 133.75225296,
				"餐飲類": 167.36799633,
				"交通通訊類": 101.33363581,
				"藥物及個人": 117.32180437,
				"娛樂文化類": 145.0390296,
				"雜項物品類": 114.49218572
			},
			{
				"年份": 2020,
				"食品煙酒類": 160.12300635,
				"衣履類": 97.89710188,
				"住宿類": 95.65272372,
				"餐飲類": 164.71976078,
				"交通通訊類": 105.27173199,
				"藥物及個人": 118.69456689,
				"娛樂文化類": 138.3084728,
				"雜項物品類": 119.63192127
			},
			{
				"年份": 2021,
				"食品煙酒類": 160.47105674,
				"衣履類": 97.21898917,
				"住宿類": 67.6410999,
				"餐飲類": 172.33323143,
				"交通通訊類": 97.89834264,
				"藥物及個人": 118.97109734,
				"娛樂文化類": 139.93650528,
				"雜項物品類": 119.30453864
			},
			{
				"年份": 2022,
				"食品煙酒類": 168.67056625,
				"衣履類": 98.21649571,
				"住宿類": 57.14418082,
				"餐飲類": 171.19976017,
				"交通通訊類": 99.41742318,
				"藥物及個人": 123.39253742,
				"娛樂文化類": 172.53579946,
				"雜項物品類": 118.56120821
			},
			{
				"年份": 2023,
				"食品煙酒類": 174.87209855,
				"衣履類": 104.97786753,
				"住宿類": 147.39358926,
				"餐飲類": 174.63142749,
				"交通通訊類": 103.67094757,
				"藥物及個人": 129.06926764,
				"娛樂文化類": 201.51854492,
				"雜項物品類": 122.33246482
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
  const colors = ["#00b3f4", "#00ca95", "#ffde32", "#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed"];

  const columns = Object.keys(macauTouristPrice.data[0]).filter(key => key !== "年份");

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
    years.push(row.年份);
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
        color: (name: string) => {
          const series = option.value.series?.find((s: any) => s.name === name);
          return series ? series.lineStyle.color : "#4ca9ff";
        }
      },
      formatter: (name: string) => {
        return name.length > 6 ? name.slice(0, 6) + "\n" + name.slice(6) : name;
      }
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
        lineStyle: { color: "#00ff7f" },
      },
      splitArea: {
        show: false,
      },
      axisLabel: { color: "#00aa00" },
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
        lineStyle: { color: "#00ff7f" },
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
