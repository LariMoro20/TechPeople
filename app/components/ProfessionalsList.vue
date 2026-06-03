<template>
  <div class="flex-1 min-w-0">
    <UAlert
      v-if="error"
      color="error"
      icon="i-heroicons-exclamation-circle"
      title="Erro ao carregar profissionais"
      :description="error.message"
      class="mb-4"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <template v-if="loading">
        <UCard v-for="i in 6" :key="i">
          <div class="flex items-center gap-3 mb-4">
            <USkeleton class="w-12 h-12 rounded-full" />
            <div class="flex-1 space-y-2">
              <USkeleton class="h-4 w-3/4" />
              <USkeleton class="h-3 w-1/2" />
            </div>
          </div>
          <USkeleton class="h-3 w-full mb-2" />
          <USkeleton class="h-3 w-2/3" />
        </UCard>
      </template>
      <template v-else>
        <template v-if="professionals.length">
          <ProfessionalCard
            v-for="professional in professionals"
            :key="professional.id"
            :professional="professional"
          />
        </template>

        <div v-else class="col-span-full text-center py-16 text-gray-400">
          <UIcon
            name="i-heroicons-user-group"
            class="w-12 h-12 mx-auto mb-3 opacity-40"
          />
          <p class="text-lg font-medium">Nenhum profissional encontrado</p>
          <p class="text-sm mt-1">Tente ajustar os filtros</p>
        </div>
      </template>
    </div>

    <div v-if="meta && meta.totalPages > 1" class="flex justify-center mt-8">
      <UPagination
        :model-value="meta.page"
        :total="meta.total"
        :page-count="meta.perPage"
        @update:model-value="emit('update:page', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Professional, PaginationMeta } from "~/types";

defineProps<{
  professionals: Professional[];
  meta: PaginationMeta | null;
  loading: boolean;
  error: Error | null;
}>();

const emit = defineEmits<{
  "update:page": [page: number];
}>();
</script>
