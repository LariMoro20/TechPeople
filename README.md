# TechPeople

Catálogo fictício de profissionais de tecnologia com busca, filtros, ordenação, paginação e favoritos.

Projeto pessoal de portfólio, construído para praticar Nuxt 4, SSR, API com Nitro, testes (Vitest e Playwright), SEO e performance em um cenário realista de listagem com volume de dados. Todos os dados são fictícios.

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

# Testes unitários e de integração (Vitest)
pnpm test
pnpm test:watch

# Testes end-to-end (Playwright)
pnpm test:e2e
pnpm test:e2e:ui
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
│   ├── OgImage/
│   │   ├── OgSiteImage.satori.vue    # OG image das páginas institucionais
│   │   └── OgProfessional.satori.vue # OG image personalizada por profissional
│   ├── Header.vue
│   └── Footer.vue
├── composables/
│   ├── useProfessionals.ts        # Filtros, ordenação, paginação e sync com URL
│   └── useProfessionalsFilters.ts # Dados e opções dos filtros (facets)
├── pages/
│   ├── index.vue               # Landing page
│   ├── professionals.vue       # Página de listagem
│   └── professional/
│       └── [id].vue            # Perfil dedicado do profissional
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

tests/
├── unit/          # Funções puras, schema Zod e store de favoritos (Vitest)
└── integration/   # Endpoints de profissionais: listagem, contagens, facets e detalhe (Vitest)

e2e/
├── favorites-persistence.spec.ts          # Fluxo de favoritar + reload (Playwright)
├── filters-url-sync.spec.ts               # Filtro de busca sincronizado com a URL + reload (Playwright)
└── home-to-professionals-navigation.spec.ts  # Home -> especialidade -> listagem já filtrada (Playwright)
```

---

## Decisões técnicas

**Servidor local com Nitro**

O volume de dados do projeto inviabilizava uma solução puramente client-side sem perda de performance. Optei por criar uma API local usando o servidor Nitro (embutido no Nuxt), simulando uma API real com suporte a busca, filtros combinados, ordenação e paginação server-side.

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

**NuxtSEO e OG Image dinâmica**

O módulo NuxtSEO foi utilizado para configurar meta tags, Open Graph e dados estruturados (JSON-LD) de forma profissional e consistente em todas as páginas. A imagem de Open Graph é gerada dinamicamente via `defineOgImage`, que renderiza um componente Vue com as cores e identidade visual da aplicação. Há dois componentes distintos: `OgSiteImage.satori.vue` para as páginas institucionais e de listagem, e `OgProfessional.satori.vue` para a página de perfil — este exibe o nome do profissional em destaque no lugar do branding, com profissão, bio e especialidades. Ambos são renderizados via Satori no servidor, sem necessidade de gerar imagens estáticas manualmente.

**Página dedicada por profissional**

Além do modal de perfil rápido acessível pela listagem, cada profissional tem uma página dedicada em `/professional/:id`. Essa rota permite URLs compartilháveis por profissional, exibe avatar, stats, bio, especialidades e uma galeria de projetos recentes, e conta com OG image personalizada com o nome do profissional em destaque.

---

## Testes

**Vitest para lógica e integração**

Funções puras (normalização de busca, formatação de moeda), validação de schemas com Zod e a store de favoritos (Pinia) são cobertas por testes unitários. Os endpoints de profissionais (`/api/professionals`, `/counts`, `/facets` e `/:id`) têm testes de integração que exercitam filtros combinados, ordenação, paginação, agregações e o caso de ID inexistente direto contra os dados reais do repositório, sem precisar subir um servidor HTTP.

**Playwright para o fluxo crítico de usuário**

O fluxo de favoritar um profissional e recarregar a página é validado de ponta a ponta com Playwright, simulando o que um usuário realmente faria no navegador. Foi justamente esse teste que revelou um bug real de hydration mismatch no plugin de favoritos (`app/plugins/favorites.client.ts`): o estado era hidratado antes do Vue concluir a comparação entre o HTML do servidor e o do cliente, deixando a UI presa no estado não favoritado mesmo com o dado correto salvo. Corrigido adiando a hidratação com `onNuxtReady`.

Outro teste cobre o filtro de busca sincronizado com a URL, garantindo que aplicar um filtro, recarregar a página e manter o estado funcione de ponta a ponta. Esse teste expôs uma armadilha de timing: a página busca profissionais e facets dentro do `<Suspense>` do Nuxt, então a hidratação real só termina quando esses fetches resolvem. Interagir antes disso faz o Vue sobrescrever qualquer valor digitado quando a hidratação finalmente sincroniza o DOM. A correção foi esperar `networkidle` antes de interagir com a página no teste.

Um terceiro teste cobre a navegação da home até a listagem: clicar numa especialidade no carrossel leva para `/professionals` já filtrado por aquela profissão, com o checkbox correspondente marcado nos filtros.

**Execução serial contra o servidor de dev**

Os testes E2E rodam contra `pnpm dev` (Vite), que recompila módulos sob demanda. Executá-los em paralelo faz duas páginas competirem pela mesma compilação/HMR, atrasando a hidratação além do que os testes esperam e gerando falhas intermitentes. Por isso o `playwright.config.ts` força execução serial (`workers: 1`). Em um pipeline de CI que builda a aplicação antes (`pnpm build` + `pnpm preview`), a paralelização volta a ser segura.

**Por que essa combinação**

A maior parte da lógica de negócio é testada com Vitest, que é rápido e não depende de browser. Os testes end-to-end ficam restritos a fluxos críticos com efeitos colaterais reais (persistência em `localStorage`, hidratação), evitando uma suíte de E2E lenta e cara de manter.

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

**Otimização de imagens com NuxtImg**

Todas as imagens da aplicação utilizam o componente `<NuxtImg>` do módulo `@nuxt/image`. As vantagens em relação ao `<img>` nativo são a conversão automática para WebP (formato moderno com melhor compressão), controle de qualidade, lazy loading nativo e redimensionamento sob demanda. Isso reduz o peso das imagens transferidas e contribui diretamente para um LCP menor e melhor pontuação no Core Web Vitals.

**Acessibilidade**

Os componentes utilizam HTML semântico, hierarquia de headings consistente e `aria-label` nos botões de ação como favoritar e fechar modal. O Nuxt UI, base dos componentes interativos, já entrega acessibilidade via teclado e atributos ARIA nos elementos como modais, selects e paginação.

---

## Decisões de priorização

**Paginação em vez de scroll infinito**

Com 500 profissionais, o scroll infinito geraria uma experiência sem fim e sem referência de posição para o usuário. A paginação permite saber exatamente onde se está na listagem, navegar diretamente para uma página específica, e é compatível com a sincronização de estado na URL — o que o scroll infinito tornaria muito mais complexo de implementar de forma consistente.

---

## Melhorias futuras

**Páginas institucionais**

Implementar as páginas `/about`, `/services`, `/contact` e `/privacy-policy`, completando a estrutura de navegação já prevista no header e footer da aplicação.

**Substituição do `useFetch` por Pinia Colada**

Atualmente o `useFetch` do Nuxt gerencia as requisições à API. Uma evolução natural seria migrar para o [Pinia Colada](https://pinia-colada.esm.dev/), biblioteca de data fetching integrada ao Pinia. A principal vantagem é o sistema de cache baseado em chave: cada combinação de filtros gera uma key única, e respostas já buscadas são reutilizadas sem nova requisição. Isso elimina fetches redundantes ao navegar entre páginas de resultados ou desfazer filtros, melhorando performance e experiência percebida.

**Dados de contato dos profissionais**

Hoje o modal exibe as informações do perfil mas não oferece um caminho claro para contato. Adicionar email, WhatsApp ou link de agendamento transformaria o catálogo em uma ferramenta de conexão real entre cliente e profissional.

**Área do profissional**

Implementar um fluxo de cadastro onde o próprio profissional cria e gerencia seu perfil, com autenticação, edição de dados e controle de disponibilidade. Isso transformaria o projeto de um catálogo estático em uma plataforma de dois lados.

**Mapa de localização**

Adicionar um mapa interativo no perfil do profissional exibindo sua localidade, aproveitando o campo `city` já disponível nos dados. Com coordenadas reais seria possível também ativar a ordenação por distância, já preparada na API mas ainda sem dados geográficos para suportar.

**Backend próprio com Supabase**

O projeto já foi pensado com essa evolução em mente. Toda a comunicação com dados passa pelos arquivos em `app/services/`, que hoje apontam para a API local Nitro. Migrar para um backend real com Supabase (banco de dados, autenticação e storage) exigiria apenas alterar esses services, sem impacto nos composables, componentes ou páginas.

---

## Ferramentas utilizadas

- [OpenGraph.xyz](https://www.opengraph.xyz/) — validação e preview das meta tags Open Graph
- [Favicon.io](https://favicon.io/) — geração dos favicons e arquivos de ícone
- [PageSpeed Insights](https://pagespeed.web.dev/) — análise de performance e Core Web Vitals

---

## Uso de IA

O Claude Code foi utilizado como assistente durante o desenvolvimento para auxílio em decisões técnicas, resolução de problemas, revisão de código, escrita eficiente de componentes e geração das informações de SEO como keywords e descrições.

O MCP do Playwright foi usado junto ao Claude Code para inspecionar a aplicação rodando localmente em tempo real durante a investigação de bugs — navegando, clicando e lendo `localStorage`/console do navegador diretamente na conversa. Foi assim que o bug de hidratação dos favoritos (ver seção [Testes](#testes)) foi diagnosticado antes de ser corrigido e coberto por um teste E2E.

O MCP do Context7 foi usado para consultar documentação atualizada de bibliotecas (Nuxt, Tailwind v4, Pinia, entre outras) durante o desenvolvimento, evitando depender de informações desatualizadas do treinamento da IA.

O repositório tem duas skills customizadas do Claude Code em `.claude/skills/`: `ds-commit`, que formaliza o padrão de commit do projeto (`[branch] tipo: descrição`, sem corpo nem co-autoria), e `review-branch`, um checklist de revisão de segurança, qualidade e boas práticas Vue 3 antes de mergear uma branch.

O ChatGPT foi utilizado para geração das logos do projeto e dos dados fictícios de profissionais (nomes, bios, especialidades, avaliações e demais informações do JSON de mock).
