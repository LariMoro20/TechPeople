<template>
  <UCard
    class="h-full hover:shadow-md transition-shadow cursor-pointer"
    :ui="{
      body: 'p-3 sm:p-4',
    }"
    @click="emit('select', professional)"
  >
    <div class="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
      <NuxtImg
        :src="professional.avatar"
        :alt="professional.name"
        width="48"
        height="48"
        format="webp"
        quality="80"
        loading="lazy"
        class="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
      />
      <div class="min-w-0 flex-1">
        <h3
          class="font-semibold text-sm sm:text-base leading-tight text-gray-900 dark:text-white truncate"
        >
          {{ professional.name }}
        </h3>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
          {{ professional.profession }}
        </p>
        <UBadge
          v-if="professional.available"
          color="success"
          variant="subtle"
          size="xs"
          class="mt-1 inline-flex sm:hidden w-fit"
        >
          Disponível
        </UBadge>
      </div>

      <div class="flex shrink-0 items-start gap-1">
        <UBadge
          v-if="professional.available"
          color="success"
          variant="subtle"
          size="xs"
          class="hidden sm:inline-flex"
        >
          Disponível
        </UBadge>
        <UButton
          color="neutral"
          variant="ghost"
          size="xs"
          :icon="isFavorite ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
          :aria-label="
            isFavorite ? 'Remove from favorites' : 'Add to favorites'
          "
          :class="
            isFavorite
              ? 'text-red-500 hover:text-red-600'
              : 'text-gray-400 hover:text-red-500'
          "
          @click.stop="
            favoriteProfessionalsStore.toggleFavorite(professional.id)
          "
        />
      </div>
    </div>
    <p
      class="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2 mb-2 sm:mb-3"
    >
      {{ professional.bio }}
    </p>
    <div class="flex flex-wrap gap-1 mb-2 sm:mb-3">
      <UBadge
        v-for="(tag, index) in professional.tags.slice(0, 3)"
        :key="tag"
        color="neutral"
        variant="subtle"
        size="xs"
        :class="[
          'max-w-full truncate',
          index === 2 ? 'hidden sm:inline-flex' : '',
        ]"
      >
        {{ tag }}
      </UBadge>
    </div>

    <div
      class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-800"
    >
      <div class="flex items-center gap-2 text-xs sm:text-sm">
        <div class="flex items-center gap-1">
          <UIcon
            name="i-heroicons-star-solid"
            class="text-yellow-400 w-3.5 h-3.5 sm:w-4 sm:h-4"
          />
          <span class="font-medium text-gray-900 dark:text-white">
            {{ professional.rating }}
          </span>
          <span class="text-gray-400"> ({{ professional.reviewCount }}) </span>
        </div>
        <span class="text-gray-300 dark:text-gray-700">·</span>
        <div class="flex items-center gap-0.5 text-gray-400 truncate">
          <UIcon name="i-heroicons-map-pin" class="w-3.5 h-3.5 shrink-0" />
          <span class="truncate">{{ professional.city }}</span>
        </div>
      </div>
      <div class="text-xs sm:text-sm leading-tight">
        <span class="font-semibold text-gray-900 dark:text-white">
          {{ formatCurrency(professional.servicePrice) }}
        </span>
        <span class="block sm:inline text-gray-400"> /sessão </span>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Professional } from "~/types";

const props = defineProps<{
  professional: Professional;
}>();

const emit = defineEmits<{
  select: [professional: Professional];
}>();

const favoriteProfessionalsStore = useFavoriteProfessionalsStore();

const isFavorite = computed(() =>
  favoriteProfessionalsStore.isFavorite(props.professional.id),
);
</script>
