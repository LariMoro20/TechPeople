<template>
  <section class="relative isolate py-16 sm:py-24 lg:py-32">
    <UContainer>
      <div class="text-center mb-12 sm:mb-16">
        <p
          class="font-semibold text-primary flex items-center justify-center gap-1.5 mb-3"
        >
          Depoimentos
        </p>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted"
        >
          O que dizem sobre nós
        </h2>
        <p class="mt-6 text-base sm:text-lg text-muted text-balance">
          Empresas e profissionais que já encontraram o match perfeito pela
          plataforma.
        </p>
      </div>

      <UPageColumns class="columns-2 lg:columns-3">
        <UPageCard
          variant="solid"
          icon="i-lucide-star"
          title="Mais de 500 profissionais avaliados"
          description="Cada profissional conta com avaliações reais de clientes anteriores, rating consolidado e histórico de projetos para você tomar a melhor decisão."
          :ui="{ leadingIcon: 'size-10' }"
        />

        <UPageCard
          v-for="(testimonial, index) in testimonials"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{
            description:
              'before:content-[open-quote] after:content-[close-quote]',
          }"
        >
          <template #footer>
            <UUser v-bind="testimonial.user" size="xl" />
          </template>
        </UPageCard>
      </UPageColumns>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const testimonials = ref([
  {
    user: {
      name: "Ana Beatriz Costa",
      description: "CTO na StartupBR",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/499550?v=4",
        alt: "Ana Beatriz Costa",
        loading: "lazy" as const,
      },
    },
    quote:
      "Encontrei um desenvolvedor Full Stack incrível em menos de 24 horas. O nível dos profissionais cadastrados é impressionante.",
  },
  {
    user: {
      name: "Rafael Mendes",
      description: "Founder na Agência Digital",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/216296?v=4",
        alt: "Rafael Mendes",
        loading: "lazy" as const,
      },
    },
    quote:
      "Os filtros por especialidade e cidade tornaram a busca muito objetiva. Contratei uma UX Designer para um projeto de 3 meses e superou todas as expectativas.",
  },
  {
    user: {
      name: "Juliana Freitas",
      description: "Product Manager na FinTech XYZ",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/527849?v=4",
        alt: "Juliana Freitas",
        loading: "lazy" as const,
      },
    },
    quote:
      "A transparência nas avaliações e o histórico de cada profissional me deram segurança na contratação. Definitivamente minha plataforma favorita.",
  },
  {
    user: {
      name: "Lucas Oliveira",
      description: "CEO na SaaS Ventures",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/1769417?v=4",
        alt: "Lucas Oliveira",
        loading: "lazy" as const,
      },
    },
    quote:
      "Montei um time de desenvolvimento completo em uma semana. Backend, frontend e DevOps — todos encontrados aqui. Processo ágil e sem complicação.",
  },
  {
    user: {
      name: "Camila Torres",
      description: "Head de Tecnologia",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/15716057?v=4",
        alt: "Camila Torres",
        loading: "lazy" as const,
      },
    },
    quote:
      "O filtro de disponibilidade é o diferencial. Consigo ver quem está disponível agora e agilizar muito o processo de alocação.",
  },
]);
</script>
