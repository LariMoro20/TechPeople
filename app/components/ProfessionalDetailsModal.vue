<template>
  <UModal
    v-model:open="isOpen"
    :ui="{
      content: 'max-w-2xl',
    }"
  >
    <template #content>
      <UCard
        v-if="professional"
        :ui="{
          body: 'p-4 sm:p-6',
          header: 'p-4 sm:p-6',
          footer: 'p-4 sm:p-6',
        }"
      >
        <template #header>
          <div class="flex items-start gap-4">
            <img
              :src="professional.avatar"
              :alt="professional.name"
              class="h-16 w-16 rounded-full object-cover shrink-0"
            />

            <div class="min-w-0 flex-1">
              <div
                class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
              >
                <div class="min-w-0">
                  <h2
                    class="text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    {{ professional.name }}
                  </h2>

                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ professional.profession }}
                  </p>
                </div>

                <UBadge
                  v-if="professional.available"
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

              <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <div class="flex items-center gap-1">
                  <UIcon
                    name="i-heroicons-star-solid"
                    class="h-4 w-4 text-yellow-400"
                  />

                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ professional.rating }}
                  </span>

                  <span class="text-gray-500 dark:text-gray-400">
                    ({{ professional.reviewCount }} avaliações)
                  </span>
                </div>

                <div class="text-gray-300 dark:text-gray-700">•</div>

                <div>
                  <span class="font-semibold text-gray-900 dark:text-white">
                    R$ {{ professional.servicePrice }}
                  </span>

                  <span class="text-gray-500 dark:text-gray-400">
                    /sessão
                  </span>
                </div>
              </div>
            </div>

            <UButton
              color="neutral"
              variant="ghost"
              icon="i-heroicons-x-mark"
              aria-label="Fechar modal"
              class="shrink-0"
              @click="isOpen = false"
            />
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
              {{ professional.bio }}
            </p>
          </div>

          <div v-if="professional.tags.length">
            <h3
              class="mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Especialidades
            </h3>

            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="tag in professional.tags"
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
                {{ professional.rating }} / 5
              </p>
            </div>

            <div
              class="rounded-xl border border-gray-200 p-3 dark:border-gray-800"
            >
              <p class="text-xs text-gray-500 dark:text-gray-400">Avaliações</p>

              <p class="mt-1 font-semibold text-gray-900 dark:text-white">
                {{ professional.reviewCount }}
              </p>
            </div>

            <div
              class="rounded-xl border border-gray-200 p-3 dark:border-gray-800"
            >
              <p class="text-xs text-gray-500 dark:text-gray-400">Valor</p>

              <p class="mt-1 font-semibold text-gray-900 dark:text-white">
                R$ {{ professional.servicePrice }}
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

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit("update:open", value),
});
</script>
