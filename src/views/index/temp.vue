<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { getMainlandTourist } from "@/api";
import CountUp from "@/components/count-up";
import {ElMessage} from "element-plus"
import * as echarts from 'echarts';
import {graphic} from "echarts/core"
import { stubTrue } from "lodash-es";
import { Dictionary, List } from "lodash";

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
			setOption();
		}else{
			ElMessage.error(res.msg)
		}
	}).catch(err=>{
		ElMessage.error(err)
	});
	
};
getData();

const setOption = () =>{
	if(!state.data) return;
	const districts = Object.keys(state.data); //本來想省份名都是不固定不能寫死了，索性就都不弄映射了，用循環取，結果用的是typescript，沒辨法
	const seriesData:echarts.SeriesOption[] = [];
	const yAxisData:string[] =[]; //y軸打算放分區
	
	const eachProvinceData: {[key:string] :ProvinceStats[]} = {};
	const eachProvinceNum: {[key:string] :number[]} = {};
	districts.forEach((district: string) => {
		const provinces = state.data![district];
		yAxisData.push(district);
		
		provinces.forEach(provinceData =>{
			const [province ,stats] = Object.entries(provinceData)[0];//雖然只有一項，但取出來的也是個列表
			if (!eachProvinceData[province]){
				eachProvinceData[province]=[stats]
				eachProvinceNum[province]=[stats.總人數]
			}else{
				eachProvinceData[province].push(stats)
				eachProvinceNum[province].push(stats.總人數)
			}
		});
				
	});
	Object.keys(eachProvinceData).forEach(province =>{
		seriesData.push({
			name: province,
			type:'bar',
			stack:'total',
			label:{
				show:true
			},
			emphasis:{
				focus:'series'
			},
			data: eachProvinceNum[province],
			tooltip:{
				formatter:function(params){
					const {name,dataIndex} = params;
					const stats = eachProvinceData[province][dataIndex];
					return`
						<div>
							<strong>${province}</strong><br>
							Most people month: ${stats.最多人月份}<br>
							Less people month: ${stats.最少人月份}<br>
							Mean: ${stats.最少人月份}<br>
							Median: ${stats.中位數}<br>
							Variance: ${stats.方差}<br>
							<br>Monthly data:<br>
							${stats.以月份排人數列表.map((value: any,index: number)=>`月${index + 1}: ${value}`).join(`<br>`)}
						</div>
					`;
				}
			}
		});
	});
	option.value = {
		tooltip: {
		    trigger: 'item',
		    axisPointer: {
		      // Use axis to trigger tooltip
		      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
		    }
		  },
		  legend: {},
		  grid: {
		    left: '3%',
		    right: '4%',
		    bottom: '3%',
		    containLabel: true
		  },
		  xAxis: {
		    type: 'value'
		  },
		  yAxis: {
		    type: 'category',
		    data: yAxisData
		  },
		  series: seriesData
		};
		
	};
	
 /**
	onMounted(() => {
	  const chartDom = document.getElementById('mainland');
	  if (chartDom) {
	    const myChart = echarts.init(chartDom);
	    myChart.setOption(option.value);
	  }
	});
*/

setOption();

</script>

<template>
  <v-chart
    id="mainland"
    class="chart"
    :option="option"
  />
</template>

<style scoped lang="scss">

</style>
