<template>
	<div class="container">
		<div v-if="loading" class="progress-alert-container">
		<el-progress
		v-if="loading"
		class = "progress"
		type="circle"
		:percentage="crawlProgress"
		:status="progressStatus"/>
		
			<el-alert
			  v-if="progressStatus === 'warning'"
			  title="Error fetching hotel info"
			  type="error"
			  center show-icon>
			</el-alert>
			<el-alert
			  v-if="progressStatus === ''"
			  title="Crawling hotel information..."
			  type="info"
			  center show-icon>
			</el-alert>
			<el-alert
			  v-if="progressStatus === 'succcess'"
			  title="Got it!"
			  type="success"
			  center show-icon>
			</el-alert>
		</div>
		<transition name="fade">
			<div v-if="showData">
				<div style="width:850px;height:700px; margin-bottom: 20px; background-color: #eef7ff;">
					<div ref="graphDom" style="width: 100%; height: 700px;"></div>
				</div>
				
				<div class="hotel-info">
					<el-card class="full-width-card" v-if="hotelData">
					      <h2>{{ hotelData.fullName }}</h2>
					      <p>{{ hotelData.description }}</p>
					</el-card>
					
					<div class="card-row">
					      <el-card class="half-width-card">
					        <div class="score-section">
					          <a-star-filled/> 
					          <span class="score">{{ hotelData.score }}</span>
					        </div>
					        <div>
					          <a-message />
					          <span>{{ hotelData.reviewCount }}</span>
					        </div>
					        <div>
					          <a-like />
					          <span>{{ hotelData.reviews }}</span>
					        </div>
					      </el-card>
					      <el-card class="half-width-card">
					        <!-- 空卡片放置其他内容 -->
					      </el-card>
					</div>
					<el-card class="full-width-card">
					      <HotelPriceHistory class="price-chart"></HotelPriceHistory>
					</el-card>
						
					<div class="card-row">
					      <el-card class="half-width-card">
					        <h3>Room Price</h3>
					        <ul>
					          <li v-for="(price, index) in parsedPrices" :key="index">
					            <a-bank />
					            {{ price.name }}: {{ price.price }}
					          </li>
					        </ul>
					      </el-card>
					      <el-card class="half-width-card">
					        <h3>Price Comparison</h3>
					        <div v-for="comparison in priceComparisons" :key="comparison.label">
					          <a-arrow-up :style="{color:comparison.color}" v-if="comparison.change[0] === '↑'" />
							  <a-arrow-up :style="{color:comparison.color}" v-if="comparison.change[0] === '↓'" />
	
					          {{ comparison.label }}: <span :style="{ color: comparison.color }">{{ comparison.value }}</span> ({{ comparison.change }})
					        </div>
					      </el-card>
					</div>
				</div>
			</div>
		
			<el-empty v-else-if="empty" description="Can't found this hotel's information"/>
		</transition>
	</div>
</template>

<script>
import axios from 'axios';
import { random } from 'lodash-es';
import {onMounted,onUnmounted,ref,computed} from 'vue';
import { getHotelMapDetail } from '@/api';
import * as echarts from 'echarts';
import { 
  StarFilled as AStarFilled, 
  LikeFilled as ALike, 
  MessageFilled as AMessage, 
  BankFilled as ABank, 
  ArrowUpOutlined as AArrowUp, 
  ArrowDownOutlined as AArrowDown 
} from '@ant-design/icons-vue';
import HotelPriceHistory from './hotel-price-history.vue';
export default {
  props: ['hotelName'],
  data() {
    return {
      hotelInfo: null,
	  chartInstance: null,
    };
  },
components: {
    HotelPriceHistory,
	AStarFilled,
	ALike,
	AMessage,
	ABank,
	AArrowUp,
	AArrowDown
},
  setup(props){
	  const crawlProgress = ref(0);
	  const progressStatus = ref('');
	  const loading = ref(true);
	  const showData = ref(false);
	  const empty = ref(false);
	  let startTime = 0;
	  const hotelReviewInfo = ref(null);
	  const hotelData = ref(null)
	  const graphDom = ref(null);
	  let myGraph = null;
	  
	  let graphData = null;


	    const getChartData = () => {
			console.log(hotelReviewInfo.value);
	         return hotelReviewInfo.value;
	    };
		  
   const setChartOption = () => {
	     if (!graphData) {
		     graphData = getGraphData(); 
	     };
         const option = {
			 title: {
			   text: 'Hotel Comments Analyze',
			   textStyle:{
				   color : '#000000'
			   },
			   top: 'top',
			   left: 'center'
			 },
           tooltip: { formatter: (params) => {
				if (params.dataType === 'node') {
				  return params.data.info || params.data.name;
				}
		   }},
		   legend: {
				data: [
					{ name: 'positive',itemStyle:{color:'#00aa7f'}, textStyle: { color: '#55aa7f' } }, // 绿色
					{ name: 'negative', itemStyle:{color:'#aa0000'}, textStyle: { color: '#aa0000' } }  // 红色
				],
				orient: 'horizontal',
				top: 'bottom',
				left: 'center'
			},
			
			animationDuration: 1500,
			animationEasingUpdate: 'quinticInOut',
		   
           series: [
             {
               type: 'graph',
               layout: 'force',
               data: graphData.nodes.filter(node => !node.hidden ),
               links: graphData.links.filter(link => !link.hidden),
			   symbolSize: 30,
               roam: true,
			   categories:[{"name": "positive"},{"name":"negative"}],
			   draggable: true,
               label: {
                 show: true,
                 formatter: '{b}'
               },
			   force: {
			        edgeLength: [50,200],
			        repulsion: 100,
			        gravity: 0.1,
			    },
               lineStyle: { color: 'target' },
               emphasis: { 
				   focus: 'adjacency',
				  lineStyle: {
					width: 10
				  },
				},
			   
             }
           ]
         };
         if (myGraph) {
           myGraph.setOption(option);
         }
		 
		 myGraph.on('click', (params) => {
			 if (params.dataType === 'node') {
				 expandNode(params.data.id);
			 }
		 });
       };

	
	    const getGraphData = () => {
			   const baseNodes = [
				  { id: 'hotel', name: getChartData().hotelName, itemStyle:{color :'#2f0000'},symbolSize: 40},
				  { id: 'evalLevel', name: "Evaluation level" ,itemStyle:{color :'#550000'},symbolSize: 30},
				  { id: 'evalAspect', name: "Evaluation aspect",itemStyle:{color :'#550000'},symbolSize: 30},
			   ];
		 
			   const adjectiveNodes = getChartData().adjectives.map((adj,index) => ({
				 id: `adj-${index}`,
				 name: adj.name,
				 value: adj.count,
				 info: `Count: ${adj.count}`,
				 category:adj.senti,
				 itemStyle: { color: getColor(adj.senti) },
				 symbolSize:adj.count,
				 hidden: true
			   }));
		 
			   const nounNodes = getChartData().nouns.map((noun,index) => ({
				 id: `noun-${index}`,
				 name: noun.name,
				 itemStyle: { color: '#00bfff' },
				 hidden: true
			   }));
		 
			   const reviewNodes = getChartData().nouns.flatMap((noun,nounIndex) =>
				 noun.reviews.map((review,reviewIndex) => ({
				   id: `review-${nounIndex}-${reviewIndex}`,
				   name: review.comment.length > 15 ? review.comment.substring(0, 15) + '...' : review.comment,
				   category: review.senti,
				   info: `Commenter:${review.info.commenter}<br>
				          Region:${review.info.region}<br>
						  Room night:${review.info.room_night}<br>
						  Members:${review.info.members}<br>
						  Score: ${review.info.score}<br>
						  Comment: ${review.comment}`,
				   itemStyle: { color: getColor(review.senti) },
				   hidden: true
				 }))
			   );
				
				graphData = {
				   nodes: baseNodes.concat(adjectiveNodes, nounNodes, reviewNodes),
				   links: getGraphLinks()
			   };
			   return graphData;
		};
	    
		const getGraphLinks = () => {

		  const levelLinks = getChartData().adjectives.map((adj, index) => ({
			source: 'evalLevel',
			target: `adj-${index}`,
			category: adj.senti,
			lineStyle:{color: getColor(adj.senti)},
			hidden: true
		  }));

		  const aspectLinks = getChartData().nouns.map((noun, index) => ({
			source: 'evalAspect',
			target: `noun-${index}` ,
			hidden: true
		  }));

		  const reviewLinks = getChartData().nouns.flatMap((noun, nounIndex) =>
			noun.reviews.map((review, reviewIndex) => ({
			  source: `noun-${nounIndex}`,  
			  target: `review-${nounIndex}-${reviewIndex}`,
			  category: review.senti,
			  lineStyle:{color: getColor(review.senti)},
			  hidden: true
			}))
		  );

		  return [
			{ source: 'hotel', target: 'evalLevel' },
			{ source: 'hotel', target: 'evalAspect' },
			...levelLinks,
			...aspectLinks,
			...reviewLinks
		  ];
		};

	    const getColor = (senti) => {
	        return senti === 'positive' ? '#00aa7f' : '#aa0000';
	    };
	    const showReviews= (noun) =>{
	      const reviews = noun.reviews.map(review => `${review.senti === 'positive' ? '😊' : '😡'} ${review.comment}`).join('<br/>');
	      alert(`Reviews for ${noun.name}:\n${reviews}`);
	    };
		
		const expandNode = (nodeId) => {
		    //const option = myGraph.getOption();
		    //let nodes = graphData.data;
		    //let links = graphData.links;
		
		    // Reveal nodes and links connected to the clicked node
		    graphData.links.forEach(link => {
		        if (link.source === nodeId || link.target === nodeId) {
		            link.hidden = false;
		            graphData.nodes.forEach(node => {
		                if (node.id === link.target || node.id === link.source) {
		                    node.hidden = false;
		                }
		            });
		        }
		    });
		
		    // Update the chart with the new data
		    setChartOption();
		};
	  
	  const fetchHotelInfo = async () => {
		try {
			getHotelMapDetail({'hotelName':props.hotelName}).then((res)=>{
				console.log(res)
				if (res.success === false) {
					progressStatus.value = 'error';
					empty.value = true;
					loading.value = false;
				
				} else {
					hotelReviewInfo.value = res.data.hotelReviews;//res.data;
					hotelData.value = res.data.hotelDetail;
					setTimeout(() => {
					  crawlProgress.value = 100;
					  progressStatus.value = 'success';
					  loading.value = false;
					  showData.value = true;
					}, Math.max(0, 10000 - (Date.now() - startTime)));
				}
				
			})

		} catch (error) {
		  console.error('Error fetching hotel info:', error);
		  crawlProgress.value = 100;
		  progressStatus.value = 'warning';
		  //loading.value = false;
		}
	  };
		  
		  const resetState = () => {
			crawlProgress.value = 0;
			progressStatus.value = '';
			loading.value = true;
			showData.value = false;
			empty.value = false;
		  };
		  
		 const handleAlertClose = () => {
			// 在关闭 alert 时执行的逻辑
			resetState(); // 例如, 在这里可以重置组件状态
		  };

		  onMounted(() => {
			resetState();
			startTime = Date.now();
			setTimeout(()=>{
				fetchHotelInfo()
			},2000);

			const interval = setInterval(() => {
			  if (crawlProgress.value < 100) {
				crawlProgress.value += 10;
			  } else {
				clearInterval(interval);
				myGraph = echarts.init(graphDom.value);
				setChartOption();
			  }
			}, 1000);
		  });
		  
		  onUnmounted(() =>{
			  resetState();
		  })
		  
		  
		  
		  
		  
		
		const parsedPrices = computed(() => {
		      return JSON.parse(hotelData.value.prices.replace(/'/g, '"')).map(price => ({
		        ...price,
		        price: parseInt(price.price.replace('HK$', '').replace(',', ''))
		      }));
		    });
		
		 const priceComparisons = computed(() => {
			  const currentLowestPrice = Math.min(...parsedPrices.value.map(p => p.price));
			  const comparisons = [
				{
				  label: '上年同期价格',
				  value: hotelData.value.sameStandandPriceLastYearThisMonth,
				  change: '',
				  color: ''
				},
				{
				  label: '上年平均价格',
				  value: hotelData.value.averagePriceLastYearThisMonth,
				  change: '',
				  color: ''
				},
				{
				  label: '历史最低价格',
				  value: hotelData.value.sameStandandPriceOverHistory,
				  change: '',
				  color: ''
				},
			  ];
		
			  comparisons.forEach(comp => {
				const change = ((currentLowestPrice - comp.value) / comp.value * 100).toFixed(2);
				comp.change = change > 0 ? `↑ ${change}%` : `↓ ${Math.abs(change)}%`;
				comp.color = change > 0 ? 'red' : 'green';
			  });
	
		      return comparisons;
		    });
		

	  return {
		crawlProgress,
		progressStatus,
		loading,
		showData,
		empty,
		handleAlertClose,
		graphDom,
		hotelData, 
		parsedPrices, 
		priceComparisons
	  };
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active{
	transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to{
	opacity: 0;
}
.container{
	margin:30px;
	display:flex;
	justify-content: center;

}
.progress{
	margin-left:50px;
	margin-right:50px;
}
.progress-alert-container{
	margin-top: 20px;
	margin-bottom: 20px;
	display: flex; /* 水平排列进度条和警告 */
	align-items: center; /* 垂直居中 */
}
.price-chart{
	height: 350px;
	width: 700px;
}

.hotel-info {
  padding: 20px;
  margin-right: 65px;
}

.full-width-card {
  margin-bottom: 20px;
  width: 100%;
}

.card-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.half-width-card {
  width: 48%;
}

.score-section {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.score {
  font-size: 24px;
  font-weight: bold;
  margin-left: 5px;
}


</style>
