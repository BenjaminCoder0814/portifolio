# Technical Challenges

The hard problems in this system and how they were handled.

> ⚠️ **Benjamin — este é o documento que só você pode escrever.**
> Eu deixei a estrutura e identifiquei os três desafios que a arquitetura do sistema
> *implica* que existiram. Mas as soluções, os erros e o que você tentou antes de acertar
> estão na sua cabeça, não na documentação.
>
> **Um Staff Engineer lê este arquivo primeiro.** Não porque quer ver que você é bom,
> mas porque quer ver *como você pensa quando algo não funciona*. Um documento que só
> descreve sucessos não responde essa pergunta.

---

## Challenge 1 — Concurrent stock movements across entities

### The problem
Two operators can record movements on the same product at the same time. A transfer between legal entities is two writes that must both succeed or both fail — if one lands and the other doesn't, two companies' ledgers disagree and there is no way to tell which is right.

This is the failure mode the spreadsheets had. Rebuilding it in software would have defeated the purpose.

### How it was solved

<!-- TODO — escreva você. Perguntas que guiam:
     - Você usa transação de banco? Lock pessimista? Otimista com retry?
     - O snippet no seu portfólio mostra `db.acquire(itemId)` — é lock real ou ilustrativo?
     - O que acontece se dois operadores tentam transferir o mesmo item simultaneamente?
     - Você já viu isso falhar em produção? O que aconteceu?

     Se a resposta for "confio na transação do MySQL e nunca testei concorrência de verdade",
     escreva isso. É honesto, é comum, e vira um item de Roadmap. -->

### What I'd do differently

<!-- TODO -->

---

## Challenge 2 — Keeping every query entity-aware

### The problem
Every stock query must filter by legal entity. A query that forgets the filter doesn't crash — it silently returns another company's data. It's the most dangerous bug class in the system precisely because it fails quietly.

### How it was solved

<!-- TODO — escreva você:
     - Existe uma camada (repository, helper, middleware) que força o filtro?
     - Ou depende de disciplina em cada query?
     - Você já escreveu uma query sem o filtro e descobriu depois?

     Se hoje é disciplina manual, escreva isso e coloque a solução no Roadmap.
     Reconhecer um risco arquitetural conhecido e não mitigado é sinal de maturidade;
     afirmar que ele não existe é sinal do contrário. -->

### What I'd do differently

<!-- TODO -->

---

## Challenge 3 — Designing for users who don't want software

### The problem
The users are warehouse operators and salespeople. They didn't ask for a system; they had a process that worked badly but that they knew. Adoption was not guaranteed by the software being better — it was guaranteed by the software being *faster than what they already did*, on the first day, without training.

High information density made this harder: operators need many numbers on one screen, but density and clarity pull in opposite directions.

### How it was solved

<!-- TODO — escreva você:
     - Como você descobriu o que eles realmente precisavam ver?
     - Sentou com eles? Observou o processo?
     - Qual foi a primeira versão que eles rejeitaram, e por quê?
     - O que você removeu da interface porque ninguém usava?

     Este é o desafio mais interessante do sistema para um Engineering Manager,
     porque é onde engenharia encontra produto. Não o subestime. -->

### What I'd do differently

<!-- TODO -->

---

## Challenge 4 — <!-- TODO: o seu -->

<!-- Adicione o desafio que MAIS te custou tempo, mesmo que pareça pequeno.
     Frequentemente é o mais interessante de ler: um bug de fuso horário,
     um cálculo de cubagem que arredondava errado, uma migração que quebrou dados.

     Regra: se te custou mais de um dia, vale um registro aqui. -->

---

## How to write these well

| Faça | Não faça |
|---|---|
| Descreva o que você tentou **antes** de acertar | Apresentar só a solução final |
| Nomeie o que ainda está frágil | Sugerir que está tudo resolvido |
| Use números quando existirem | Inventar números |
| Escreva "não sei" quando for verdade | Preencher lacuna com plausibilidade |

> A frase mais valiosa que você pode escrever neste documento é *"isso quebrou em produção e
> foi assim que eu descobri."* Ela prova que o sistema é real e que você estava lá quando falhou.
