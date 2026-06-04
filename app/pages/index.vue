<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <UPageHero
      title="TechPeople"
      description="Explore uma listagem fictícia de profissionais de tecnologia, incluindo desenvolvedores frontend, backend, fullstack, UI/UX designers, DevOps e especialistas em dados."
      headline="Profissionais"
      orientation="horizontal"
      :links="links"
    >
      <NuxtImg
        src="/images/image_app.png"
        alt="App screenshot"
        width="600"
        height="338"
        format="webp"
        quality="80"
        loading="lazy"
        class="rounded-lg shadow-2xl ring ring-default"
      />
    </UPageHero>
  </div>
</template>
<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

defineOgImageComponent("OgSiteImage", {
  title: "TechPeople — Catálogo de Profissionais de Tecnologia",
  description:
    "Explore um catálogo fictício de profissionais de tecnologia com perfis detalhados, especialidades, senioridade, stacks técnicas e disponibilidade.",
  tags: ["Frontend", "Backend", "Fullstack", "UI/UX", "DevOps"],
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
const links = ref<ButtonProps[]>([
  {
    label: "Encontrar profissionais",
    to: "/professionals",
    icon: "i-lucide-square-play",
  },
  {
    label: "Ver projeto no Github",
    to: "https://github.com/LariMoro20/atlas-frontend-challenge",
    color: "neutral",
    variant: "subtle",
    trailingIcon: "i-simple-icons-github",
  },
]);
</script>
