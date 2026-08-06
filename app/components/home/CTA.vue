<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <UPageCTA
      title="Pronto para encontrar seu próximo talento?"
      description="Explore o catálogo e conecte-se com profissionais de tecnologia prontos para o seu projeto."
      :links="links"
      variant="subtle"
    />
  </div>
</template>

<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

const links: ButtonProps[] = [
  {
    label: "Encontrar profissionais",
    to: "/professionals",
    icon: "i-lucide-square-play",
  },
  {
    label: "Ver no GitHub",
    to: "https://github.com/LariMoro20/TechPeople",
    color: "neutral",
    variant: "subtle",
    trailingIcon: "i-simple-icons-github",
  },
];
</script>
