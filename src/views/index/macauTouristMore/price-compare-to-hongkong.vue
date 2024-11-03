<template>
  <div class="expanded-charts">
    <div class="echart" style="border-right: 1px solid #ccc;">
      <HKcomsumption />
    </div>
    <div class="echart">
      <HKovernight/>
    </div>
  </div>
</template>

<script setup lang="ts">
	import HKcomsumption from "./HK-comsumption.vue";
	import HKovernight from "./HK-overnight-contrast.vue"; 
</script>

<style scoped lang="scss">

.expanded-charts {
  width: 100%;
  display: flex;
  height: 310px; // 与 ItemWrap 一致
}

.echart {
  width: 50%;
  height: 310px;
}


</style>
