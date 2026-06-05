<template>
  <UPageSection
    headline="Simples assim"
    title="Como funciona"
    description="Em três passos você encontra o profissional certo para o seu projeto."
    class="bg-white dark:bg-gray-900"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div
        v-for="(step, index) in steps"
        :key="step.title"
        class="flex flex-col items-center text-center gap-4"
      >
        <div class="relative">
          <div class="flex items-center justify-center size-16 rounded-2xl bg-primary/10 dark:bg-primary/20">
            <UIcon :name="step.icon" class="size-8 text-primary" />
          </div>
          <span class="absolute -top-2 -right-2 flex items-center justify-center size-6 rounded-full bg-primary text-white text-xs font-bold">
            {{ index + 1 }}
          </span>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ step.title }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ step.description }}</p>
      </div>
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
const steps = [
  {
    title: "Explore o catálogo",
    description: "Acesse a listagem completa de profissionais de tecnologia disponíveis na plataforma.",
    icon: "i-lucide-search",
  },
  {
    title: "Filtre por especialidade",
    description: "Use os filtros para refinar por área, cidade, faixa de preço ou avaliação mínima.",
    icon: "i-lucide-sliders-horizontal",
  },
  {
    title: "Veja o perfil completo",
    description: "Acesse o perfil detalhado com bio, stack técnica, disponibilidade e avaliações.",
    icon: "i-lucide-user-check",
  },
];
</script>
