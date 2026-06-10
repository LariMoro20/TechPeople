<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }} Larissa Santos
      </p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton
        icon="i-simple-icons-linkedin"
        color="neutral"
        variant="ghost"
        to="https://www.linkedin.com/in/lari-moro-ss/"
        target="_blank"
        class="cursor-pointer"
        aria-label="Linkedin"
      />
      <UButton
        icon="i-simple-icons-instagram"
        color="neutral"
        class="cursor-pointer"
        variant="ghost"
        to="https://www.instagram.com/larisantos.dev/"
        target="_blank"
        aria-label="Instagram"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        class="cursor-pointer"
        variant="ghost"
        to="https://github.com/LariMoro20"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items: NavigationMenuItem[] = [
  {
    label: "Início",
    to: "/",
  },
  {
    label: "Profissionais",
    to: "/professionals",
  },
  // {
  //   label: "Sobre",
  //   to: "/about",
  // },
];
</script>
