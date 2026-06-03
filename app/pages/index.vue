<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Profissionais
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          {{ meta?.total ?? 0 }} profissionais encontrados
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        <AsideFilters
          :filters="filters"
          :facets="facets"
          :has-active-filters="hasActiveFilters"
          @update:filters="updateFilters"
          @clear="clearFilters"
        />

        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              <template v-if="meta">
                Página {{ meta.page }} de {{ meta.totalPages }}
              </template>
            </span>
            <USelect v-model="selectedSort" :items="sortOptions" class="w-48" />
          </div>

          <ProfessionalsList
            :professionals="professionals"
            :meta="meta"
            :loading="loading"
            :error="error"
            @update:page="goToPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { SortField, SortDirection } from "~/types";

const {
  professionals,
  meta,
  loading,
  error,
  filters,
  sort,
  updateFilters,
  updateSort,
  goToPage,
  clearFilters,
} = useProfessionals();

const { facets } = useProfessionalsFilters();

const sortOptions = [
  { label: "Melhor avaliação", value: "rating:desc" },
  { label: "Menor preço", value: "servicePrice:asc" },
  { label: "Maior preço", value: "servicePrice:desc" },
  { label: "Nome A-Z", value: "name:asc" },
];

const selectedSort = computed({
  get: () => `${sort.field}:${sort.direction}`,
  set: (val: string) => {
    const [field, direction] = val.split(":") as [SortField, SortDirection];
    updateSort({ field, direction });
  },
});

const hasActiveFilters = computed(
  () =>
    !!(
      filters.search ||
      filters.professions.length ||
      filters.city ||
      filters.minRating ||
      filters.available
    ),
);

useSeoMeta({
  titleTemplate: "%s",
  title: "TechPeople — Catálogo de Profissionais de Tecnologia",
  description:
    "Catálogo fictício de profissionais de tecnologia com perfis detalhados, especialidades, localização, senioridade, stacks técnicas e disponibilidade para projetos.",
  ogTitle: "TechPeople — Catálogo de Profissionais de Tecnologia",
  ogDescription:
    "Explore uma listagem fictícia de profissionais de tecnologia, incluindo desenvolvedores frontend, backend, fullstack, UI/UX designers, DevOps e especialistas em dados.",
});
</script>
