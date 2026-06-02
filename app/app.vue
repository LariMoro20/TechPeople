<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
<script setup>
useSeoMeta({
  title: "TechPeople — Catálogo de Profissionais de Tecnologia",
  ogTitle: "TechPeople — Catálogo de Profissionais de Tecnologia",
  description:
    "Aplicação web fictícia para listagem e visualização de profissionais de tecnologia, com perfis detalhados, especialidades, senioridade, localização e disponibilidade.",
  ogDescription:
    "Explore um catálogo fictício de profissionais de tecnologia com dados como cargo, habilidades, experiência, localização e detalhes individuais de cada perfil.",
  ogUrl: "https://techpeople.vercel.app",
  ogType: "website",
  ogLocale: "pt_BR",
  ogImage: "https://techpeople.vercel.app/og-image.png",
  twitterCard: "summary_large_image",
  twitterTitle: "TechPeople — Catálogo de Profissionais de Tecnologia",
  twitterDescription:
    "Catálogo fictício de profissionais de tecnologia com perfis detalhados, stacks técnicas, senioridade e disponibilidade.",
  twitterImage: "https://techpeople.vercel.app/og-image.png",
  robots: "index, follow",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://techpeople.vercel.app",
    },
    {
      rel: "preload",
      as: "image",
      href: "/images/og-image.png",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "TechPeople",
        url: "https://techpeople.vercel.app",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Aplicação web simples para catálogo e listagem de profissionais de tecnologia, com visualização de detalhes individuais, habilidades, senioridade e localização.",
        inLanguage: "pt-BR",
        creator: {
          "@type": "Person",
          name: "Daniel Ferreira",
        },
        featureList: [
          "Listagem de profissionais de tecnologia",
          "Visualização de detalhes por profissional",
          "Perfis com habilidades técnicas",
          "Informações de senioridade e experiência",
          "Dados fictícios para desafio técnico frontend",
          "Interface responsiva",
          "SEO configurado para páginas públicas",
        ],
        audience: {
          "@type": "Audience",
          audienceType:
            "Recrutadores, empresas de tecnologia e avaliadores técnicos",
        },
        about: [
          "Frontend Development",
          "Backend Development",
          "Fullstack Development",
          "UI/UX Design",
          "DevOps",
          "Data Engineering",
          "Technology Professionals",
        ],
      }),
    },
  ],
});
</script>
