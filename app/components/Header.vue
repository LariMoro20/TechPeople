<template>
  <UHeader
    mode="slideover"
    :menu="{
      side: 'right',
      ui: {
        content: 'w-[60vw] max-w-sm',
      },
    }"
  >
    <template #title>
      <NuxtLink
        to="/"
        aria-label="TechPeople"
        class="flex items-center cursor-pointer"
      >
        <UColorModeImage
          light="/images/logo_light.png"
          dark="/images/logo_dark.png"
          alt="TechPeople - Catalogo de freelas"
          class="h-10 w-auto"
          loading="eager"
        />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items" class="hidden lg:flex" />

    <template #right>
      <UColorModeButton class="cursor-pointer" />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          class="cursor-pointer"
          to="https://github.com/LariMoro20/atlas-frontend-challenge"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2" />

      <div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
        <UButton
          color="neutral"
          variant="soft"
          to="https://github.com/LariMoro20/atlas-frontend-challenge"
          target="_blank"
          icon="i-simple-icons-github"
          label="GitHub"
          class="w-full justify-center"
        />
      </div>
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
    active: route.path === "/",
  },
  {
    label: "Profissionais",
    to: "/professionals",
    active: route.path.startsWith("/professionals"),
  },
  // {
  //   label: "Sobre",
  //   to: "/about",
  //   active: route.path.startsWith("/about"),
  // },
]);
</script>
