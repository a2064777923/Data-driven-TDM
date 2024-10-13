<script setup lang="ts">
import { leftBottom, getFestivalEvents } from "@/api";
import SeamlessScroll from "@/components/seamless-scroll";
import { computed, onMounted, reactive } from "vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import EmptyCom from "@/components/empty-com";
import { ElMessage } from "element-plus";

const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 256,
    limitScrollNum: 4,
  },
  scroll: true,
});

const getData = () => {
  getFestivalEvents( { limitNum: 20 })
    .then((res) => {
      console.log("左下--activity", res);
      if (res.success) {
        state.list = res.data;

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

const getHolidayBoolean= ((holi:String)=>{
	
	if (holi == "Not Holiday"){
		return 1
	}else{
		return 0
	}
})


const comName = computed(() => {
  if (indexConfig.value.leftBottomSwiper) {
    return SeamlessScroll;
  } else {
    return EmptyCom;
  }
});
onMounted(() => {
  getData();
});
</script>

<template>
  <div class="left_boottom_wrap beautify-scroll-def" :class="{ 'overflow-y-auto': !indexConfig.leftBottomSwiper }">
    <component
      :is="comName"
      :list="state.list"
      v-model="state.scroll"
      :singleHeight="state.defaultOption.singleHeight"
      :step="state.defaultOption.step"
      :limitScrollNum="state.defaultOption.limitScrollNum"
      :hover="state.defaultOption.hover"
      :singleWaitTime="state.defaultOption.singleWaitTime"
      :wheel="state.defaultOption.wheel"
    >
      <ul class="left_boottom">
        <li class="left_boottom_item" v-for="(item, i) in state.list" :key="i">
          <span class="orderNum doudong">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>
            <div class="flex">
              <div class="info">
                <span class="labels">Event：</span>
                <span class="text-content zhuyao doudong wangguan"> {{ item.name_en }}</span>
              </div>
        
            </div>
			<div class="info">
			  <span class="labels">Time：</span>
			  <span class="text-content" style="font-size: 12px"> {{ item.showDate }}</span>
			</div>
            <span
              class="types doudong"
              :class="{
				  typeRed:getHolidayBoolean(item.isPublicHoliday) === 1,
				  typeGreen:getHolidayBoolean(item.isPublicHoliday) === 0,
              }"
              >{{ item.isPublicHoliday }}</span>

            <div class="info addresswrap">
              <span class="labels">link：</span>
			  <a :href="item.link" class="text-content ciyao" style="font-size: 12px" target="_blank" rel="noopener noreferrer">
			    {{ item.link }}
			  </a>
              
            </div>
          </div>
        </li>
      </ul>
    </component>
  </div>
</template>

<style scoped lang="scss">
.left_boottom_wrap {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.doudong {
  overflow: hidden;
  backface-visibility: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.left_boottom {
  width: 100%;
  height: 100%;
}

.left_boottom_item {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: flex-start;
  padding: 8px;
  font-size: 14px;
  margin: 10px 0;

  .orderNum {
    margin: 5 16px 0 -5px;
  }

  .info {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    color: #fff;

    .labels {
      flex-shrink: 0;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
    }

    .zhuyao {
      color: #35ad6d;
      font-size: 13px; 
    }

    .ciyao {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .inner_right {
    position: relative;
    width: 100%;
    line-height: 1;
    display: flex;
    flex-direction: column; /* 垂直排列 */
    align-items: flex-start;
    justify-content: space-between;

    .dibu {
      position: absolute;
      height: 2px;
      width: 104%;
      background-image: url("@/assets/img/zuo_xuxian.png");
      bottom: -10px;
      left: -2%;
      background-size: cover;
    }

    .addresswrap {
      width: 100%;
      display: flex;
      margin-top: 8px;
    }
  }

  .types {
    align-self: flex-end; /* 靠右边 */
    font-size: 12px; /* 缩小字体 */
    margin-top: 8px;
  }

  .typeRed {
    color: #fc1a1a;
  }

  .typeGreen {
    color: #29fc29;
  }
}

</style>
