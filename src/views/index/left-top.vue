<script setup lang="ts">
import { reactive, ref, onMounted, nextTick, onUnmounted } from "vue";
import { getMainlandTourist } from "@/api";
import CountUp from "@/components/count-up";
import {ElMessage} from "element-plus"
import * as echarts from 'echarts';
import {graphic} from "echarts/core"
import { stubTrue } from "lodash-es";

//type EChartsOption = echarts.EChartsOption;
//const option = ref({});
interface ProvinceStats{
	總人數: number;
	最多人月份:string;
	最少人月份:string;
	均值: number;
	中位數:number;
	方差:number;
	以月份排人數列表:number[];
	
}

interface DataStructure {
	[district: string]:{
		[province: string]: ProvinceStats;
	}[];
}
const option = ref<echarts.EChartsOption>({});
const state = reactive<{
	data:DataStructure | null;
}>({
	data : null,
});



//var option: echarts.EChartsOption;
const getData = () =>{
	getMainlandTourist().then((res)=>{
		
		if(res.success){
			console.log("遊客成功:"+ res.data)
			state.data = res.data;
			setTimeout(()=>{
			    setOption();
			},10)
			
		}else{
			ElMessage.error(res.msg)
			setTimeout(()=>{
				getData();
			},100)
			
		}
	}).catch(err=>{
		ElMessage.error(err)
	});
	
};
getData();

const setOption = () =>{
    if(!state.data) return;
    const districts = Object.keys(state.data);
    const seriesData: echarts.SeriesOption[] = [];
    const yAxisData: string[] = []; // y轴放置分区
    const bubbleData: any[] = [];
	const eachProvinceData: {[key:string] :ProvinceStats[]} = {};
	const eachProvinceNum: {[key:string] :number[]} = {};
	const colorMap:any={};
	const colors=["#aa55ff", "#ff5500", "#aa5500", "#aa557f", "#55aa00", "#5555ff"];
    
    districts.forEach((district: string) => {
        const provinces = state.data![district];
        yAxisData.push(district);
        
        provinces.forEach((provinceData,index:number) => {
            const [province, stats] = Object.entries(provinceData)[0];
            
			if(!colorMap[province]){
				colorMap[province] = colors[index % colors.length];
			}
			
			if (!eachProvinceData[province]){
				eachProvinceData[province]=[stats]
				eachProvinceNum[province]=[stats.總人數]
			}else{
				eachProvinceData[province].push(stats)
				eachProvinceNum[province].push(stats.總人數)
			}
			bubbleData.push({
                name: province,
                value: [
                    Math.floor(stats.均值),  // x轴：均值
                    yAxisData.indexOf(district),  // y轴：分区
                    stats.總人數,  // 气泡大小
                    stats.方差,  // 颜色或额外信息
					stats.最多人月份,
					stats.最少人月份,
                ]
            });
			
        });
    });
	
	Object.keys(eachProvinceData).forEach(province =>{
		seriesData.push({
		    name: province,
		    type: 'scatter',
		    symbolSize: function(data: any) {
		        return Math.cbrt(data[2]) / 10; // 控制气泡大小
		    },
		    label: {
		            show: true,
		            formatter: function(param: any) {
		                return param.data.name;
		            },
		            position: 'top'
		        },
		        emphasis: {
		            label: {
		                show: true
		            }
		        },
		    data: bubbleData.filter(item => item.name === province).map(item => item.value),//用filter提取項
			itemStyle:{
				color: colorMap[province]//根據省份名獲取顏色
			}
		});
		
	});

    

    option.value = {
		textStyle: {
		    fontSize: 7 // 可以根据需要调整字体大小
		},
		grid:{
			bottom: 25,
		},
        tooltip: {
            trigger: 'item',
            formatter: function(params: any) {
                const { seriesName, value } = params;
                const district = yAxisData[value[1]];
                return `
                    <div>
                        <strong>${seriesName}</strong><br>
                        District: ${district}<br>
                        Mean: ${value[0]}<br>
                        Total People: ${value[2]}<br>
                        Variance: ${value[3]}<br>
						Most people month: ${value[4]}<br>
						Less people month: ${value[5]}<br>
                    </div>
                `;
            }
        },
        legend: {
			data: Object.keys(colorMap),
			textStyle:{
				color: '#0BFC7F'
			}
		},
        xAxis: {
            type: 'value',
            name: 'Mean',
			axisLabel:{
				color: "#55aa7f"
			}
        },
        yAxis: {
            type: 'category',
            data: yAxisData,
            name: 'District',
			axisLabel:{
				formatter:function(value: string){
					return value.charAt(0)+value.charAt(1);
				},
				color: "#55aa7f"
			}
        },
        series: seriesData
    };
	//console.log(option.value)
};
	
 const myChart = ref()
 onMounted(
	async () => {
		await nextTick()
		// 渲染echarts的父元素
		var infoEl = myChart.value
	}
 )
 //setOption();


</script>

<template>
  <v-chart
    id="mainland"
    class="chart"
    :option="option"
	v-if="JSON.stringify(option) != '{}'"
  />
</template>

<style scoped lang="scss">

</style>
