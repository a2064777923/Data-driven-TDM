<template>
  <div id="app" class="h-full">
    <div id="container" ref="globalChart" class="h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
//import ECharts from "vue-echarts";
import * as world from './world.json'; 
const globalChart = ref(null);
let myChart = null;
const options = ref({});
// 澳门的经纬度
let macauCoord = [113.543028, 22.186835];

// 大洲的经纬度
let geoCoordMap = {
    Asia: [100.619655, 34.047863],
    Europe: [10.451526, 51.165691],
    Africa: [21.09375, 7.1881],
    NorthAmerica: [-100.0, 40.0],
    SouthAmerica: [-58.4173, -23.533773],
    Oceania: [133.775136, -25.274398],
};

const convertData = (data) => {
    return data.map(dataItem => {
        const fromCoord = geoCoordMap[dataItem.name];
        const toCoord = macauCoord;
        return fromCoord && toCoord ? {
            fromName: dataItem.name,
            toName: "Macau",
            coords: [fromCoord, toCoord],
        } : null;
    }).filter(item => item);
};

const getOption = () => {
    let series = [];
    [
        ["Asia", geoCoordMap["Asia"]],
        ["Europe", geoCoordMap["Europe"]],
        ["Africa", geoCoordMap["Africa"]],
        ["NorthAmerica", geoCoordMap["NorthAmerica"]],
        ["SouthAmerica", geoCoordMap["SouthAmerica"]],
        ["Oceania", geoCoordMap["Oceania"]],
    ].forEach(item => {
        series.push(
            {
                name: item[0] + " to Macau",
                type: "lines",
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: "#fff",
                    symbolSize: 3,
                },
                lineStyle: {
                    normal: {
                        color: "#a6c84c",
                        width: 0,
                        curveness: 0.2,
                    },
                },
                data: convertData([{ name: item[0] }]),
            },
            {
                name: item[0] + " to Macau",
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    brushType: "stroke",
                },
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        formatter: "{b}",
                    },
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: "#a6c84c",
                    },
                },
                data: [{
                    name: item[0],
                    value: geoCoordMap[item[0]].concat([100]),
                }],
            }
        );
    });

    // 高亮澳门
    series.push({
        name: "Macau",
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
            brushType: "stroke",
        },
        label: {
            normal: {
                show: true,
                position: "right",
                formatter: "{b}",
                color: "#3399ff",
            },
        },
        symbolSize: 12,
        itemStyle: {
            normal: {
                color: "#3399ff",
            },
        },
        data: [{
            name: "Macau",
            value: macauCoord.concat([200]),
        }],
    });

    // 配置和数据
    options.value = {
        backgroundColor: "#404a59",
        title: {
            text: "World Map and Arrows",
            left: "center",
            textStyle: {
                color: "#fff",
            },
        },
        tooltip: {
            trigger: "item",
        },
        geo: {
            map: "world",
            label: {
                emphasis: {
                    show: false,
                },
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: "#323c48",
                    borderColor: "#111",
                },
                emphasis: {
                    areaColor: "#2a333d",
                },
            },
        },
        series: series,
    };
};

onMounted(() => {
    myChart = echarts.init(globalChart.value);
	echarts.registerMap('world', world);
    getOption();
    myChart.setOption(options.value);
});
</script>

<style scoped>
body {
  height: 100%;
  width: 500px;
  margin: 0;
}
</style>
