# Como usar esta pasta

Esta pasta é o **conteúdo pronto do repositório do ERP**. Ela não pertence ao portfólio —
é para ser copiada para dentro do repositório novo que você vai criar.

```
enterprise-operations-platform/       ← repositório novo no GitHub
├── README.md                         ← copiar daqui
├── CHANGELOG.md                      ← copiar daqui
├── ROADMAP.md                        ← copiar daqui
├── LICENSE                           ← criar (MIT serve)
├── docs/
│   ├── ARCHITECTURE.md               ← copiar daqui
│   ├── DECISIONS.md                  ← copiar daqui
│   ├── CHALLENGES.md                 ← copiar daqui
│   ├── ENGINEERING-JOURNAL.md        ← copiar daqui
│   └── media/                        ← screenshots e diagramas
├── client/                           ← seu front-end React
└── server/                           ← API mock
```

`VIDEO-SCRIPT.md` fica fora do repositório — é seu roteiro de trabalho.

---

## Estado de cada arquivo

| Arquivo | Escrito | Você precisa |
|---|---|---|
| `README.md` | 85% | Screenshot do topo · verificar os comandos de instalação |
| `docs/ARCHITECTURE.md` | 60% | Diagramas · comportamento de reconexão · deploy real · estrutura de pastas |
| `docs/DECISIONS.md` | 80% | Revisar os 7 ADRs e corrigir onde o raciocínio não foi o seu · resolver os `[VERIFICAR]` |
| `docs/CHALLENGES.md` | 20% | **Escrever você.** Estrutura pronta, conteúdo é seu |
| `docs/ENGINEERING-JOURNAL.md` | 10% | **Escrever você.** 7 perguntas listadas para destravar |
| `CHANGELOG.md` | 40% | Histórico real (use `git log` do repo privado) |
| `ROADMAP.md` | 70% | Ajustar prioridades · preencher os `TODO` de estado atual |
| `VIDEO-SCRIPT.md` | 100% | Só gravar |

---

## Ordem de execução — 3 fins de semana

### Fim de semana 1 — publicar
1. Criar o repositório `enterprise-operations-platform`
2. Subir o front-end com **dados mock**. Nada de credenciais, preços reais ou nomes de clientes
3. Copiar `README.md`, `CHANGELOG.md`, `ROADMAP.md`, `docs/`
4. Tirar 4–6 screenshots → `docs/media/`
5. Adicionar `LICENSE` (MIT) e topics: `react` `typescript` `nodejs` `mysql` `websocket` `erp` `internal-tools`
6. Fixar o repositório no perfil

> Só isso já é o maior ganho isolado do seu perfil. Depois deste passo, seu currículo deixa de
> afirmar e passa a poder ser verificado.

### Fim de semana 2 — documentar de verdade
1. Revisar os 7 ADRs e resolver todos os `[VERIFICAR]`
2. Escrever `CHALLENGES.md` — os 3 desafios estruturados + o seu quarto
3. Fazer os diagramas (arquitetura + ER). Excalidraw, exportar PNG
4. Preencher o `CHANGELOG` real

### Fim de semana 3 — o vídeo
1. Ensaiar em silêncio
2. Gravar tela (OBS)
3. Gravar narração separada
4. Sincronizar, subir como não listado no YouTube
5. Embutir no README, no portfólio e postar no LinkedIn

---

## As duas regras que não podem ser quebradas

**1. Nenhum dado real da empresa.** Sem credenciais, sem nomes de clientes, sem preços reais,
sem quantidades reais de estoque. Antes de subir, rode uma busca por `.env`, `password`, `senha`,
`api_key` e pelo nome de qualquer cliente. Publicar dado da empresa onde você é Diretor de TI é
um problema sério — e é você quem responde por ele.

**2. Nada escrito que você não consiga defender.** Todo arquivo aqui tem `TODO` e `[VERIFICAR]`
justamente por isso. Um documento técnico com uma afirmação que desmorona numa pergunta de
follow-up custa mais do que a ausência do documento.

---

## Por que este material vale mais que o currículo

Seu currículo afirma: ERP em produção, 100% de adoção, decisão de build-versus-buy, arquitetura
com Firestore e JWT, design system próprio.

Hoje **nada disso é verificável por quem lê**. Um engenheiro avalia por evidência, e a evidência
que ele aceita é código, arquitetura escrita e trade-offs explicados.

Currículo é afirmação. Isto aqui é prova.
