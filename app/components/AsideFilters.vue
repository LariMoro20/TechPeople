<template>
  <aside class="w-full lg:w-72 shrink-0 lg:sticky lg:top-20 lg:self-start">
    <UCard
      :ui="{
        body: 'p-4 sm:p-5',
      }"
    >
      <div class="flex items-center justify-between gap-3 mb-4">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-heroicons-adjustments-horizontal"
            class="w-5 h-5 text-primary"
          />

          <span class="font-semibold text-gray-900 dark:text-white">
            Filtros
          </span>
        </div>

        <div class="flex items-center gap-2">
          <UButton
            v-if="hasActiveFilters"
            variant="ghost"
            class="cursor-pointer"
            size="xs"
            color="neutral"
            @click="emit('clear')"
          >
            Limpar
          </UButton>

          <UButton
            color="neutral"
            variant="ghost"
            size="xs"
            class="lg:hidden cursor-pointer"
            :icon="
              showMobileFilters
                ? 'i-heroicons-chevron-up'
                : 'i-heroicons-chevron-down'
            "
            @click="showMobileFilters = !showMobileFilters"
          >
            {{ showMobileFilters ? "Ocultar" : "Mostrar" }}
          </UButton>
        </div>
      </div>

      <div
        :class="[showMobileFilters ? 'block mt-4' : 'hidden mt-4', 'lg:block']"
      >
        <div class="space-y-5 sm:space-y-6 pt-1 lg:pt-0">
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
              class="w-full"
              @update:model-value="updateSearch"
            />
          </div>

          <div v-if="professionOptions.length">
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
            >
              Profissão
            </label>

            <div class="max-h-44 lg:max-h-none overflow-y-auto pr-1">
              <UCheckboxGroup
                :model-value="filters.professions"
                :items="professionOptions"
                @update:model-value="updateProfessions"
              />
            </div>
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
              class="w-full"
              @update:model-value="updateCity"
            />
          </div>

          <div>
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
            >
              Avaliação mínima
            </label>

            <div class="flex flex-wrap gap-2">
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

            <div class="flex justify-between mt-2 text-xs text-gray-500">
              <span>R$ {{ priceRangeModel[0] }}</span>
              <span>R$ {{ priceRangeModel[1] }}</span>
            </div>
          </div>

          <div class="pt-1">
            <UCheckbox
              :model-value="filters.available === true"
              label="Somente disponíveis"
              @update:model-value="updateAvailable"
            />
          </div>
        </div>
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

const showMobileFilters = ref(false);

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
