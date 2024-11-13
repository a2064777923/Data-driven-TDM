<template>
  <ShineBorder
    className="relative flex h-[315px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
    :color="['#A07CFE', '#FE8FB5', '#FFBE7B']"
  >
    <div class="relative flex h-[315px] w-full flex-col items-center justify-center overflow-hidden rounded-md border bg-gray-200 bg-opacity-80 md:shadow-xl">
      
          
          <el-popover
            :visible="hoveredCardRow1 !== ''"
            placement="top"
            width="400"
            trigger="hover"
          >
		  
            <EventDetailsCard :review ="hoverEventDetail1"/>
			<template #reference>
				<Marquee pauseOnHover class="[--duration:20s] ">
					<div
					  v-for="review in firstRow"
					  :key="review.id"
					  @mouseenter= "handleCardHover1(review)"
					  @mouseleave="handleUnHover1()"
					>
						<ReviewCard :review="review" />
					</div>
				</Marquee>
			</template>
          </el-popover>
        
      <el-popover
        :visible="hoveredCardRow2 !== ''"
        placement="top"
        width="400"
        trigger="manual"
      >
      
        <EventDetailsCard :review="hoverEventDetail2"/>
      	<template #reference>
		  <Marquee reverse pauseOnHover class="[--duration:20s]">
			<div
			  v-for="review in secondRow"
			  :key="review.id"
			  @mouseenter= "handleCardHover2(review)"
			  @mouseleave="handleUnHover2()"
			>
			  <ReviewCard :review="review" />
			</div>
		  </Marquee>
	  </template>
	  </el-popover>
	  
      <div class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-Neutral-400 dark:from-background"></div>
      <div class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-Neutral-400 dark:from-background"></div>
    </div>
  </ShineBorder>
</template>

<script setup>
import { computed,onMounted,ref } from 'vue';
import { cn } from "@/lib/utils"; // cn 是一个返回类名字符串的函数
import Marquee from "@/components/ui/marquee.vue";// 假设这是一个 Vue 组件
import ReviewCard from './ReviewCard.vue';
import ShineBorder from '@/components/ui/shine-border.vue'; 
import { getEventsHolding } from '@/api';
import EventDetailsCard from "./event-details-card.vue";
const hoveredCardRow1 = ref("");
const hoveredCardRow2 = ref("");
const hoverEventDetail1 = ref({});
const hoverEventDetail2 = ref({});

const reviews = ref([]);

const getAllEventsHolding = async () =>{
	try{
		getEventsHolding().then((res)=>{
			console.log("Events:");
			console.log(res)
			reviews.value = res.data;
		})
	} catch(error){
		console.error('Error get data:', error);
	}
}
const handleCardHover1 = (review) =>{
	hoveredCardRow1.value = review.id;
	hoverEventDetail1.value = review;
}
const handleCardHover2 = (review) =>{
	hoveredCardRow2.value = review.id;
	hoverEventDetail2.value = review;
}
const handleUnHover1 = () =>{
	setTimeout(()=>{
		hoveredCardRow1.value = '';
	},4000)
}
const handleUnHover2 = () =>{
	setTimeout(()=>{
		hoveredCardRow2.value = '';
	},4000)
}
onMounted(() => {
	getAllEventsHolding();
})

const firstRow = computed(() => reviews.value.slice(0, reviews.value.length / 2));
const secondRow = computed(() => reviews.value.slice(reviews.value.length / 2));
</script>
