# Engineering Portfolio — estrutura e plano de execução

> **O que é.** Um documento técnico de 20–30 páginas, em inglês, em PDF, enviado a Engineering
> Managers e CTOs **depois** que eles demonstram interesse. Não é currículo (prova de contratação)
> nem portfólio (vitrine). É a evidência que sustenta as afirmações dos dois.
>
> **Quando usar.** Nunca na candidatura inicial — ninguém lê 25 páginas de um desconhecido.
> Use quando um recrutador ou EM responder com interesse: *"Here's a technical write-up of the
> ERP if you want the details."* É aí que ele vira decisivo.
>
> **O que este arquivo é.** O esqueleto e o plano. As partes que eu podia escrever com fatos
> reais já estão escritas em `CASE-STUDY-ERP.md`. O que falta exige informação que só você tem.

---

## Por que este documento importa mais do que qualquer edição adicional no currículo

Seu currículo hoje afirma: ERP em produção, 100% de adoção, decisão de build-versus-buy,
arquitetura com WebSocket e JWT, design system próprio, iniciativa de IA.

**Nada disso é verificável por quem lê.** Um Staff Engineer avalia candidatos por evidência, e a
evidência que ele aceita é código, arquitetura escrita, e trade-offs explicados. Currículo é
afirmação; este documento é prova.

Essa é a diferença entre *"parece bom no papel"* e *"vamos entrevistar essa pessoa"*.

---

## Estrutura proposta

### Parte 0 — Cover (1 página)
Nome, posicionamento, contatos, índice. Uma frase dizendo o que o leitor vai encontrar.

### Parte 1 — Engineering Profile (2 páginas)
Como você trabalha, não o que você sabe. Três subseções:
- **How I approach a problem** — mapear o processo antes de escrever código. Use um exemplo real.
- **Technical decisions I've owned** — build-versus-buy, modelo de dados multi-entidade, SPA vs. server-rendered, WebSocket vs. polling.
- **What I'm still learning** — testes automatizados, CI/CD, acessibilidade. **Não pule.** Um candidato que declara lacunas com precisão é mais confiável que um que só lista forças.

### Parte 2 — Case Study: Enterprise Operations Platform (10–12 páginas) ⭐
O núcleo do documento. `CASE-STUDY-ERP.md` já cobre a espinha dorsal; expandir com:

| Seção | Status | O que falta |
|---|---|---|
| The problem | ✅ escrito | — |
| Build vs. buy | ✅ escrito | — |
| Architecture | ✅ escrito | **Diagrama** |
| Data model | ⬜ | Diagrama ER (mesmo simplificado) das entidades e da separação por CNPJ |
| Auth & permissions | ✅ parcial | Fluxo do JWT, o que cada tier vê |
| Real-time layer | ⬜ | Por que WebSocket e não polling. O que acontece quando cai a conexão |
| Interface | ✅ escrito | **Screenshots** — 4 a 6, com legendas explicando a decisão de design |
| Design system | ⬜ | Lista de componentes, tokens, como um módulo novo é montado |
| Impact | ✅ escrito | — |
| What I'd do differently | ⬜ | **Só você pode escrever. É a seção mais lida por engenheiro sênior.** |

### Parte 3 — Case Study: AI Digital Workforce (5–7 páginas)
Estrutura idêntica. **Bloqueado** — ver a lista de dados no fim deste arquivo.

### Parte 4 — Code Samples (3–4 páginas)
Dois a três trechos comentados, cada um demonstrando uma decisão, não sintaxe:
- Um componente reutilizável do design system, mostrando a API que você escolheu
- A camada de integração REST — como erros e loading são tratados
- A lógica de transferência de estoque entre entidades (é a regra de negócio mais interessante do sistema)

> Comente o **porquê**, não o quê. `// itera o array` é ruído. `// lock pessimista porque duas
> expedições simultâneas podem ler o mesmo saldo` é engenharia.

### Parte 5 — Trajectory (1 página)
Timeline curta e factual. Sem superlativos, sem idade.

---

## Regras de escrita (seguir à risca)

1. **Inglês, do começo ao fim.** Inclusive comentários de código e legendas de screenshot.
2. **Diagramas > parágrafos.** Um diagrama de arquitetura substitui uma página de texto e é a primeira coisa que um EM olha. Excalidraw ou Mermaid; não precisa ser bonito, precisa ser correto.
3. **Todo número precisa de origem.** Se escrever "60% mais rápido", diga como foi medido. Se não sabe, escreva qualitativamente. Um número indefensável destrói a credibilidade do documento inteiro.
4. **Trade-offs explícitos.** Toda decisão teve alternativa. Diga qual era e por que você não a escolheu. É isso que separa um documento técnico de um folheto.
5. **Admita as falhas.** O que quebrou, o que você construiu à toa, o que está difícil de mudar hoje. Nenhum sistema real é limpo, e um documento que finge o contrário sinaliza inexperiência.
6. **Sem marketing.** Nada de "solução inovadora", "de ponta", "revolucionário". Descreva o que faz.

---

## Ordem de execução — o que realmente importa primeiro

O documento completo é a meta. Mas **ele não é o próximo passo** — é o terceiro.

| # | Passo | Por quê primeiro | Esforço |
|---|---|---|---|
| **1** | **Publicar o front-end do ERP no GitHub** com dados mock, usando `CASE-STUDY-ERP.md` como README | Um repositório público vale mais que 30 páginas de PDF. É o que um engenheiro abre primeiro | 1 fim de semana |
| **2** | **4–6 screenshots + vídeo de 2 min** do sistema em uso | Prova visual imediata. Serve README, portfólio e o documento | 2 horas |
| **3** | Diagrama de arquitetura e ER | Alimenta o repositório e o documento | 3 horas |
| **4** | Escrever "What I'd do differently" | A seção mais valiosa e a única que ninguém pode escrever por você | 2 horas |
| **5** | Montar o Engineering Portfolio em PDF | Junta tudo que os passos 1–4 produziram | 1 dia |

> Se você fizer só o passo 1, já terá o maior ganho isolado do seu perfil inteiro.
> Se fizer 1 e 2, seu portfólio passa a entregar o que o currículo promete.

---

## ⛔ Bloqueado: o que preciso de você para escrever o case de IA

Este é o quarto pedido dos mesmos dados. O bloco de IA continua sendo o único item do
**Engineering Impact** sem métrica e sem tecnologia nomeada — num bloco onde os outros quatro
têm ambos. Ele é visivelmente o mais fraco, e não é por falta de redação.

**1. Modelo e provedor.** Claude (API da Anthropic)? OpenAI? Gemini? Llama local?
→ destrava: `LLM Integration`, e o nome do provedor é keyword buscável

**2. Como se conecta.** API direta? RAG sobre documentos da empresa? n8n / Make / LangChain? Agente próprio?
→ destrava: `RAG`, `AI Agents`, `Prompt Engineering`, `Workflow Orchestration`

**3. Arquitetura.** Um agente ou vários? Existe orquestrador? Roda por evento, por schedule, ou sob demanda? Onde executa?
→ destrava: a seção de arquitetura inteira, que é o que torna um case study convincente

**4. O que automatiza, concretamente.** Financeiro? Cobrança? Estoque? Atendimento? RH? Emissão de documento?
→ destrava: o parágrafo "The problem", hoje genérico

**5. Como se integra ao ERP.** REST? Webhook? Acesso direto ao banco? Lê e escreve, ou só lê?
→ destrava: `System Integration` — e é o que prova que não é um brinquedo paralelo

**6. Qualquer número real.** Horas/semana economizadas, tarefas processadas por mês, pessoas impactadas, custo eliminado. Se ainda não há, diga — escrevo qualitativo e honesto.

**7. Status por parte.** O que já roda em produção vs. o que está em design. Isso muda `Leading the development` para `Built and deployed`, que é muito mais forte.

Com esses 7 itens, escrevo o case de IA no mesmo padrão do ERP e ele passa a ser o primeiro
item do Engineering Impact — hoje está em quinto justamente porque não tem o que os outros têm.
