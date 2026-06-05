<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="mb-6">
        <UButton
          to="/professionals"
          color="neutral"
          variant="ghost"
          icon="i-heroicons-arrow-left"
          label="Voltar para profissionais"
        />
      </div>

      <div v-if="status === 'error' || !professional" class="text-center py-16">
        <UIcon
          name="i-heroicons-user-circle"
          class="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4"
        />
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Profissional não encontrado
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          O perfil que você está procurando não existe ou foi removido.
        </p>
        <UButton
          to="/professionals"
          color="primary"
          label="Ver todos os profissionais"
        />
      </div>

      <div v-else class="space-y-6">
        <UCard>
          <div class="flex items-start gap-4">
            <NuxtImg
              :src="professional.avatar"
              :alt="professional.name"
              width="96"
              height="96"
              format="webp"
              quality="80"
              loading="eager"
              fetchpriority="high"
              class="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover shrink-0"
            />
            <div class="min-w-0 flex-1">
              <div
                class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
              >
                <div class="min-w-0">
                  <h1
                    class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    {{ professional.name }}
                  </h1>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ professional.profession }}
                  </p>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                  <UBadge
                    :color="professional.available ? 'success' : 'neutral'"
                    variant="subtle"
                    size="sm"
                    class="w-fit"
                  >
                    {{ professional.available ? "Disponível" : "Indisponível" }}
                  </UBadge>
                  <UButton
                    color="neutral"
                    variant="ghost"
                    :icon="
                      isFavorite
                        ? 'i-heroicons-heart-solid'
                        : 'i-heroicons-heart'
                    "
                    :aria-label="
                      isFavorite
                        ? 'Remover dos favoritos'
                        : 'Adicionar aos favoritos'
                    "
                    :class="
                      isFavorite
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-400 hover:text-red-500'
                    "
                    @click="toggleFavorite"
                  />
                </div>
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
                    {{ professional.rating }}
                  </span>
                  <span class="text-gray-500 dark:text-gray-400">
                    ({{ professional.reviewCount }} avaliações)
                  </span>
                </div>
                <div
                  class="hidden sm:block text-gray-300 dark:text-gray-700"
                  aria-hidden="true"
                >
                  •
                </div>
                <div>
                  <span class="font-semibold text-gray-900 dark:text-white">
                    {{ formatCurrency(professional.servicePrice) }}
                  </span>
                  <span class="text-gray-500 dark:text-gray-400">/sessão</span>
                </div>
                <div
                  class="hidden sm:block text-gray-300 dark:text-gray-700"
                  aria-hidden="true"
                >
                  •
                </div>
                <div
                  class="flex items-center gap-1 text-gray-500 dark:text-gray-400"
                >
                  <UIcon name="i-heroicons-map-pin" class="h-4 w-4 shrink-0" />
                  <span>{{ professional.city }}</span>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <div class="grid grid-cols-3 gap-3">
          <div
            class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3"
          >
            <p class="text-xs text-gray-500 dark:text-gray-400">Avaliação</p>
            <p class="mt-1 font-semibold text-gray-900 dark:text-white">
              {{ professional.rating }} / 5
            </p>
          </div>
          <div
            class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3"
          >
            <p class="text-xs text-gray-500 dark:text-gray-400">Avaliações</p>
            <p class="mt-1 font-semibold text-gray-900 dark:text-white">
              {{ professional.reviewCount }}
            </p>
          </div>
          <div
            class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3"
          >
            <p class="text-xs text-gray-500 dark:text-gray-400">Valor/sessão</p>
            <p class="mt-1 font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(professional.servicePrice) }}
            </p>
          </div>
        </div>

        <UCard>
          <h2 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            Sobre o profissional
          </h2>
          <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {{ professional.bio }}
          </p>
        </UCard>

        <UCard v-if="professional.tags.length">
          <h2 class="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
            Especialidades
          </h2>
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
        </UCard>

        <UCard>
          <h2 class="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
            Projetos recentes
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <UCard
              v-for="project in projects"
              :key="project.seed"
              :ui="{ header: 'p-0', body: 'p-3' }"
              class="group overflow-hidden"
            >
              <template #header>
                <div
                  class="aspect-[3/2] overflow-hidden bg-gray-100 dark:bg-gray-800"
                >
                  <NuxtImg
                    :src="`https://picsum.photos/seed/${project.seed}/600/400`"
                    :alt="project.title"
                    width="600"
                    height="400"
                    format="webp"
                    quality="80"
                    loading="lazy"
                    class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </template>
              <p
                class="text-xs font-medium text-gray-700 dark:text-gray-300 truncate"
              >
                {{ project.title }}
              </p>
            </UCard>
          </div>
        </UCard>

        <div class="flex justify-end">
          <UButton
            color="primary"
            icon="i-heroicons-chat-bubble-left-right"
            label="Tenho interesse"
            size="lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Professional } from "~/types";
import { getProfessionalById } from "~/services/professionals.service";

const route = useRoute();
const id = route.params.id as string;

const { data: professional, status } = await useAsyncData<Professional>(
  `professional-${id}`,
  () => getProfessionalById(id),
);

const favoriteProfessionalsStore = useFavoriteProfessionalsStore();

const isFavorite = computed(() =>
  professional.value
    ? favoriteProfessionalsStore.isFavorite(professional.value.id)
    : false,
);

function toggleFavorite() {
  if (!professional.value) return;
  favoriteProfessionalsStore.toggleFavorite(professional.value.id);
}

const PROJECT_PREFIXES = [
  "Plataforma de",
  "Dashboard de",
  "Sistema de",
  "App de",
  "Portal de",
  "Ferramenta de",
];

const projects = computed(() => {
  if (!professional.value) return [];
  const { id, tags, profession } = professional.value;
  return Array.from({ length: 6 }, (_, i) => ({
    seed: `${id}-${i}`,
    title: `${PROJECT_PREFIXES[i % PROJECT_PREFIXES.length]} ${tags[i % tags.length] ?? profession}`,
  }));
});

defineOgImage("OgSiteImage", {
  title: professional.value
    ? `${professional.value.name} — TechPeople`
    : "Profissional — TechPeople",
  description: professional.value?.bio ?? "",
  tags: professional.value?.tags.slice(0, 5) ?? [],
});

useSeoMeta({
  titleTemplate: "%s",
  title: professional.value
    ? `${professional.value.name} — TechPeople`
    : "Profissional — TechPeople",
  description: professional.value?.bio ?? "",
  ogTitle: professional.value
    ? `${professional.value.name} — TechPeople`
    : "Profissional — TechPeople",
  ogDescription: professional.value?.bio ?? "",
});
</script>
