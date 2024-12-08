<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="Trends" name="first">
		<Number v-if="activeName === 'first'"/>
	</el-tab-pane>
    <el-tab-pane label="Industry Breakdown" name="second">
		<Subject v-if="activeName === 'second'"/>
	</el-tab-pane>
    <el-tab-pane label="Visitor and Exhibitor Data" name="third">
		<TwoPlusTwo v-if="activeName === 'third'"/>
	</el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Number from './exhibition-number.vue'
import Subject from './exhibition-subject.vue'
import TwoPlusTwo from './exhibition-2plus2.vue'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 28px;
  font-weight: 600;
}
</style>