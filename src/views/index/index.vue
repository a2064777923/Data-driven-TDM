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



const isMacauPriceExpand = ref(false);
const isOverNightExpand = ref(false);
const isSameDayExpand = ref(false);
const exhibitionMoreVisible = ref(false);
const isVisitorStayExpand = ref(false);



const popoverStore = usePopoverStore();
const handlePopoverShow = () => {
  popoverStore.openPopover();
}

</script>

<template>
  <div class="index-box">
    <div class="contetn_left">
      <!-- <div class="pagetab">
        <div class="item">实时监测</div>
        <div class="item">统计分析</div>
      </div> -->
      <ItemWrap class="contetn_left-top contetn_lr-item" title="Tourist Consumption">
		  <el-popover
		  :visible="isMacauPriceExpand"
		  placement="right-start"
		  popover-class="popovers"
		  content = "dark"
		  width="700"
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
      </ItemWrap>
	  
	  
      <ItemWrap class="contetn_left-center contetn_lr-item" title="Service & Facilities">

		  
        <ServiceFacilities/>
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
			  :visible="isSameDayExpand"
			  placement="left-start"
			  popover-class="popovers"
			  content = "dark"
			  width="600"
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
			  width="600"
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
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="Macau Consumption">
		<MacauConsumption/>
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
  top: 10px; /* 向上移动按钮 */
  right: 10px; /* 向右移动按钮 */
  background-color: #00557f;
}

.small-button-left {
  font-size: 8px; /* 更改字体大小 */
  padding: 5px 10px; /* 修改按钮大小 */
  position: absolute;
  top: 10px; /* 向上移动按钮 */
  left: 10px; /* 向左移动按钮 */
  background-color: #00557f;
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


</style>
