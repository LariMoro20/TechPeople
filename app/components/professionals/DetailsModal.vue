<template>
  <UModal
    v-model:open="isOpen"
    :ui="{
      content: 'max-w-2xl',
    }"
  >
    <template #content>
      <UCard
        v-if="props.professional"
        :ui="{
          body: 'p-4 sm:p-6',
          header: 'p-4 sm:p-6',
          footer: 'p-4 sm:p-6',
        }"
      >
        <template #header>
          <div class="flex items-start gap-4">
            <img
              :src="props.professional.avatar"
              :alt="props.professional.name"
              class="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover shrink-0"
            />
            <div class="min-w-0 flex-1">
              <div
                class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
              >
                <div class="min-w-0">
                  <h2
                    class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    {{ props.professional.name }}
                  </h2>

                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ props.professional.profession }}
                  </p>
                </div>
                <UBadge
                  v-if="props.professional.available"
                  color="success"
                  variant="subtle"
                  size="sm"
                  class="w-fit shrink-0"
                >
                  Disponível
                </UBadge>
                <UBadge
                  v-else
                  color="neutral"
                  variant="subtle"
                  size="sm"
                  class="w-fit shrink-0"
                >
                  Indisponível
                </UBadge>
              </div>

              <div
                class="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-sm"
              >
                <div class="flex items-center gap-1">
                  <UIcon
                    name="i-heroicons-star-solid"
                    class="h-4 w-4 text-yellow-400"
                  />
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ props.professional.rating }}
                  </span>
                  <span class="text-gray-500 dark:text-gray-400">
                    ({{ props.professional.reviewCount }} avaliações)
                  </span>
                </div>
                <div class="hidden sm:block text-gray-300 dark:text-gray-700">
                  •
                </div>
                <div>
                  <span class="font-semibold text-gray-900 dark:text-white">
                    {{ formatCurrency(props.professional.servicePrice) }}
                  </span>
                  <span class="text-gray-500 dark:text-gray-400">
                    /sessão
                  </span>
                </div>
                <div class="hidden sm:block text-gray-300 dark:text-gray-700">
                  •
                </div>
                <div class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <UIcon name="i-heroicons-map-pin" class="h-4 w-4 shrink-0" />
                  <span>{{ props.professional.city }}</span>
                </div>
              </div>
            </div>

            <div class="flex shrink-0 items-center gap-1">
              <UButton
                color="neutral"
                variant="ghost"
                :icon="
                  isFavorite ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'
                "
                :aria-label="
                  isFavorite ? 'Remove from favorites' : 'Add to favorites'
                "
                :class="
                  isFavorite
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-400 hover:text-red-500'
                "
                @click.stop="toggleCurrentFavorite"
              />
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-heroicons-x-mark"
                aria-label="Fechar modal"
                @click="isOpen = false"
              />
            </div>
          </div>
        </template>

        <div class="space-y-5">
          <div>
            <h3
              class="mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Sobre o profissional
            </h3>
            <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {{ props.professional.bio }}
            </p>
          </div>

          <div v-if="props.professional.tags.length">
            <h3
              class="mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Especialidades
            </h3>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="tag in props.professional.tags"
                :key="tag"
                color="neutral"
                variant="subtle"
              >
                {{ tag }}
              </UBadge>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div
              class="rounded-xl border border-gray-200 p-3 dark:border-gray-800"
            >
              <p class="text-xs text-gray-500 dark:text-gray-400">Avaliação</p>
              <p class="mt-1 font-semibold text-gray-900 dark:text-white">
                {{ props.professional.rating }} / 5
              </p>
            </div>

            <div
              class="rounded-xl border border-gray-200 p-3 dark:border-gray-800"
            >
              <p class="text-xs text-gray-500 dark:text-gray-400">Avaliações</p>
              <p class="mt-1 font-semibold text-gray-900 dark:text-white">
                {{ props.professional.reviewCount }}
              </p>
            </div>
            <div
              class="rounded-xl border border-gray-200 p-3 dark:border-gray-800"
            >
              <p class="text-xs text-gray-500 dark:text-gray-400">Valor</p>
              <p class="mt-1 font-semibold text-gray-900 dark:text-white">
                {{ formatCurrency(props.professional.servicePrice) }}
              </p>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <UButton
              color="neutral"
              variant="outline"
              label="Fechar"
              class="justify-center"
              @click="isOpen = false"
            />
            <UButton
              color="primary"
              icon="i-heroicons-chat-bubble-left-right"
              label="Tenho interesse"
              class="justify-center"
            />
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { Professional } from "~/types";

const props = defineProps<{
  professional: Professional | null;
  open: boolean;
}>();
const favoriteProfessionalsStore = useFavoriteProfessionalsStore();

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit("update:open", value),
});

const isFavorite = computed(() => {
  if (!props.professional) return false;
  return favoriteProfessionalsStore.isFavorite(props.professional.id);
});

function toggleCurrentFavorite() {
  if (!props.professional) return;
  favoriteProfessionalsStore.toggleFavorite(props.professional.id);
}
</script>
