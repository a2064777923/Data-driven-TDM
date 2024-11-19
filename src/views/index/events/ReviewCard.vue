<template>
  <figure :class="figureClasses">
    <div class="flex flex-row items-center gap-2">
      <img class="rounded" width="40" height="32" alt="" object-fit: cover :src="review.imageURL" />
      <div class="flex flex-col">
        <figcaption class="text-sm font-medium text-zinc-950 truncate">
          {{ review.theme }}
        </figcaption>
        <p class="text-xs font-medium text-zinc-950/40">{{ review.start_date + "~" + review.end_date }}</p>
      </div>
    </div>
    <blockquote class="mt-2 text-xs text-zinc-950 text-wrap truncate">{{ review.intro }}</blockquote>
  </figure>
</template>

<script setup>
import { computed, toRefs } from 'vue';
import { cn } from "@/lib/utils"; //  cn 是一个返回类名字符串的函数

const props = defineProps({
  review: {
    type: Object,
    required: true,
  }
});

const figureClasses = computed(() => cn(
  "relative h-[120px] w-64 cursor-pointer overflow-hidden rounded-md border p-4",
  "border-violet-950/[.1] bg-blue-300/[.1] hover:bg-stone-500/[.05]",
  "border-violet-700/[.1]  dark:hover:bg-gray-50/[.15]"
));
</script>
