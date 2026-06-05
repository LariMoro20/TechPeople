<template>
  <section class="bg-white dark:bg-gray-900 py-8 sm:py-10">
    <UContainer>
      <dl class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div
          v-for="stat in items"
          :key="stat.label"
          class="flex flex-col items-center text-center gap-2"
        >
          <UIcon :name="stat.icon" class="size-8 text-primary" />
          <dd class="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {{ stat.value }}
          </dd>
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            {{ stat.label }}
          </dt>
        </div>
      </dl>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { ProfessionalsStats } from "~/types";

const props = defineProps<{ stats: ProfessionalsStats | null }>();

const items = computed(() => [
  {
    value: props.stats ? `${props.stats.total}+` : "—",
    label: "Profissionais cadastrados",
    icon: "i-lucide-users",
  },
  {
    value: props.stats ? String(props.stats.specialties) : "—",
    label: "Especialidades",
    icon: "i-lucide-briefcase",
  },
  {
    value: props.stats ? String(props.stats.cities) : "—",
    label: "Cidades",
    icon: "i-lucide-map-pin",
  },
  {
    value: props.stats ? `${props.stats.available}` : "—",
    label: "Disponíveis agora",
    icon: "i-lucide-circle-check",
  },
]);
</script>
