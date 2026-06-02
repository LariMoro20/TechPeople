# Desafio Técnico Front-end: Catálogo de Profissionais

Olá! 

Seja bem-vindo(a) ao desafio técnico para a posição de **Pessoa Desenvolvedora Front-end** da **Atlas Technologies**.

O objetivo deste desafio é avaliar sua capacidade de desenvolver uma interface front-end a partir de um cenário próximo ao nosso dia a dia de produto.

Mais do que entregar uma tela pronta, queremos entender como você pensa, prioriza, organiza e evolui uma solução front-end.

---

## Objetivo do teste

Seu objetivo será desenvolver uma aplicação web simples de **catálogo/listagem de profissionais**, com visualização de detalhes, utilizando **Vue 3, Nuxt e TypeScript**.

A proposta é criar uma plataforma de catálogo online de profissionais autônomos, com foco em:

- boa organização de código;
- responsividade, preferencialmente com abordagem mobile first;
- qualidade da experiência do usuário;
- atenção a performance e Core Web Vitals;
- clareza nas decisões técnicas.

---

## Página inicial: listagem de profissionais

A aplicação deve conter uma página inicial com a listagem de profissionais.

A listagem deve apresentar, no mínimo, **500 profissionais**. Esses dados podem ser locais, utilizando JSON, ou consumidos por API. Você tem liberdade para criar e organizar essas informações da forma que julgar mais adequada.

Cada profissional da listagem deve conter informações como:

- foto;
- nome;
- profissão;
- valor do serviço prestado;

A listagem também deve contemplar:

- busca por nome ou profissão;
- filtragem de resultados;
- ordenação, por exemplo: preço, avaliação, distância ou outro critério;
- carregamento de cards sob demanda, como paginação, scroll infinito ou outra estratégia.

O layout deve ser responsivo, com boa experiência em dispositivos móveis e desktop.

---

## Perfil do profissional

Ao selecionar um profissional, a pessoa usuária deve conseguir visualizar mais detalhes sobre ele.

Você tem liberdade para escolher o formato dessa visualização, por exemplo:

- página dedicada;
- modal;
- drawer;
- outro formato que considerar adequado.

O perfil deve conter, no mínimo:

- foto;
- nome;
- profissão;
- descrição;
- valor do serviço.
- avaliação média, opcional;
- localização ou distância, opcional.

Também podem ser adicionadas informações complementares, como:

- serviços prestados;
- galeria de fotos;
- avaliações;
- localização;
- disponibilidade;
- outros dados que façam sentido para a experiência proposta.

---

## Liberdade de implementação

Você tem liberdade para escolher o segmento de profissionais que deseja apresentar na aplicação.

Também terá liberdade para construir o design, a experiência de usuário, a organização do repositório e a estrutura da solução da forma que considerar mais adequada.

O escopo possui requisitos mínimos, mas também deixa espaço para que você proponha melhorias e demonstre sua visão técnica, de produto e de experiência.

Queremos avaliar como você se comporta diante de um problema com espaço para tomada de decisão.

Essa liberdade será considerada na avaliação, principalmente em relação a:

- autonomia;
- senso de priorização;
- capacidade de propor melhorias com critério;
- equilíbrio entre qualidade e escopo;
- clareza nas decisões;
- foco na geração de valor para a experiência final.

Não esperamos que você implemente tudo o que poderia ser feito. Esperamos que você priorize bem e saiba defender sua visão.

---

## Tecnologias esperadas

A base do projeto deve utilizar:

- Vue 3;
- Nuxt;
- TypeScript.

Você pode utilizar bibliotecas auxiliares se considerar necessário, mas esteja preparado(a) para explicar suas escolhas.

---

## Organização técnica

Esperamos que sua solução demonstre:

- componentização;
- separação adequada de responsabilidades;
- uso consistente de TypeScript;
- organização de pastas;
- legibilidade;
- facilidade de manutenção;
- clareza nas decisões técnicas.

---

## Sugestões de melhorias opcionais

Caso queira ir além dos requisitos mínimos, você pode considerar:

- utilização de Docker no projeto;
- boas práticas relacionadas a Core Web Vitals;
- melhorias na experiência de navegação e usabilidade;
- estratégias para tornar a interface mais fluida e responsiva;
- preocupações relacionadas à escalabilidade da solução;
- cuidados com acessibilidade e inclusão;
- otimizações voltadas à performance da aplicação;
- estratégias de carregamento e renderização de conteúdo;
- organização de rotas e estados da aplicação;
- persistência e compartilhamento de estado ou navegação;
- instrumentação, métricas ou observabilidade;
- cobertura automatizada de testes;
- documentação técnica e registro de decisões;
- melhorias de manutenibilidade e organização do projeto.

Esses itens são opcionais. A qualidade do que for entregue é mais importante do que a quantidade de funcionalidades.

---

## Performance e Web Vitals

Cuidados com performance serão muito bem avaliados.

Caso você considere pontos como carregamento eficiente, renderização, responsividade, imagens, lazy loading, bundle, Core Web Vitals, SEO técnico ou experiência percebida pelo usuário, descreva essas decisões no README da sua entrega.

Não é obrigatório implementar uma solução altamente otimizada, mas será positivo demonstrar consciência sobre esses aspectos e saber defendê-los na entrevista técnica.

---

## Uso de Inteligência Artificial

O uso de ferramentas de IA é permitido.

Você pode utilizar ferramentas como Claude, GitHub Copilot, Cursor, Codex, Antigravity ou similares para auxiliar em pontos como:

- desenvolvimento;
- debugging;
- refatoração;
- documentação;
- revisão de código;
- testes unitários;
- geração de ideias;
- apoio na tomada de decisão.

No entanto, a entrega precisa ser uma solução desenvolvida em código, dentro deste projeto/repositório.

Não serão aceitas soluções criadas integralmente por ferramentas prontas, no-code ou low-code, como Lovable ou similares.

O motivo é simples: queremos avaliar sua atuação em um contexto semelhante ao de projetos reais, onde a pessoa desenvolvedora precisa trabalhar em uma base existente, compreender estrutura, organizar componentes, tomar decisões técnicas, manter padrões e evoluir código com qualidade.

Caso utilize IA, informe no README do seu projeto quais ferramentas foram utilizadas.

O uso de IA não será avaliado negativamente. O que será avaliado é a forma como você utiliza esse recurso com critério, responsabilidade e domínio técnico.

---

## Entrega do teste técnico

Para concluir a etapa do teste técnico e entregar o desafio aos recrutadores:

1. Faça um fork deste repositório:  
   https://github.com/atlastechnol/atlas-frontend-challenge

2. Desenvolva sua solução no seu próprio GitHub.

3. Atualize o README do seu repositório com as informações que considerar necessárias para apresentar o projeto.

4. Envie sua entrega pelo formulário:  
   https://forms.gle/CCCnwtNzipEgFv7M9

No formulário, envie:

- link do repositório com o código desenvolvido;
- link da solução publicada, na plataforma ou formato que preferir;
- Link de um vídeo, hospedado onde você preferir, com uma explicação breve sobre o que foi desenvolvido no teste técnico. O vídeo deve ter duração máxima de 5 minutos.
  - Não é necessário que o vídeo tenha edição ou produção elaborada. Caso não tenha acesso a uma ferramenta de gravação de tela, você pode gravar a tela com o celular, hospedar o vídeo em um Drive e narrar sua entrega.

---

## Sobre o README da sua entrega

Ao preencher o README do seu projeto, pense nele como a documentação de um projeto em equipe.

O objetivo é garantir que outra pessoa desenvolvedora consiga entender a solução, instalar as dependências e rodar a aplicação localmente com autonomia.

Você pode incluir informações como:

- comandos para instalar e executar o projeto;
- comandos para rodar testes, lint ou build;
- decisões técnicas relevantes;
- organização da solução;
- uso de IA, caso tenha utilizado;
- melhorias futuras;
- observações que considere importantes para avaliação.

---

## Entrevista técnica

Após a entrega, a solução será avaliada pelo time técnico e poderá ser utilizada como base para uma entrevista técnica síncrona.

Nessa conversa, você poderá apresentar sua solução, explicar decisões, comentar priorizações, defender escolhas técnicas e navegar pelo código com o time.

Fique tranquilo(a): essa etapa também será um espaço de troca. Além de conhecermos melhor sua forma de pensar e desenvolver, compartilharemos uma devolutiva técnica com os principais pontos observados na sua entrega e possíveis oportunidades de evolução.
