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
        <ProfessionalsFilters
          :filters="filters"
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
            <label for="sort-select" class="sr-only">Ordenar por</label>
            <USelect
              id="sort-select"
              v-model="selectedSort"
              :items="sortOptions"
              class="w-48 cursor-pointer"
            />
          </div>

          <ProfessionalsList
            :professionals="professionals"
            :meta="meta"
            :loading="loading"
            :error="error"
            @update:page="goToPage"
            @select="openModal"
          />

          <ProfessionalsDetailsModal
            v-model:open="isModalOpen"
            :professional="selectedProfessional"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Professional, SortField, SortDirection } from "~/types";

defineOgImage("OgSiteImage", {
  title: "Profissionais — TechPeople",
  description:
    "Encontre profissionais de tecnologia com filtros por especialidade, senioridade, cidade, faixa de preço e avaliação.",
  tags: ["Frontend", "Backend", "Fullstack", "UI/UX", "DevOps"],
});

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

const isModalOpen = ref(false);
const selectedProfessional = ref<Professional | null>(null);

function openModal(professional: Professional) {
  selectedProfessional.value = professional;
  isModalOpen.value = true;
}

const sortOptions = [
  { label: "Melhor avaliação", value: "rating:desc" },
  { label: "Menor preço", value: "servicePrice:asc" },
  { label: "Maior preço", value: "servicePrice:desc" },
  { label: "Nome A-Z", value: "name:asc" },
];

const selectedSort = computed({
  get: () => `${sort.value.field}:${sort.value.direction}`,
  set: (val: string) => {
    const [field, direction] = val.split(":") as [SortField, SortDirection];
    updateSort({ field, direction });
  },
});

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
