<script setup lang="ts">
import { ref } from 'vue'
import ItemWrap from "@/components/item-wrap";
import LeftTop from "./left-top.vue";
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";

import MacauTouristPrice from "./macau-tourist-price.vue";
import PriceExpand from "./macauTouristMore/price-compare-to-hongkong.vue";
import HotelPart from "./hotel-part.vue";
import OverNight from './hotelMore/over-night.vue';
import SameDay from './hotelMore/same-day.vue';
import Exhibition from "./exhibition-view.vue";
import ExhibitionMore from "./exhibition/exhibition-more.vue";
import ServiceFacilities from "./Service-facilities.vue";
import MacauConsumption from "./macau-consumption.vue";
import { usePopoverStore } from '@/stores/piniaStore';
import NewCenterMap from "./new-center-map.vue";
import EventsMarquee from "./events/events-marquee.vue";
import NonNativeVisitors from './macauTouristMore/Non-native-visitors-Macau.vue';
import ZoomMacauConsumption from './zoomChart/zoom-macau-consumption.vue';
import HotelPrediction from './hotelMore/hotel-prediction.vue';
import ZoomEnterExit from './zoomChart/zoom-enter-exit.vue';
import ShinyButton from "@/components/ui/shiny-button.vue";


const isMacauPriceExpand = ref(false);
const isOverNightExpand = ref(false);
const isSameDayExpand = ref(false);
const isHotelPredictExpand = ref(false);
const exhibitionMoreVisible = ref(false);
const isVisitorStayExpand = ref(false);

const zoomChartInfo = ref("");
const zoomChartShow = ref(false);

const popoverStore = usePopoverStore();
const handlePopoverShow = () => {
  popoverStore.openPopover();
}

const handleZoomClick = (name: string) =>{
	zoomChartShow.value = true;
	zoomChartInfo.value = name; 
}

</script>

<template>
  <div class="index-box">
    <div class="contetn_left">
      <!-- <div class="pagetab">
      </div> -->
      <ItemWrap class="contetn_left-top contetn_lr-item" title="Tourist Consumption">
		  <el-popover
		  :visible="isMacauPriceExpand"
		  placement="right-start"
		  popover-class="popovers"
		  content = "dark"
		  width="1300"
		  title="Compare to HK"
		  :append-to-body="false"
		  >
		  	<PriceExpand />
		  	<template #reference>
		  		<el-button @click="isMacauPriceExpand = !isMacauPriceExpand" type="primary" size="small" class="small-button">
		  			{{isMacauPriceExpand == true ?'Put away':'Compare HK'}}
		  		</el-button>
		  	</template>
		  </el-popover>
		  <MacauTouristPrice />
		    <button class="zoomButton" @click="handleZoomClick('Consumption')">
		      <svg class="svgIcon" viewBox="0 0 384 512">
		        <path
		          d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
		        ></path>
		      </svg>
		    </button>
      </ItemWrap>
	  
	  
      <ItemWrap class="contetn_left-center contetn_lr-item" title="Service & Facilities">

		  
        <ServiceFacilities/>
		<button class="zoomButton" @click="handleZoomClick('ServiceFacilities')">
		  <svg class="svgIcon" viewBox="0 0 384 512">
		    <path
		      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
		    ></path>
		  </svg>
		</button>
      </ItemWrap>
	  
      <div
        class="contetn_left-bottom contetn_lr-item"
        style="padding: 0 10px 16px 10px"
      >
	  <EventsMarquee />
      </div>
    </div>
    <div class="contetn_center">
	
      <NewCenterMap class="contetn_center_top" title="Macau Map" />
	  
      <ItemWrap class="contetn_center-bottom" title="Hotel Occupancy by Origin">
		  <div>
			  <el-popover
			  :visible="isHotelPredictExpand && isOverNightExpand && isSameDayExpand"
			  placement="top"
			  popover-class="popovers"
			  content="dark"
			  width="420">
			  <HotelPrediction v-if="isHotelPredictExpand"/>
			  <template #reference>
				    <button 
					class="btn"
					v-if="isOverNightExpand && isSameDayExpand"
					@click="isHotelPredictExpand = !isHotelPredictExpand">
				        <svg height="18" width="18" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" class="sparkle">
				            <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
				        </svg>
				  
				        <span class="text">Predict</span>
				    </button>
			  </template>
			  </el-popover>
		  </div>
		  <div>
			  <el-popover
			  :visible="isSameDayExpand"
			  placement="left-start"
			  popover-class="popovers"
			  content = "dark"
			  width="420"
			  :append-to-body="true"
			  >
			  	<SameDay/>
			  	<template #reference>
			  		<el-button @click="isSameDayExpand = !isSameDayExpand" type="primary" size="small" class="small-button-left">
			  			{{isSameDayExpand == true ?'Put away':'Same Day'}}
			  		</el-button>
			  	</template>
			  </el-popover>
		  </div>
		  
		  <div>
			  <el-popover
			  :visible="isOverNightExpand"
			  placement="right-start"
			  popover-class="popovers"
			  content = "dark"
			  width="420"
			  :append-to-body="true"
			  >
			  	<OverNight/>
			  	<template #reference>
			  		<el-button @click="isOverNightExpand = !isOverNightExpand" type="primary" size="small" class="small-button">
			  			{{isOverNightExpand == true ?'Put away':'Over Night'}}
			  		</el-button>
			  	</template>
			  </el-popover>
		  </div>
		  
        <HotelPart />
		
		<button v-if="false" class="zoomButton" @click="handleZoomClick('Hotel')">
		  <svg class="svgIcon" viewBox="0 0 384 512">
		    <path
		      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
		    ></path>
		  </svg>
		</button>
		
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="Macau Consumption">
		<MacauConsumption/>
		<button class="zoomButton" @click="handleZoomClick('Consumption')">
		  <svg class="svgIcon" viewBox="0 0 384 512">
		    <path
		      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
		    ></path>
		  </svg>
		</button>
		
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="Enter & Exit"
        style="padding: 0 10px 16px 10px">
	  <el-popover
		  :visible="isVisitorStayExpand"
		  placement="top-end"
		  popover-class="popovers"
		  content = "dark"
		  width="800"
		  :append-to-body="true"
		  @show="handlePopoverShow"
		  >
			<NonNativeVisitors/>
			<template #reference>
				<el-button @click="isVisitorStayExpand = !isVisitorStayExpand" type="primary" size="small" class="small-button">
					{{isVisitorStayExpand == true ?'Put away':'Average Stay'}}
				</el-button>
			</template>
		  </el-popover>

	  	<RightCenter />
		
		<button class="zoomButton" @click="handleZoomClick('Visitor Come')">
		  <svg class="svgIcon" viewBox="0 0 384 512">
		    <path
		      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
		    ></path>
		  </svg>
		</button>
		
      </ItemWrap>
	  
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="Exhibition ">
		  <el-button @click="exhibitionMoreVisible = true" size="small" class="small-button-left">
		      {{exhibitionMoreVisible == true ?'Put away':'See more'}}
		  </el-button>
		  <el-dialog v-model="exhibitionMoreVisible" width="1000">
			  <ExhibitionMore/>
		  </el-dialog>
        <Exhibition />
      </ItemWrap>
	  
	  
	  <el-dialog 
	   v-model="zoomChartShow"
	   width="850"
	   class="rounded-sm border bg-slate-300 bg-opacity-80 md:shadow-xl"
	   destroy-on-close
	   :title="zoomChartInfo"
	   @close="zoomChartInfo = ''">
	   <div class="flex rounded-sm border bg-slate-100 bg-opacity-80 md:shadow-xl">
		   <div v-if="zoomChartInfo === 'Consumption'">
			   <h1 class="text-2xl text-center">Tourist Consumption</h1>
			   <MacauTouristPrice style="height: 600px; "/>
			   <ZoomMacauConsumption/>
		   </div>
		   <div v-if="zoomChartInfo === 'ServiceFacilities'">
		   		<ServiceFacilities style="height: 600px; width: 800px;"/>
		   </div>
		   <div v-if="zoomChartInfo === 'Hotel'">
		   		<HotelPart style="height: 600px; width: 800px;" />
				<OverNight style="height: 600px; width: 800px;"></OverNight>
				<SameDay style="height: 600px; width: 800px;"></SameDay>
			</div>
			<div v-if="zoomChartInfo === 'Visitor Come'">
				<ZoomEnterExit v-if="zoomChartInfo === 'Visitor Come'" />
				<NonNativeVisitors style="height: 600px; width: 800px;"/>
			</div>
		   
		   
	   </div>	  
	  </el-dialog>
	  
	  
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-box {
  width: 100%;
  display: flex;
  min-height: calc(100% - 64px);
  justify-content: space-between;
}
//左边 右边 结构一样
.contetn_left,
.contetn_right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 540px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.contetn_center {
  flex: 1;
  margin: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .contetn_center-bottom {
    height: 320px;
  }
}

.contetn_lr-item {
  height: 310px;
}


.small-button {
  font-size: 8px; /* 更改字体大小 */
  padding: 5px 10px; /* 修改按钮大小 */
  position: absolute;
  color: #1C1A1C;
  border-radius: 5px;
  top: 10px; /* 向上移动按钮 */
  right: 10px; /* 向右移动按钮 */
  background-color: #818cf8;
}

.small-button-left {
  font-size: 8px; /* 更改字体大小 */
  padding: 5px 10px; /* 修改按钮大小 */
  color: #1C1A1C;
  border-radius: 5px;
  position: absolute;
  top: 10px; /* 向上移动按钮 */
  left: 10px; /* 向左移动按钮 */
  background-color: #818cf8;
}

.small-button:hover {
  background-color: #add8e6; /* 浅蓝色悬浮效果 */
}
.small-button-left:hover {
  background-color: #add8e6; /* 浅蓝色悬浮效果 */
}
.popovers {
  background: #03050C !important;/* 替换为你需要的颜色 */
  background-color: #03050c !important;
  color: #03050c !important;
  opacity: 0.9; /* 设置透明度值，范围是0到1 */
}

  .zoomButton {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px 2px rgba(180, 160, 255, 0.253);
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    position: absolute;
    top: 280px; /* 向下移动按钮 */
    right: 5px; /* 向右移动按钮 */
  }

  .svgIcon {
    width: 10px;
    transition-duration: 0.3s;
  }

  .svgIcon path {
    fill: white;
  }

  .zoomButton:hover {
    width: 70px;
    border-radius: 50px;
    transition-duration: 0.3s;
    background-color: rgb(181, 160, 255);
    align-items: center;
  }

  .zoomButton:hover .svgIcon {
    /* width: 12px; */
    transition-duration: 0.3s;
    transform: translateY(-200%);
  }

  .zoomButton::before {
    position: absolute;
    bottom: -20px;
    content: "Pop And Zoom";
    color: white;
    /* transition-duration: .3s; */
    font-size: 0px;
  }

  .zoomButton:hover::before {
    font-size: 8px;
    opacity: 1;
    bottom: unset;
    /* transform: translateY(-30px); */
    transition-duration: 0.3s;
  }
  
  
  .btn {
      border: none;
      width: 8em;
      height: 2em;
      border-radius: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      background: #1C1A1C;
      cursor: pointer;
      transition: all 450ms ease-in-out;
	  position: relative; /* 相对定位 */
	  top: -80px; /* 向上移动按钮 */
	  right: -280px;
    }
  
    .sparkle {
      fill: #AAAAAA;
      transition: all 800ms ease;
    }
  
    .text {
      font-weight: 400;
      color: #AAAAAA;
      font-size: medium;
    }
  
    .btn:hover {
      background: linear-gradient(0deg,#A47CF3,#683FEA);
      box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4),
      inset 0px -4px 0px 0px rgba(0, 0, 0, 0.2),
      0px 0px 0px 4px rgba(255, 255, 255, 0.2),
      0px 0px 180px 0px #9917FF;
      transform: translateY(-2px);
    }
  
    .btn:hover .text {
      color: white;
    }
  
    .btn:hover .sparkle {
      fill: white;
      transform: scale(1.2);
    }

</style>
