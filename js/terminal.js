/* ═══════════════════════════════════════════════════
   TERMINAL MODE — Developer Mode Emulator
   Full interactive CLI experience
═══════════════════════════════════════════════════ */

class Terminal {
  constructor() {
    this.overlay   = document.getElementById('terminal-overlay');
    this.output    = document.getElementById('term-output');
    this.input     = document.getElementById('term-input');
    this.closeBtn  = document.getElementById('term-close');
    this.openBtn   = document.getElementById('dev-mode-btn');
    this.history   = [];
    this.histIdx   = -1;
    this.isOpen    = false;

    this.commands  = this.buildCommands();
    this.bind();
  }

  buildCommands() {
    return {
      help: {
        desc: 'Lista todos os comandos disponíveis',
        run: () => [
          { t: 'accent', v: '╔══ COMANDOS DISPONÍVEIS ════════════════════════╗' },
          { t: 'info',   v: '' },
          { t: 'info',   v: '  about        — Sobre Benjamin Maciel' },
          { t: 'info',   v: '  skills        — Stack técnica e proficiências' },
          { t: 'info',   v: '  projects      — Lista de projetos' },
          { t: 'info',   v: '  contact       — Informações de contato' },
          { t: 'info',   v: '  education     — Formação acadêmica' },
          { t: 'info',   v: '  experience    — Experiência profissional' },
          { t: 'info',   v: '  whoami        — Identidade do sistema' },
          { t: 'info',   v: '  github        — Abre o GitHub' },
          { t: 'info',   v: '  linkedin      — Abre o LinkedIn' },
          { t: 'info',   v: '  clear         — Limpa o terminal' },
          { t: 'info',   v: '  exit          — Fecha o Developer Mode' },
          { t: 'info',   v: '' },
          { t: 'accent', v: '╚════════════════════════════════════════════════╝' },
        ],
      },

      whoami: {
        desc: 'Identidade do sistema',
        run: () => [
          { t: 'accent', v: '> RUNNING: identify --user current' },
          { t: 'blank',  v: '' },
          { t: 'success',v: '  ██████╗  ███╗   ███╗' },
          { t: 'success',v: '  ██╔══██╗ ████╗ ████║' },
          { t: 'success',v: '  ██████╔╝ ██╔████╔██║' },
          { t: 'success',v: '  ██╔══██╗ ██║╚██╔╝██║' },
          { t: 'success',v: '  ██████╔╝ ██║ ╚═╝ ██║' },
          { t: 'success',v: '  ╚═════╝  ╚═╝     ╚═╝' },
          { t: 'blank',  v: '' },
          { t: 'accent', v: '  user         : Benjamin Maciel' },
          { t: 'info',   v: '  role         : Developer & System Architect' },
          { t: 'info',   v: '  age          : 21 anos' },
          { t: 'info',   v: '  location     : Brasil 🇧🇷' },
          { t: 'info',   v: '  status       : [ONLINE] Available for work' },
          { t: 'info',   v: '  os           : Arch Linux / Windows 11' },
          { t: 'info',   v: '  editor       : VS Code + Neovim' },
          { t: 'blank',  v: '' },
        ],
      },

      about: {
        desc: 'Sobre Benjamin Maciel',
        run: () => [
          { t: 'accent', v: '> LOADING: about.md' },
          { t: 'blank',  v: '' },
          { t: 'info',   v: '  Não fui só estudar programação.' },
          { t: 'info',   v: '  Comecei a pensar em sistemas — como as peças' },
          { t: 'info',   v: '  se conectam, como uma linha de código resolve' },
          { t: 'info',   v: '  um problema real de negócio.' },
          { t: 'blank',  v: '' },
          { t: 'accent', v: '  Pergunta que me move:' },
          { t: 'info',   v: '  "Como construir algo que funcione e escale?"' },
          { t: 'blank',  v: '' },
          { t: 'info',   v: '  2019 — Primeiro contato com código' },
          { t: 'info',   v: '  2022 — Curso Técnico em TI' },
          { t: 'info',   v: '  2024 — Projeto Muscle Levels' },
          { t: 'info',   v: '  2025 — Sistemas de Informação (cursando)' },
          { t: 'blank',  v: '' },
        ],
      },

      skills: {
        desc: 'Stack técnica e proficiências',
        run: () => [
          { t: 'accent', v: '> SCANNING: tech_stack.json' },
          { t: 'blank',  v: '' },
          { t: 'accent', v: '  ── FRONTEND ──────────────────────────────' },
          { t: 'success',v: '  React         ████████████████████░  88%' },
          { t: 'success',v: '  CSS/Tailwind   █████████████████████  90%' },
          { t: 'info',   v: '  Next.js        █████████████████░░░░  78%' },
          { t: 'blank',  v: '' },
          { t: 'accent', v: '  ── BACKEND ───────────────────────────────' },
          { t: 'success',v: '  Node.js        ██████████████████░░░  75%' },
          { t: 'info',   v: '  Python         ████████████████░░░░░  70%' },
          { t: 'success',v: '  REST APIs      ████████████████████░  85%' },
          { t: 'blank',  v: '' },
          { t: 'accent', v: '  ── DATABASE ──────────────────────────────' },
          { t: 'success',v: '  SQL/MySQL      ████████████████████░  85%' },
          { t: 'info',   v: '  PostgreSQL     █████████████████░░░░  72%' },
          { t: 'info',   v: '  MongoDB        ████████████████░░░░░  68%' },
          { t: 'blank',  v: '' },
          { t: 'accent', v: '  ── ARCHITECTURE ──────────────────────────' },
          { t: 'success',v: '  System Design  ████████████████████░  80%' },
          { t: 'success',v: '  Git/GitHub     ████████████████████░  88%' },
          { t: 'blank',  v: '' },
        ],
      },

      projects: {
        desc: 'Lista de projetos',
        run: () => [
          { t: 'accent', v: '> git log --oneline --projects' },
          { t: 'blank',  v: '' },
          { t: 'accent', v: '  [01] MUSCLE LEVELS ───────────────────────' },
          { t: 'info',   v: '  Stack  : React + Node.js + MySQL + REST API' },
          { t: 'info',   v: '  Status : ● LIVE — 3k+ usuários' },
          { t: 'info',   v: '  Desc   : Sistema de gamificação para academia' },
          { t: 'info',   v: '           XP, conquistas, ranking, dashboard' },
          { t: 'blank',  v: '' },
          { t: 'accent', v: '  [02] SISTEMA ERP ─────────────────────────' },
          { t: 'info',   v: '  Stack  : Node.js + React + PostgreSQL + WS' },
          { t: 'info',   v: '  Status : ● COMPLETE' },
          { t: 'info',   v: '  Desc   : ERP com controle de acesso simultâneo' },
          { t: 'info',   v: '           Bloqueio multiusuário + locking pessimista' },
          { t: 'blank',  v: '' },
          { t: 'accent', v: '  [03] API GATEWAY + AUTH ──────────────────' },
          { t: 'info',   v: '  Stack  : Node.js + JWT + Redis + Express' },
          { t: 'info',   v: '  Status : ● REUSABLE MODULE' },
          { t: 'info',   v: '  Desc   : Auth com JWT, roles, rate limiting' },
          { t: 'blank',  v: '' },
        ],
      },

      contact: {
        desc: 'Informações de contato',
        run: () => [
          { t: 'accent', v: '> FETCHING: contact.json' },
          { t: 'blank',  v: '' },
          { t: 'success',v: '  ● Status   : Available for opportunities' },
          { t: 'blank',  v: '' },
          { t: 'info',   v: '  📧 Email    : benjamin@email.com' },
          { t: 'info',   v: '  💼 LinkedIn : linkedin.com/in/benjaminmaciel' },
          { t: 'info',   v: '  🐙 GitHub   : github.com/benjaminmaciel' },
          { t: 'blank',  v: '' },
          { t: 'accent', v: '  Resposta média: < 24h' },
          { t: 'blank',  v: '' },
        ],
      },

      education: {
        desc: 'Formação acadêmica',
        run: () => [
          { t: 'accent', v: '> cat education.log' },
          { t: 'blank',  v: '' },
          { t: 'info',   v: '  🎓 Bacharelado em Sistemas de Informação' },
          { t: 'accent', v: '     2025 → Presente' },
          { t: 'info',   v: '     Foco: arquitetura, sistemas distribuídos,' },
          { t: 'info',   v: '     gestão de projetos, inteligência artificial' },
          { t: 'blank',  v: '' },
          { t: 'info',   v: '  📡 Curso Técnico em Informática' },
          { t: 'accent', v: '     2022 → 2024' },
          { t: 'info',   v: '     Redes, hardware, desenvolvimento de sistemas' },
          { t: 'blank',  v: '' },
        ],
      },

      experience: {
        desc: 'Experiência profissional',
        run: () => [
          { t: 'accent', v: '> git log --experience --format=full' },
          { t: 'blank',  v: '' },
          { t: 'info',   v: '  Desenvolvedor de Sistemas' },
          { t: 'accent', v: '  2023 → Presente' },
          { t: 'info',   v: '  · Desenvolvimento de sistemas ERP customizados' },
          { t: 'info',   v: '  · Arquitetura de APIs REST escaláveis' },
          { t: 'info',   v: '  · Sistemas com controle multiusuário em tempo real' },
          { t: 'info',   v: '  · Interface com clientes para levantamento de req.' },
          { t: 'blank',  v: '' },
          { t: 'info',   v: '  Freelancer — Projetos Autorais' },
          { t: 'accent', v: '  2022 → Presente' },
          { t: 'info',   v: '  · Muscle Levels (gamificação de academia)' },
          { t: 'info',   v: '  · Sistemas de gestão small business' },
          { t: 'blank',  v: '' },
        ],
      },

      github: {
        desc: 'Abre o GitHub',
        run: () => {
          setTimeout(() => window.open('https://github.com/', '_blank'), 400);
          return [
            { t: 'accent', v: '> Opening: github.com/benjaminmaciel' },
            { t: 'success',v: '  ✓ Browser launched' },
            { t: 'blank',  v: '' },
          ];
        },
      },

      linkedin: {
        desc: 'Abre o LinkedIn',
        run: () => {
          setTimeout(() => window.open('https://linkedin.com/', '_blank'), 400);
          return [
            { t: 'accent', v: '> Opening: linkedin.com/in/benjaminmaciel' },
            { t: 'success',v: '  ✓ Browser launched' },
            { t: 'blank',  v: '' },
          ];
        },
      },

      clear: {
        desc: 'Limpa o terminal',
        run: () => {
          this.output.innerHTML = '';
          return [];
        },
      },

      exit: {
        desc: 'Fecha o Developer Mode',
        run: () => {
          setTimeout(() => this.close(), 600);
          return [
            { t: 'accent', v: '> Terminating developer session...' },
            { t: 'success',v: '  ✓ Session closed. See you next time.' },
            { t: 'blank',  v: '' },
          ];
        },
      },
    };
  }

  bind() {
    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => this.open());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });
    }
    if (this.input) {
      this.input.addEventListener('keydown', (e) => this.handleKey(e));
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  handleKey(e) {
    if (e.key === 'Enter') {
      const val = this.input.value.trim();
      if (val) this.execute(val);
      this.input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.histIdx < this.history.length - 1) {
        this.histIdx++;
        this.input.value = this.history[this.history.length - 1 - this.histIdx] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.histIdx > 0) {
        this.histIdx--;
        this.input.value = this.history[this.history.length - 1 - this.histIdx] || '';
      } else {
        this.histIdx = -1;
        this.input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.autocomplete(this.input.value);
    }
  }

  autocomplete(partial) {
    if (!partial) return;
    const matches = Object.keys(this.commands).filter(k => k.startsWith(partial));
    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.appendLine({ t: 'info', v: '  ' + matches.join('   ') });
    }
  }

  execute(cmdStr) {
    this.history.push(cmdStr);
    this.histIdx = -1;

    // Echo the command
    this.appendLine({ t: 'cmd', v: `benjamin@portfolio:~$ ${cmdStr}` });

    const [cmd, ...args] = cmdStr.toLowerCase().trim().split(' ');
    const command = this.commands[cmd];

    if (command) {
      const lines = command.run(args);
      if (lines && lines.length) {
        lines.forEach(line => this.appendLine(line));
      }
    } else {
      this.appendLine({ t: 'error', v: `  bash: ${cmd}: command not found` });
      this.appendLine({ t: 'info',  v: '  Type "help" to see available commands.' });
      this.appendLine({ t: 'blank', v: '' });
    }

    this.scrollBottom();
  }

  appendLine(line) {
    const el = document.createElement('div');
    el.className = `term-output-line ${line.t}`;
    el.textContent = line.v;
    this.output.appendChild(el);
  }

  scrollBottom() {
    const body = document.getElementById('terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  open() {
    if (!this.overlay) return;
    this.isOpen = true;
    this.overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (this.output.children.length === 0) {
      this.printWelcome();
    }

    setTimeout(() => {
      if (this.input) this.input.focus();
    }, 100);
  }

  close() {
    if (!this.overlay) return;
    this.isOpen = false;
    this.overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  printWelcome() {
    const lines = [
      { t: 'success',v: '  ██████╗ ███████╗██╗   ██╗███╗   ███╗ ██████╗ ██████╗ ███████╗' },
      { t: 'success',v: '  ██╔══██╗██╔════╝██║   ██║████╗ ████║██╔═══██╗██╔══██╗██╔════╝' },
      { t: 'success',v: '  ██║  ██║█████╗  ██║   ██║██╔████╔██║██║   ██║██║  ██║█████╗  ' },
      { t: 'success',v: '  ██║  ██║██╔══╝  ╚██╗ ██╔╝██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ' },
      { t: 'success',v: '  ██████╔╝███████╗ ╚████╔╝ ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗' },
      { t: 'success',v: '  ╚═════╝ ╚══════╝  ╚═══╝  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝' },
      { t: 'blank',  v: '' },
      { t: 'accent', v: '  Welcome to Benjamin Maciel\'s Developer Terminal v1.0' },
      { t: 'info',   v: '  OS: PortfolioOS  |  Kernel: node-v20.0  |  Shell: benjamin-sh' },
      { t: 'blank',  v: '' },
      { t: 'info',   v: '  Type "help" to list available commands.' },
      { t: 'info',   v: '  Use ↑↓ for command history. Tab for autocomplete.' },
      { t: 'blank',  v: '' },
      { t: 'accent', v: '  ─────────────────────────────────────────────────────────────' },
      { t: 'blank',  v: '' },
    ];
    lines.forEach(l => this.appendLine(l));
    this.scrollBottom();
  }
}

// Init terminal when DOM is ready
window.portfolioTerminal = null;
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioTerminal = new Terminal();
});
