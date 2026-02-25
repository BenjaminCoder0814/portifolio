"use client";

import { useEffect, useRef, useState } from "react";
import { terminalCommands } from "@/data";

interface TermLine { text: string; type: "cmd" | "output" | "error" | "blank"; }

const WELCOME: TermLine[] = [
  { text: "  DEVELOPER TERMINAL v1.0 — BENJAMIN MACIEL", type: "output" },
  { text: "  ──────────────────────────────────────────", type: "output" },
  { text: '  Type "help" to see commands. Tab = autocomplete. ↑↓ = history.', type: "output" },
  { text: "", type: "blank" },
];

export default function TerminalModal() {
  const [open, setOpen]       = useState(false);
  const [lines, setLines]     = useState<TermLine[]>([...WELCOME]);
  const [input, setInput]     = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-terminal", handler);
    return () => window.removeEventListener("open-terminal", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const scrollBottom = () => {
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, 10);
  };

  const execute = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TermLine[] = [...lines, { text: `benjamin@portfolio:~$ ${cmd}`, type: "cmd" }];

    if (trimmed === "clear") {
      setLines([...WELCOME]);
      return;
    }
    if (trimmed === "exit") {
      setLines([...newLines, { text: "  Closing terminal...", type: "output" }, { text: "", type: "blank" }]);
      setTimeout(() => setOpen(false), 600);
      return;
    }
    if (trimmed === "github") {
      window.open("https://github.com/BenjaminCoder0814", "_blank");
      setLines([...newLines, { text: "  ✓ Opening GitHub...", type: "output" }]);
      scrollBottom();
      return;
    }
    if (trimmed === "linkedin") {
      window.open("https://linkedin.com/in/benjaminmaciel", "_blank");
      setLines([...newLines, { text: "  ✓ Opening LinkedIn...", type: "output" }]);
      scrollBottom();
      return;
    }
    if (trimmed === "history") {
      const histLines: TermLine[] = history.length === 0
        ? [{ text: "  (no commands in history yet)", type: "output" }]
        : history.map((h, i) => ({ text: `  ${String(i + 1).padStart(3, " ")}  ${h}`, type: "output" as const }));
      setLines([...newLines, ...histLines, { text: "", type: "blank" }]);
      scrollBottom();
      return;
    }
    if (trimmed === "ls" || trimmed === "ls -la") {
      setLines([...newLines,
        { text: "  about.md   skills.json   projects/   contact.txt", type: "output" },
        { text: "", type: "blank" },
      ]);
      scrollBottom();
      return;
    }
    if (trimmed === "pwd") {
      setLines([...newLines, { text: "  /home/benjamin/portfolio", type: "output" }, { text: "", type: "blank" }]);
      scrollBottom();
      return;
    }
    if (trimmed.startsWith("echo ")) {
      const msg = cmd.trim().slice(5);
      setLines([...newLines, { text: `  ${msg}`, type: "output" }, { text: "", type: "blank" }]);
      scrollBottom();
      return;
    }

    const cmdDef = terminalCommands[trimmed];
    if (cmdDef) {
      const cmdLines: TermLine[] = cmdDef.map((t) =>
        t === "" ? { text: "", type: "blank" } : { text: t, type: "output" }
      );
      setLines([...newLines, ...cmdLines]);
    } else {
      setLines([
        ...newLines,
        { text: `  bash: ${trimmed}: command not found`, type: "error" },
        { text: '  Type "help" to see available commands.', type: "output" },
        { text: "", type: "blank" },
      ]);
    }
    scrollBottom();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!input.trim()) return;
      setHistory((h) => [...h, input]);
      setHistIdx(-1);
      execute(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = histIdx + 1;
      if (next < history.length) {
        setHistIdx(next);
        setInput(history[history.length - 1 - next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) {
        const next = histIdx - 1;
        setHistIdx(next);
        setInput(history[history.length - 1 - next]);
      } else {
        setHistIdx(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(terminalCommands).filter((k) => k.startsWith(input));
      if (matches.length === 1) setInput(matches[0]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[5000] bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div
        className="w-full max-w-[840px] max-h-[85vh] flex flex-col rounded-xl overflow-hidden border border-[rgba(0,212,255,0.15)]"
        style={{
          background: "#0d1117",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,212,255,0.08)",
          animation: "terminal-in 0.35s cubic-bezier(0.175,0.885,0.32,1.275)",
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#161b22] border-b border-[rgba(255,255,255,0.06)] shrink-0">
          <div className="flex gap-[6px]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="flex-1 text-center font-mono text-xs text-[#8b949e]">
            benjamin@portfolio ~ bash
          </span>
          <button
            onClick={() => setOpen(false)}
            className="font-mono text-[11px] text-[#ff4757] border border-[rgba(255,71,87,0.3)] px-2 py-1 rounded transition-all hover:bg-[rgba(255,71,87,0.1)]"
          >
            ✕ Exit Dev Mode
          </button>
        </div>

        {/* Terminal body */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto p-5 font-mono text-sm flex flex-col gap-[3px]">
          {lines.map((line, i) =>
            line.type === "blank" ? (
              <div key={i} className="h-3" />
            ) : (
              <div
                key={i}
                className={`leading-relaxed whitespace-pre-wrap break-words ${
                  line.type === "cmd"    ? "text-[#00ff88]"  :
                  line.type === "error"  ? "text-[#ff4757]"  :
                  "text-[#8b949e]"
                }`}
              >
                {line.text}
              </div>
            )
          )}

          {/* Input line */}
          <div className="flex items-center mt-2">
            <span className="text-[#00ff88] whitespace-nowrap">benjamin@portfolio:~$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm caret-[#00d4ff]"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
