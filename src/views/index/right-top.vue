<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { getAverageStayTime } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";
import { usePopoverStore } from '@/stores/piniaStore';
import * as echarts from 'echarts';
const popoverStore = usePopoverStore();

const option = ref({});
const stayChart = ref(null);
let myChart = null;

const getData = async () => {
  getAverageStayTime()
    .then((res) => {
      console.log("右上--旅客平均逗留時間 ", res);
      if (res.success) {
        setOption(res.data.dateList, res.data.numList1, res.data.numList2);
      } else {
        ElMessage({
          message: res.msg,
          type: "warning",
        });
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};
const initChart = () =>{
	myChart = echarts.init(stayChart.value);
	getData();
	myChart.setOption(option.value);
}
const setOption = async (xData: any[], yData: any[], yData2: any[]) => {
  option.value = {
	  title: {
	    text: ' Visitors Average Stay',
	    top: '0%',
	    left: 'center',
	    textStyle: {
	      fontSize: 10,
	      fontWeight: 'bold',
	  		  color:'#ec9d00'
	    }
	  },
    xAxis: {
      type: "category",
      data: xData,
      boundaryGap: false, // 不留白，从原点开始
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(31,99,163,.2)",
        },
      },
      axisLine: {
        // show:false,
        lineStyle: {
          color: "rgba(31,99,163,.1)",
        },
      },
      axisLabel: {
        color: "#7EB7FD",
        fontWeight: "500",
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(31,99,163,.2)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(31,99,163,.1)",
        },
      },
      axisLabel: {
        color: "#7EB7FD",
        fontWeight: "500",
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
    },
    grid: {
      //布局
      show: true,
      left: "10px",
      right: "30px",
      bottom: "10px",
      top: "32px",
      containLabel: true,
      borderColor: "#1F63A3",
    },
    series: [
      {
        data: yData,
        type: "line",
        smooth: true,
        symbol: "none", //去除点
        name: "Average Stay Time",
        color: "rgba(252,144,16,.7)",
        areaStyle: {
          //右，下，左，上
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(252,144,16,.7)",
              },
              {
                offset: 1,
                color: "rgba(252,144,16,.0)",
              },
            ],
            false
          ),
        },
        markPoint: {
          data: [
            {
              name: "Max",
              type: "max",
              valueDim: "y",
              symbol: "rect",
              symbolSize: [60, 26],
              symbolOffset: [0, -20],
              itemStyle: {
                color: "rgba(0,0,0,0)",
              },
              label: {
                color: "#FC9010",
                backgroundColor: "rgba(252,144,16,0.1)",
                borderRadius: 6,
                padding: [7, 14],
                borderWidth: 0.5,
                borderColor: "rgba(252,144,16,.5)",
                formatter: "Stay Time:：{c} days",
              },
            },
            {
              name: "Max",
              type: "max",
              valueDim: "y",
              symbol: "circle",
              symbolSize: 6,
              itemStyle: {
                color: "#FC9010",
                shadowColor: "#FC9010",
                shadowBlur: 8,
              },
              label: {
                formatter: "",
              },
            },
          ],
        },
      },
      {
        data: yData2,
        type: "line",
        smooth: true,
        symbol: "none", //去除点
        name: "隨機放的數據，感覺兩條線好看點",
        color: "rgba(9,202,243,.7)",
        areaStyle: {
          //右，下，左，上
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(9,202,243,.7)",
              },
              {
                offset: 1,
                color: "rgba(9,202,243,.0)",
              },
            ],
            false
          ),
        },
        markPoint: {
          data: [
            {
              name: "Max",
              type: "max",
              valueDim: "y",
              symbol: "rect",
              symbolSize: [60, 26],
              symbolOffset: [0, -20],
              itemStyle: {
                color: "rgba(0,0,0,0)",
              },
              label: {
                color: "#09CAF3",
                backgroundColor: "rgba(9,202,243,0.1)",

                borderRadius: 6,
                borderColor: "rgba(9,202,243,.5)",
                padding: [7, 14],
                formatter: "阿巴阿巴：{c}",
                borderWidth: 0.5,
              },
            },
            {
              name: "Max",
              type: "max",
              valueDim: "y",
              symbol: "circle",
              symbolSize: 6,
              itemStyle: {
                color: "#09CAF3",
                shadowColor: "#09CAF3",
                shadowBlur: 8,
              },
              label: {
                formatter: "",
              },
            },
          ],
        },
      },
    ],
  };
};
onMounted(() => {
	initChart();
});
onUnmounted(()=>{
	if(myChart){
		myChart.dispose();
	}
});
const handlePopoverOpen = () => {
  //await nextTick();
  //myChart = echarts.init(chartDom.value);
  if (!stayChart.value) {
     console.error('chartDom is not ready');
     return;
   }
   // Initialize the echarts instance on the prepared DOM element
   //myChart = echarts.init(stayChart.value);
   // Optionally, you can clear any existing options before setting new ones
   //myChart.clear();
   getData();
   // Set the chart option
   myChart.setOption(option.value);
 
   console.log('Popover opened and chart initialized');
}

// 监听 isPopoverOpen 的变化
watch(() => popoverStore.isPopoverOpen,  (newValue) => {
  if (newValue) {
    // Delay initialization to ensure all transitions are complete
      handlePopoverOpen();
  }
});


</script>

<template>
  <div class="chart" ref="stayChart" />
</template>

<style scoped lang="scss">
	.chart{
		height: 250px;
		width: 450px;
	}
</style>
