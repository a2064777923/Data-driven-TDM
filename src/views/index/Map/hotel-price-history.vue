<script setup lang="ts">
import { ref, onMounted, onUnmounted} from "vue";
import { getHotelPriceHistory } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";
import * as echarts from 'echarts';

const option = ref({});
const hotelChart = ref(null);
let myChart = null;

const getData = async () => {
  getHotelPriceHistory()
    .then((res) => {
      console.log("酒店價格歷史 ", res);
	  console.log(res)
      if (res.success) {
        setOption(res.data.month, res.data.average, res.data.five_star, res.data.four_star, res.data.three_star);
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
	myChart = echarts.init(hotelChart.value);
	getData();
	setTimeout(()=>{
		myChart.setOption(option.value);
	},2000);
	
}
const setOption = async (xData: any[], yData: any[], yData2: any[],yData3: number[], yData4: number[]) => {
  option.value = {
	  title: {
	    text: ' Hotel History Price',
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
        name: "Average hotel price",
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
                formatter: "{c}",
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
        name: "Five star hotel price",
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
                //formatter: "阿巴阿巴：{c}",
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
	  {
		  
		    data: yData3,
		    type: "line",
		    smooth: true,
		    symbol: "none", //去除点
		    name: "four star hotel price",
		    color: "rgba(72, 217, 0, 0.7)",
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
		            color: "rgba(68, 205, 0, 0.7)",
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
		            color: "#55ff00",
		            backgroundColor: "rgba(85, 255, 0, 0.1)",
		  
		            borderRadius: 6,
		            borderColor: "rgba(85, 255, 0,.5)",
		            padding: [7, 14],
		            //formatter: "阿巴阿巴：{c}",
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
		            color: "#55ff00",
		            shadowColor: "#55ff00",
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
			data: yData4,
			type: "line",
			smooth: true,
			symbol: "none", //去除点
			name: "three star hotel price",
			color: "rgba(170, 170, 255, 0.7)",
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
					color: "rgba(170, 170, 255, 0.7)",
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
					color: "#aaaaff",
					backgroundColor: "rgba(170, 170, 255, 0.1)",
		  
					borderRadius: 6,
					borderColor: "rgba(170, 170, 255, 0.5)",
					padding: [7, 14],
					//formatter: "阿巴阿巴：{c}",
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
					color: "#aaaaff",
					shadowColor: "#aaaaff",
					shadowBlur: 8,
				  },
				  label: {
					formatter: "",
				  },
				},
			  ],
			},
	  }
    ],
  };
  myChart.setOption(option.value)
};
onMounted(() => {
	initChart();
});
onUnmounted(()=>{
	if(myChart){
		myChart.dispose();
	}
});



</script>

<template>
  <div class="chart" ref="hotelChart" />
</template>

<style scoped lang="scss">
	.chart{
		height: 300px;
		width: 600px;
	}
</style>
