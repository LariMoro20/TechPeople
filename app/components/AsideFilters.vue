<template>
  <aside class="w-full lg:w-72 shrink-0">
    <UCard>
      <div class="flex items-center justify-between mb-4">
        <span class="font-semibold text-gray-900 dark:text-white">Filtros</span>
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
            @update:model-value="emit('update:filters', { search: $event })"
          />
        </div>

        <div v-if="professionOptions.length">
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
          >
            Profissão
          </label>
          <div class="space-y-2">
            <UCheckboxGroup
              :model-value="filters.professions"
              :items="professionOptions"
              @update:model-value="
                emit('update:filters', { professions: $event })
              "
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
            @update:model-value="emit('update:filters', { city: $event })"
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
              @click="emit('update:filters', { minRating: opt.value })"
            >
              {{ opt.label }}
            </UButton>
          </div>
        </div>

        <div v-if="facets">
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block"
          >
            Faixa de preço
          </label>
          <URange
            :model-value="[
              filters.priceRange.min ?? facets.priceRange.min,
              filters.priceRange.max ?? facets.priceRange.max,
            ]"
            :min="facets.priceRange.min"
            :max="facets.priceRange.max"
            :step="10"
            @update:model-value="
              emit('update:filters', {
                priceRange: { min: $event[0], max: $event[1] },
              })
            "
          />
          <div class="flex justify-between mt-1 text-xs text-gray-500">
            <span
              >R$ {{ filters.priceRange.min ?? facets.priceRange.min }}</span
            >
            <span
              >R$ {{ filters.priceRange.max ?? facets.priceRange.max }}</span
            >
          </div>
        </div>

        <UCheckbox
          :model-value="filters.available ?? false"
          label="Somente disponíveis"
          @update:model-value="
            emit('update:filters', { available: $event || null })
          "
        />
      </div>
    </UCard>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  filters: ProfessionalsFilters;
  facets: ProfessionalsFacets | null;
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  "update:filters": [partial: Partial<ProfessionalsFilters>];
  clear: [];
}>();

const ratingOptions = [
  { label: "Qualquer", value: null },
  { label: "4+", value: 4 },
  { label: "4.5+", value: 4.5 },
];

const cityOptions = computed(() => [
  { label: "Todas", value: null },
  ...(props.facets?.cities ?? []).map((c) => ({ label: c, value: c })),
]);

const professionOptions = computed(() =>
  (props.facets?.professions ?? []).map((p) => ({ label: p, value: p })),
);
</script>
