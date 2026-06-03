<template>
  <UHeader>
    <template #title>
      <NuxtLink to="/" aria-label="TechPeople" class="flex items-center">
        <UColorModeImage
          light="/images/logo_light.png"
          dark="/images/logo_dark.png"
          alt="TechPeople - Catalogo de freelas"
          class="h-10 w-auto"
          loading="eager"
        />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/LariMoro20/atlas-frontend-challenge"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Início",
    to: "/",
  },
  {
    label: "Profissionais",
    to: "/professionals",
  },
  {
    label: "Sobre",
    to: "/about",
  },
]);
</script>
