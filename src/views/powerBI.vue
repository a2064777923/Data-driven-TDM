<template>
  <div class="powerbi-report">
    <iframe
      :src="embedUrl"
      frameborder="0"
      allowFullScreen="true"
      style="width:100%; height:600px;"
    ></iframe>
	<div class="content_wrap">
	  <Headers />
	  <RouterView />
	  <MessageContent />
	</div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import MessageContent from "@/components/Plugins/MessageContent";
export default {
  data() {
    return {
		
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiNmEzNDUxMGEtMDFkZS00OWRhLTk0NDgtZjFjNjMwNWY2MGI1IiwidCI6Ijc2ZWVlYzQ2LWZlNDAtNGUxYi1hYjQyLTFkNmQ5ZjkxYjhhOSIsImMiOjEwfQ%3D%3D" // 替换为你的 Power BI 报表嵌入链接
    };
  }
};
</script>

<style scoped>
.powerbi-report {
  /* 样式设置 */
}
</style>
