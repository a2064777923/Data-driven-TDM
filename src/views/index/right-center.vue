<script setup lang="ts">
import { ref, reactive,onMounted, nextTick } from "vue";
import { getEnterExitMock } from "@/api";
import { ElMessage } from "element-plus";
import * as echarts from 'echarts';

interface GateData{
	出入境人數: number;
	在當年總人數中所佔百分比:string;
}

interface DataStructure {
	[year: string]:{
		[Gate: string]: GateData;
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
	getEnterExitMock().then((res)=>{
		if(res.success){
			console.log("出入境成功:",res.data)
			state.data = res.data;
			setOption();
		}else{
			ElMessage.error(res.msg)
		}
		
	}).catch(err=>{
		ElMessage.error(err)
	});
	
};
//getData();

const setOption = () =>{
	if(!state.data) return;
	const years = Object.keys(state.data); 
	const seriesData:echarts.SeriesOption[] = [];
	const yAxisData:string[] =[]; //y軸打算放分區
	
	const eachGateData: {[key:string] :GateData[]} = {};
	const eachGateNum: {[key:string] :number[]} = {};
	years.forEach((year: string) => {
		const gates = state.data![year];
		yAxisData.push(year);
		gates.forEach(gate =>{
			const [name ,stats] = Object.entries(gate)[0];//雖然只有一項，但取出來的也是個列表
			
			if (!eachGateData[name]){
				eachGateData[name]=[stats]
				eachGateNum[name]=[stats.出入境人數]
			}else{
				eachGateData[name].push(stats)
				eachGateNum[name].push(stats.出入境人數)
			}
		});
				
	});
	Object.keys(eachGateData).forEach(gate =>{
		
		seriesData.push({
			name: gate,
			type:'bar',
			stack:'total',
			label:{
				show:false
			},
			emphasis:{
				focus:'series'
			},
			data: eachGateNum[gate],
			tooltip:{
				formatter:function(params){
					const {name,dataIndex} = params;
					const stats = eachGateData[gate][dataIndex];
					return`
						<div>
							<strong>${gate}</strong><br>
							Enter & Exit Amount: ${stats.出入境人數}<br>
							Percentage: ${stats.在當年總人數中所佔百分比} % <br>
						</div>
					`;
				}
			}
		});
	});
	option.value = {
		textStyle: {
		    fontSize: 7 // 可以根据需要调整字体大小
		},
		tooltip: {
		    trigger: 'item',
		    axisPointer: {
		      // Use axis to trigger tooltip
		      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
		    }
		  },
		toolbox:{
			feature:{
				saveAsImage:{}
			},
			bottom:'50%',
		},
	    legend: {
		  itemWidth: 8, // 设置图例标记的宽度
			itemHeight: 6, // 设置图例标记的高度
			textStyle: {
				fontSize: 8, // 设置图例文字的大小
				color: '#6b7280' // 设置图例文字的颜色
			}
		  },
		  grid: {
		    left: '3%',
		    right: '4%',
		    bottom: '3%',
		    containLabel: true
		  },
		  xAxis: {
		    type: 'value',
			axisLabel:{
				color: "#6b7280"
			}
		  },
		  yAxis: {
		    type: 'category',
		    data: yAxisData,
			axisLabel:{
				color: "#6b7280"
			}
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

 const myChart = ref(null)
 onMounted(
	async () => {

		await nextTick()
		// 渲染echarts的父元素
		let infoEl = myChart.value;
		setTimeout(()=>{
			getData();
		}, 1);
		myChart.value.setOption(option.value);
	}
 )

</script>

<template>
  <v-chart
    id="mainland"
    class="chart"
    :option="option"
	ref= "myChart"
  />
</template>

<style scoped lang="scss">
</style>