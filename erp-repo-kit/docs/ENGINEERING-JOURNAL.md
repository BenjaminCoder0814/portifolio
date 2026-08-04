# Engineering Journal

Running log of decisions, problems and changes of direction while building and operating the platform.

> **Why this exists.** A changelog says *what* shipped. A journal says *what I was thinking and
> where I was wrong.* Almost nobody keeps one, which is exactly why it's worth keeping — it's the
> clearest evidence that a system was built by someone reasoning, not just typing.
>
> **How to use it.** One entry whenever something non-obvious happens: a decision reversed, a bug
> that taught you something, a feature nobody used, a performance surprise. Five lines is enough.
> Write it the same day — reconstructed entries always sound cleaner than the truth.

---

## Format

```markdown
## YYYY-MM — Short title

**What happened.**
**Why it mattered.**
**What I changed.**
**What I'd know to look for next time.**
```

---

## Entries

<!-- Benjamin: as três abaixo são PROMPTS, não entradas.
     Substitua cada uma pela versão real. Se não lembrar dos detalhes, escreva menos —
     mas escreva verdade. -->

## 2026-?? — Launch: the first week in production

**What happened.**
<!-- O sistema entrou em produção. O que aconteceu na primeira semana que você não previu?
     Quem resistiu? O que quebrou? O que funcionou melhor do que esperado? -->

**Why it mattered.**

**What I changed.**

**What I'd know to look for next time.**

---

## 2026-?? — <!-- A feature que ninguém usou -->

**What happened.**
<!-- Todo sistema tem uma. Qual foi a sua? O que você construiu achando que era essencial
     e descobriu que ninguém abria? Por que você achou que seria usada? -->

**Why it mattered.**
<!-- Esta entrada é valiosa porque mostra que você mede adoção em vez de assumir. -->

---

## 2026-?? — <!-- A decisão que você reverteria -->

**What happened.**

**Why it mattered.**

**What I'd do differently.**
<!-- Se você reverteria uma decisão dos ADRs, marque o ADR correspondente como
     "Superseded" e explique aqui. Um ADR revertido com honestidade vale mais
     que sete ADRs que nunca mudaram. -->

---

## Backlog de entradas a escrever

Perguntas que provavelmente têm uma entrada dentro:

- [ ] Qual foi o primeiro bug em produção, e como você descobriu — alguém reclamou ou você viu?
- [ ] Houve algum momento em que os dados ficaram errados? Como você recuperou?
- [ ] Qual parte do código você tem medo de mexer hoje?
- [ ] O que você construiu duas vezes porque a primeira estava errada?
- [ ] Qual foi a coisa mais simples que teve o maior impacto?
- [ ] Alguém pediu uma feature que você recusou? Por quê?
- [ ] O que você aprendeu sobre o negócio que mudou o software?

> Cada `[ ]` acima é uma entrada de 5 linhas. Sete entradas honestas neste arquivo pesam mais
> que trinta páginas descrevendo o sistema funcionando bem.
