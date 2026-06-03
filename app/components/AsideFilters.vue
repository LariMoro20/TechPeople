<template>
  <aside class="w-full lg:w-72 shrink-0">
    <UCard>
      <div class="flex items-center justify-between mb-4">
        <span class="font-semibold text-gray-900 dark:text-white">
          Filtros
        </span>

        <UButton
          v-if="hasActiveFilters"
          variant="ghost"
          size="xs"
          color="neutral"
          @click="emit('clear')"
        >
          Limpar
        </UButton>
      </div>

      <div class="space-y-6">
        <div>
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
          >
            Busca
          </label>

          <UInput
            :model-value="filters.search"
            placeholder="Nome ou especialidade..."
            icon="i-heroicons-magnifying-glass"
            @update:model-value="updateSearch"
          />
        </div>

        <div v-if="professionOptions.length">
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
          >
            Profissão
          </label>

          <UCheckboxGroup
            :model-value="filters.professions"
            :items="professionOptions"
            @update:model-value="updateProfessions"
          />
        </div>

        <div v-if="cityOptions.length">
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
          >
            Cidade
          </label>

          <USelect
            :model-value="filters.city"
            :items="cityOptions"
            @update:model-value="updateCity"
          />
        </div>

        <div>
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
          >
            Avaliação mínima
          </label>

          <div class="flex gap-2">
            <UButton
              v-for="opt in ratingOptions"
              :key="String(opt.value)"
              size="xs"
              :variant="filters.minRating === opt.value ? 'solid' : 'outline'"
              :color="filters.minRating === opt.value ? 'primary' : 'neutral'"
              @click="updateRating(opt.value)"
            >
              {{ opt.label }}
            </UButton>
          </div>
        </div>

        <div v-if="hasPriceRange">
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block"
          >
            Faixa de preço
          </label>

          <USlider
            v-model="priceRangeModel"
            :min="priceRangeMin"
            :max="priceRangeMax"
            :step="10"
          />

          <div class="flex justify-between mt-1 text-xs text-gray-500">
            <span>R$ {{ priceRangeModel[0] }}</span>
            <span>R$ {{ priceRangeModel[1] }}</span>
          </div>
        </div>

        <UCheckbox
          :model-value="filters.available === true"
          label="Somente disponíveis"
          @update:model-value="updateAvailable"
        />
      </div>
    </UCard>
  </aside>
</template>

<script setup lang="ts">
import type { ProfessionalsFilters } from "~/types";

const props = defineProps<{
  filters: ProfessionalsFilters;
}>();

const emit = defineEmits<{
  "update:filters": [partial: Partial<ProfessionalsFilters>];
  clear: [];
}>();

const {
  ratingOptions,
  cityOptions,
  professionOptions,
  hasPriceRange,
  priceRangeMin,
  priceRangeMax,
  priceRangeModel,
  hasActiveFilters,
  updateSearch,
  updateProfessions,
  updateCity,
  updateRating,
  updateAvailable,
} = useProfessionalsFilters({
  filters: props.filters,
  updateFilters: (partial) => emit("update:filters", partial),
});
</script>
