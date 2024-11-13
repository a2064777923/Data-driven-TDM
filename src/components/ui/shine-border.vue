<template>
  <div
    :style="{ '--border-radius': `${borderRadius}px` }"
    :class="cn('relative grid min-h-[60px] w-fit min-w-[300px] place-items-center rounded-[--border-radius] bg-white p-3 text-black dark:bg-black dark:text-white', className)"
  >
    <div
      :style="{
        '--border-width': `${borderWidth}px`,
        '--border-radius': `${borderRadius}px`,
        '--duration': `${duration}s`,
        '--mask-linear-gradient': `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        '--background-radial-gradient': `radial-gradient(transparent,transparent, ${Array.isArray(color) ? color.join(',') : color},transparent,transparent)`
      }"
      class="pointer-events-none before:bg-shine-size before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[''] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-shine"
    ></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { cn } from '@/lib/utils'; // 确保这个路径是正确的

export default defineComponent({
  name: 'ShineBorder',
  props: {
    borderRadius: {
      type: Number,
      default: 8
    },
    borderWidth: {
      type: Number,
      default: 1
    },
    duration: {
      type: Number,
      default: 14
    },
    color: {
      type: [String, Array] as PropType<TColorProp>,
      default: '#000000'
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return { cn }; // 将 cn 函数返回到模板中
  }
});
</script>


<style scoped>
/* 可根据需要添加样式 */
</style>
