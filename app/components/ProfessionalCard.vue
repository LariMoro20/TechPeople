<template>
  <UCard class="hover:shadow-md transition-shadow cursor-pointer">
    <div class="flex items-start gap-3 mb-3">
      <img
        :src="professional.avatar"
        :alt="professional.name"
        class="w-12 h-12 rounded-full object-cover shrink-0"
      />
      <div class="min-w-0">
        <h3 class="font-semibold text-gray-900 dark:text-white truncate">
          {{ professional.name }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
          {{ professional.profession }}
        </p>
      </div>
      <UBadge
        v-if="professional.available"
        color="success"
        variant="subtle"
        size="xs"
        class="ml-auto shrink-0"
      >
        Disponível
      </UBadge>
    </div>

    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
      {{ professional.bio }}
    </p>

    <div class="flex flex-wrap gap-1 mb-3">
      <UBadge
        v-for="tag in professional.tags.slice(0, 3)"
        :key="tag"
        color="neutral"
        variant="subtle"
        size="xs"
      >
        {{ tag }}
      </UBadge>
    </div>

    <div
      class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800"
    >
      <div class="flex items-center gap-1 text-sm">
        <UIcon name="i-heroicons-star-solid" class="text-yellow-400 w-4 h-4" />
        <span class="font-medium text-gray-900 dark:text-white">{{
          professional.rating
        }}</span>
        <span class="text-gray-400">({{ professional.reviewCount }})</span>
      </div>
      <div class="text-sm">
        <span class="font-semibold text-gray-900 dark:text-white">
          R$ {{ professional.servicePrice }}
        </span>
        <span class="text-gray-400">/sessão</span>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Professional } from "~/types";

defineProps<{
  professional: Professional;
}>();
</script>
