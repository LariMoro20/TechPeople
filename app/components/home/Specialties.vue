<script setup lang="ts">
import type { ProfessionCount } from "~/types";

const props = defineProps<{ professions: ProfessionCount[] }>();
</script>

<template>
  <section class="relative isolate py-16 sm:py-24 lg:py-32">
    <UContainer>
      <div class="text-center mb-12 sm:mb-10">
        <p
          class="font-semibold text-primary flex items-center justify-center gap-1.5 mb-3"
        >
          Especialidades
        </p>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted"
        >
          Explore por especialidade
        </h2>
        <p class="mt-6 text-base sm:text-lg text-muted text-balance">
          Navegue pelas principais áreas de tecnologia e encontre o profissional
          ideal para o seu projeto.
        </p>
      </div>

      <UCarousel
        v-slot="{ item }"
        loop
        auto-scroll
        :items="props.professions"
        :ui="{
          item: 'basis-1/2 lg:basis-1/4',
          container: 'items-stretch',
          viewport: 'py-4',
        }"
      >
        <NuxtLink
          :to="{ path: '/professionals', query: { professions: item.name } }"
          class="h-full block"
        >
          <UCard
            :title="item.name"
            :description="`${item.count} profissionais`"
            highlight
            class="h-full"
            :ui="{
              root: 'flex flex-col justify-center',
              header: 'h-full flex flex-col justify-center',
            }"
          />
        </NuxtLink>
      </UCarousel>
    </UContainer>
  </section>
</template>
