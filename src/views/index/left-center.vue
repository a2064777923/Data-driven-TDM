<script setup lang="ts">
import { ref, reactive } from "vue";
import { graphic } from "echarts/core";
import { countUserNum, hotelCount } from "@/api";
import {ElMessage} from "element-plus"

let colors = ["#aa55ff", "#ff5500", "#aa5500", "#aa557f"];
const option = ref({});
const state = reactive({
  twoStarHotelNum: 0,
  threeStarApartmentHotelNum: 0,
  threeStarHotel: 0,
  fourStarApartmentHotel: 0,
  fourStarHotel:0,
  fiveStarDeluxeHotel: 0,
  fiveStarHotel: 0,
  economicalAccommodationEstablishments: 0,
  totalNum: 0,
});
const echartsGraphic = (colors: string[]) => {
  return new graphic.LinearGradient(1, 0, 0, 0, [
    { offset: 0, color: colors[0] },
    { offset: 1, color: colors[1] },
  ]);
};
//請求獲取參數的函數
const getData = () => {
  hotelCount().then((res) => {
    console.log("左中--酒店總覽",res);
    if (res.success) {
      state.twoStarHotelNum = res.data["2-star Hotel"];
      state.threeStarApartmentHotelNum = res.data["3-star Apartment Hotel"];
      state.threeStarHotel = res.data["3-star Hotel"];
	  state.fourStarApartmentHotel = res.data["4-star Apartment Hotel"];
	  state.fourStarHotel = res.data["4-star Hotel"];
	  state.fiveStarDeluxeHotel = res.data["5-star Deluxe Hotel"];
	  state.fiveStarHotel = res.data["5-star Hotel"];
      state.totalNum = res.data["total"];
      setOption();
	  console.log("getdata"+ state)
    }else{
      ElMessage.error(res.msg)
    }
  }).catch(err=>{
    ElMessage.error(err)
  });
};
getData();
const setOption = () => {
  option.value = {
    title: {
      top: "center",
      left: "center",
      text: [`{value|${state.totalNum}}`, "{name|Total}"].join("\n"),
      textStyle: {
        rich: {
          value: {
            color: "#ffffff",
            fontSize: 24,
            fontWeight: "bold",
            lineHeight: 20,
            padding:[4,0,4,0]
          },
          name: {
            color: "#ffffff",
            lineHeight: 20,
          },
        },
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
    },
    series: [
      {
        name: "Hotel Overview",
        type: "pie",
        radius: ["40%", "70%"],
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: "rgba(255,255,255,0)",
          borderWidth: 2,
        },
        color: colors,
        label: {
          show: true,
          formatter: "   {b|{b}}   \n   {c|{c}个}   {per|{d}%}  ",
          //   position: "outside",
          rich: {
            b: {
              color: "#fff",
              fontSize: 12,
              lineHeight: 26,
            },
            c: {
              color: "#b0d021",
              fontSize: 14,
            },
            per: {
              color: "#8cb41d",
              fontSize: 14,
            },
          },
        },
        emphasis: {
          show: false,
        },
        legend: {
          show: false,
        },
        tooltip: { show: true },

        labelLine: {
          show: true,
          length: 20, // 第一段线 长度
          length2: 36, // 第二段线 长度
          smooth: 0.2,
          lineStyle: {},
        },
        data: [
          {
            value: state.twoStarHotelNum,
            name: "2-star",
            itemStyle: {
              color: echartsGraphic(["#0BFC7F", "#A3FDE0"]),
            },
          },
          {
            value: state.threeStarApartmentHotelNum,
            name: "3-star Apartment",
            itemStyle: {
              color: echartsGraphic(["#aa55ff", "#aa557f"]),
            },
          },
          {
            value: state.threeStarHotel,
            name: "3-star",
            itemStyle: {
              color: echartsGraphic(["#F48C02", "#FDDB7D"]),
            },
          },
          {
            value: state.fourStarHotel,
            name: "4-star",
            itemStyle: {
              color: echartsGraphic(["#ff5500", "#aa5500"]),
            },
          },
		  {
		    value: state.fourStarApartmentHotel,
		    name: "4-star Apartment",
		    itemStyle: {
		      color: echartsGraphic(["#aa5500", "#aa557f"]),
		    },
		  },
		  {
		    value: state.fiveStarDeluxeHotel,
		    name: "5-star Deluxe",
		    itemStyle: {
		      color: echartsGraphic(["#aa55ff", "#FB6CB7"]),
		    },
		  },
		  {
		    value: state.fiveStarHotel,
		    name: "5-star",
		    itemStyle: {
		      color: echartsGraphic(["#ff5500", "#FB6CB7"]),
		    },
		  },
        ],
      },
    ],
  };
};
</script>

<template>
  <v-chart class="chart" :option="option" />
</template>

<style scoped lang="scss"></style>
