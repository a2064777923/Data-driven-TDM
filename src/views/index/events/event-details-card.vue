<template>
  <figure v-if="review" class="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
    <div class="flex flex-col items-start gap-4">
      <div class="w-full">
        <figcaption class="text-lg font-semibold text-gray-900 text-wrap mb-2">
          {{ review.theme }}
        </figcaption>
        <img class="rounded-md w-full object-cover h-60" :src="review.imageURL" alt="Review Image" />
      </div>
      <div class="w-full">
        <p v-if="review.start_date !== 'nan' && review.end_date !== 'nan'" class="text-xs text-gray-500">
          {{ review.start_date }} ~ {{ review.end_date }}
        </p>
        <p v-if="review.time !== 'nan'" class="text-sm text-gray-700">
          <span class="font-bold">Time:</span> {{ review.time }}
        </p>
        <p v-if="review.fee !== 'nan'" class="text-sm text-gray-700">
          <span class="font-bold">Fee:</span> {{ review.fee }}
        </p>
		<p v-if="review.link !== 'nan'" class="text-sm text-gray-700">
		  <span class="font-bold">link:</span> 
		  <a :href="review.link" target="_blank" class="text-blue-500 underline">{{ review.link }}</a>
		</p>
        <p v-if="review.telephone !== 'nan'" class="text-sm text-gray-700">
          <span class="font-bold">Telephone:</span> {{ review.telephone }}
        </p>
        <p v-if="review.email !== 'nan'" class="text-sm text-gray-700">
          <span class="font-bold">Email:</span> {{ review.email }}
        </p>
        <p v-if="review.facebook !== 'nan'" class="text-sm text-gray-700">
          <span class="font-bold">Facebook:</span> {{ review.facebook }}
        </p>
        <p v-if="review.instagram !== 'nan'" class="text-sm text-gray-700">
          <span class="font-bold">Instagram:</span> {{ review.instagram }}
        </p>
        <p v-if="review.location !== 'nan'" class="text-sm text-gray-700">
          <span class="font-bold">Location:</span> {{ review.location }}
        </p>
        <p v-if="review.organise !== 'nan'" class="text-sm text-gray-700">
          <span class="font-bold">Organize:</span> {{ review.organise }}
        </p>
      </div>
    </div>
    <blockquote v-if="review.intro !== 'nan'" class="mt-4 text-sm text-gray-600 italic border-l-4 pl-4 border-gray-300">
      {{ review.intro }}
    </blockquote>
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

</script>
