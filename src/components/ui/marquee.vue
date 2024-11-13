<template>
  <div
    v-bind="props"
    :class="[
      'group flex overflow-hidden p-2',
      { 'flex-row': !vertical, 'flex-col': vertical },
      className,
    ]"
    style="--duration: 40s; --gap: 1rem; gap: var(--gap);"
  >
    <div
      v-for="i in repeat"
      :key="i"
      :class="[
        'flex shrink-0 justify-around',
        { 
          'animate-marquee flex-row': !vertical,
          'animate-marquee-vertical flex-col': vertical,
          'group-hover:[animation-play-state:paused]': pauseOnHover,
          '[animation-direction:reverse]': reverse,
        }
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  className: String,
  reverse: Boolean,
  pauseOnHover: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  repeat: {
    type: Number,
    default: 4,
  },
});
</script>

<style scoped>
/* CSS classes for animations go here */
</style>
