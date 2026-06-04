# TechPeople — Atlas Frontend Challenge

Catálogo fictício de profissionais de tecnologia com busca, filtros, ordenação, paginação e favoritos.

---

## Como executar o projeto

**Requisitos:** Node.js 18+ e pnpm instalados.

```bash
# Instalar dependências
pnpm install

# Rodar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Visualizar o build localmente
pnpm preview

# Lint
pnpm lint
```

A aplicação em desenvolvimento estará disponível em `http://localhost:3000`.

---

## Organização da solução

```
app/
├── components/
│   ├── professionals/       # Componentes da listagem de profissionais
│   │   ├── Card.vue         # Card individual do profissional
│   │   ├── List.vue         # Grade com skeleton, estado vazio e paginação
│   │   ├── Filters.vue      # Painel de filtros (busca, profissão, cidade, preço, avaliação)
│   │   └── DetailsModal.vue # Modal com perfil completo do profissional
│   ├── Header.vue
│   └── Footer.vue
├── composables/
│   ├── useProfessionals.ts        # Filtros, ordenação, paginação e sync com URL
│   └── useProfessionalsFilters.ts # Dados e opções dos filtros (facets)
├── pages/
│   ├── index.vue            # Landing page
│   └── professionals.vue    # Página de listagem
├── stores/
│   └── useFavoriteProfessionalsStore.ts  # Favoritos com persistência localStorage
├── plugins/
│   └── favorites.client.ts  # Hidratação dos favoritos no lado do cliente
├── utils/
│   └── currency.ts          # Formatação de moeda (Intl.NumberFormat)
└── types/
    └── index.d.ts           # Interfaces e tipos globais

server/
├── api/professionals/
│   ├── index.get.ts         # GET /api/professionals (busca, filtros, ordenação, paginação)
│   ├── facets.get.ts        # GET /api/professionals/facets (opções dos filtros)
│   └── [id].get.ts          # GET /api/professionals/:id
└── utils/
    ├── professionalsRepository.ts  # Carregamento, indexação e facets dos dados
    ├── professionals.schema.ts     # Schemas Zod para validação
    └── text.ts                     # Normalização de texto para busca sem acentos
```

---

## Decisões técnicas

**Servidor local com Nitro**

O volume de dados do desafio inviabilizava uma solução puramente client-side sem perda de performance. Optei por criar uma API local usando o servidor Nitro (embutido no Nuxt), simulando uma API real com suporte a busca, filtros combinados, ordenação e paginação server-side.

**Validação com Zod**

Todos os parâmetros recebidos pela API são validados com Zod antes de qualquer processamento. Isso garante segurança contra inputs malformados e retorna erros 400 com mensagens controladas em vez de falhas inesperadas.

**Estratégia de cache por rota**

As rotas da API têm cache configurado de forma diferenciada. O endpoint `/api/professionals` não é cacheado pois os resultados variam por filtros, ordenação e página. Já o `/api/professionals/facets` tem cache de 1 hora, pois retorna dados estáticos derivados do JSON em memória e não muda sem um novo deploy.

**Composables dedicados**

A lógica da aplicação foi separada em composables com responsabilidades claras. `useProfessionals` gerencia filtros, ordenação, paginação e sincronização com a URL. `useProfessionalsFilters` cuida dos dados e opções dos filtros com debounce no campo de busca e no slider de preço para evitar requisições excessivas.

**Favoritos com Pinia**

A funcionalidade de favoritar profissionais foi implementada com Pinia, com persistência via localStorage e hidratação no lado do cliente. O estado é global e acessível em qualquer parte da aplicação.

**URL como fonte de estado**

Filtros, ordenação e paginação são refletidos na URL em tempo real. A ideia surgiu da percepção de que uma busca com filtros aplicados deveria ser compartilhável: ao copiar a URL e enviar para alguém, a página abre exatamente no mesmo estado. Também permite usar o botão de voltar do navegador para desfazer uma filtragem, o que melhora a experiência de navegação de forma natural.

**Mobile-first com Nuxt UI e Tailwind CSS**

A interface foi construída com abordagem mobile-first, partindo sempre do layout para telas menores e expandindo progressivamente para desktop. O Tailwind CSS foi utilizado para controle preciso do layout responsivo com breakpoints semânticos (`sm`, `lg`, `xl`). O Nuxt UI forneceu os componentes base (cards, badges, modais, paginação, sliders) já acessíveis e responsivos, reduzindo a quantidade de código necessário e mantendo consistência visual em todas as telas.

**Tipagem global com imports explícitos**

Os tipos da aplicação estão declarados em `app/types/index.d.ts` e incluídos globalmente via `tsconfig.json`, o que os tornaria disponíveis em qualquer arquivo sem necessidade de import. Ainda assim, optei por manter os imports explícitos (`import type { Professional } from '~/types'`) para deixar claro a origem de cada tipo ao ler o código, facilitando a navegação e o entendimento por outros desenvolvedores.

**NuxtSEO**

O módulo NuxtSEO foi utilizado para configurar meta tags, Open Graph e dados estruturados (JSON-LD) de forma profissional e consistente em todas as páginas.

---

## Performance e Core Web Vitals

**SSR com Nuxt**

O uso de Server-Side Rendering garante que o conteúdo principal já chegue renderizado ao navegador, contribuindo diretamente para um LCP menor e melhor experiência percebida na primeira carga.

**Skeleton loading**

Os cards exibem um skeleton durante o carregamento, evitando layout shift (CLS) e comunicando ao usuário que o conteúdo está sendo carregado sem travar a interface.

**Debounce em inputs custosos**

O campo de busca e o slider de faixa de preço têm debounce antes de disparar requisições à API, evitando chamadas excessivas enquanto o usuário ainda está interagindo.

**Cache diferenciado por rota**

O endpoint de facets é cacheado por 1 hora no servidor, eliminando processamento repetido para dados que não mudam. O endpoint de listagem não é cacheado pois os resultados variam por filtros.

**Otimização de imagens**

O módulo `@nuxt/image` está instalado e disponível para otimização automática de imagens com lazy loading e geração de formatos modernos como WebP.

**Acessibilidade**

Os componentes utilizam HTML semântico, hierarquia de headings consistente e `aria-label` nos botões de ação como favoritar e fechar modal. O Nuxt UI, base dos componentes interativos, já entrega acessibilidade via teclado e atributos ARIA nos elementos como modais, selects e paginação.

---

## Decisões de priorização

**Paginação em vez de scroll infinito**

Com 500 profissionais, o scroll infinito geraria uma experiência sem fim e sem referência de posição para o usuário. A paginação permite saber exatamente onde se está na listagem, navegar diretamente para uma página específica, e é compatível com a sincronização de estado na URL — o que o scroll infinito tornaria muito mais complexo de implementar de forma consistente.

---

## Melhorias futuras

**Substituição do `useFetch` por Pinia Colada**

Atualmente o `useFetch` do Nuxt gerencia as requisições à API. Uma evolução natural seria migrar para o [Pinia Colada](https://pinia-colada.esm.dev/), biblioteca de data fetching integrada ao Pinia. A principal vantagem é o sistema de cache baseado em chave: cada combinação de filtros gera uma key única, e respostas já buscadas são reutilizadas sem nova requisição. Isso elimina fetches redundantes ao navegar entre páginas de resultados ou desfazer filtros, melhorando performance e experiência percebida.

**Dados de contato dos profissionais**

Hoje o modal exibe as informações do perfil mas não oferece um caminho claro para contato. Adicionar email, WhatsApp ou link de agendamento transformaria o catálogo em uma ferramenta de conexão real entre cliente e profissional.

**Página dedicada por profissional**

O perfil atual é exibido em modal. Uma página dedicada (`/professionals/:id`) permitiria URLs compartilháveis por profissional, mais espaço para conteúdo como galeria de trabalhos, avaliações detalhadas e histórico, além de melhorar o SEO individual de cada perfil.

**Área do profissional**

Implementar um fluxo de cadastro onde o próprio profissional cria e gerencia seu perfil, com autenticação, edição de dados e controle de disponibilidade. Isso transformaria o projeto de um catálogo estático em uma plataforma de dois lados.

**Mapa de localização**

Adicionar um mapa interativo no perfil do profissional exibindo sua localidade, aproveitando o campo `city` já disponível nos dados. Com coordenadas reais seria possível também ativar a ordenação por distância, já preparada na API mas ainda sem dados geográficos para suportar.

**Backend próprio com Supabase**

O projeto já foi pensado com essa evolução em mente. Toda a comunicação com dados passa pelos arquivos em `app/services/`, que hoje apontam para a API local Nitro. Migrar para um backend real com Supabase (banco de dados, autenticação e storage) exigiria apenas alterar esses services, sem impacto nos composables, componentes ou páginas.

---

## Uso de IA

O Claude Code foi utilizado como assistente durante o desenvolvimento para auxílio em decisões técnicas, resolução de problemas, revisão de código, escrita eficiente de componentes e geração das informações de SEO como keywords e descrições.

O ChatGPT foi utilizado para geração das logos do projeto e dos dados fictícios de profissionais (nomes, bios, especialidades, avaliações e demais informações do JSON de mock).
