"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Terminal, Sparkle } from "@/components/icons";
import { profile } from "@/content/profile";
import { pick } from "@/content/schema";
import type { Locale } from "@/lib/i18n/routing";

const IconEnter = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 10 4 15 9 20" />
    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
  </svg>
);

const IconTrash = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

interface InteractiveTerminalProps {
  locale: Locale;
}

interface CommandEntry {
  id: string;
  command: string;
  fullOutput: string;
  displayedOutput: string;
  isCompleted: boolean;
}

const PREDEFINED_COMMANDS = [
  { id: "whoami", label: "whoami", desc: "Identity & Core Engineering" },
  { id: "skills", label: "skills", desc: "Tech Stack & Architecture" },
  { id: "education", label: "education", desc: "USTHB Degrees & Academic Path" },
  { id: "projects", label: "projects", desc: "Production Apps & Highlights" },
  { id: "contact", label: "contact", desc: "Direct Links & Inquiries" },
  { id: "clear", label: "clear", desc: "Reset Terminal" },
] as const;

export function InteractiveTerminal({ locale }: InteractiveTerminalProps) {
  const [entries, setEntries] = useState<CommandEntry[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [activeCommand, setActiveCommand] = useState<string>("whoami");
  const [isTyping, setIsTyping] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to generate content for commands based on locale and actual profile
  const getCommandOutput = (cmd: string): string => {
    const trimmed = cmd.trim().toLowerCase();

    switch (trimmed) {
      case "whoami":
        return [
          `==================================================`,
          ` USER PROFILE : LOUNÈS BENSEBA`,
          `==================================================`,
          ` • Role       : Software Engineer`,
          ` • Degrees    : ${
            locale === "ar"
              ? "BSc Informatique & MSc Bioinformatique (USTHB)"
              : locale === "fr"
              ? "Licence Informatique & Master Bioinformatique (USTHB)"
              : "BSc Computer Science & MSc Bioinformatics (USTHB)"
          }`,
          ` • Location   : ${pick(profile.location, locale)}`,
          ` • Status     : Active · Available for freelance & engineering roles`,
          ``,
          ` [CORE LANGUAGES & ENGINEERING]`,
          ` • Core Languages : Flutter, Dart, Python, Java, Next.js, FastAPI, R, TypeScript`,
          ` • Architecture   : Clean Architecture, SOLID Principles, BLoC, Riverpod`,
          ` • Engineering    : Scalable Mobile Apps, High-Throughput APIs, Data Pipelines`,
          ` • Code Standard  : 100% Type-Safe, Robust Error Handling, Clean UI/UX`,
        ].join("\n");

      case "skills":
      case "stack":
        return [
          `==================================================`,
          ` TECHNICAL STACK & ARSENAL`,
          `==================================================`,
          ` • Mobile Engineering : Flutter (Expert), Dart, Riverpod, BLoC, SQLite, Firebase`,
          ` • Backend Systems    : Python (FastAPI, Flask), Next.js, Node.js, Java, REST APIs`,
          ` • Data & Analytics   : Python (Pandas, NumPy, Scikit-learn), R (Bioinformatics)`,
          ` • DevOps & Tooling   : Docker, Git & GitHub Actions, Linux CLI, Supabase`,
          ` • Architecture       : Clean Architecture, Offline-First, Microservices, CI/CD`,
        ].join("\n");

      case "education":
      case "degrees":
        return [
          `==================================================`,
          ` ACADEMIC FOUNDATIONS (USTHB)`,
          `==================================================`,
          ` [2024 - Present] Master 2 (MSc) in Bioinformatics`,
          `   - University of Science and Technology Houari Boumediene (USTHB)`,
          `   - Computational modeling, algorithmic genomics, advanced data structures`,
          ``,
          ` [2021 - 2024] Bachelor's Degree (BSc) in Computer Science`,
          `   - USTHB Algiers`,
          `   - Software engineering, operating systems, networking, database design`,
        ].join("\n");

      case "projects":
      case "work":
        return [
          `==================================================`,
          ` FEATURED PRODUCTION DELIVERIES`,
          `==================================================`,
          ` 1. [Gym App]              -> Flutter production mobile app with clean architecture`,
          ` 2. [Kamir Gym Management] -> Mobile & cloud operations suite for fitness hubs`,
          ` 3. [Store Link-in-Bio]    -> Ultra-fast creator bio link & catalog showcase platform`,
          ``,
          ` ➔ Tip: Scroll down to 'Selected Work' or click the video demos below!`,
        ].join("\n");

      case "contact":
      case "email":
        return [
          `==================================================`,
          ` DIRECT CONTACT & REACHOUT`,
          `==================================================`,
          ` • Email    : bensebalounes7@gmail.com`,
          ` • LinkedIn : https://www.linkedin.com/in/lounes-benseba-a07549393/`,
          ` • GitHub   : https://github.com/Lounes-213`,
          ` • Socials  : @lounes.7i (Instagram, TikTok, Facebook)`,
          ` • Location : Algiers, Algeria (Available worldwide remotely)`,
        ].join("\n");

      case "help":
        return [
          `==================================================`,
          ` TERMINAL COMMANDS MANUAL`,
          `==================================================`,
          ` • whoami    : Identity, background & core engineering languages`,
          ` • skills    : Full technical stack & architecture practices`,
          ` • education : USTHB degrees and academic timeline`,
          ` • projects  : Shipped production apps and case studies`,
          ` • contact   : Direct email, socials and professional channels`,
          ` • clear     : Clear the terminal console`,
        ].join("\n");

      default:
        return `bash: command not found: "${cmd}". Type 'help' or select a predefined command above.`;
    }
  };

  // Scroll to bottom helper
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  // Execute a command with typewriter character-by-character animation
  const runCommand = (cmdString: string) => {
    const trimmed = cmdString.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === "clear") {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      setEntries([]);
      setIsTyping(false);
      setInputVal("");
      return;
    }

    // If currently typing, finish previous instantly
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      setEntries((prev) =>
        prev.map((e) => ({ ...e, displayedOutput: e.fullOutput, isCompleted: true })),
      );
    }

    setActiveCommand(trimmed);
    setIsTyping(true);
    setInputVal("");

    const fullOutput = getCommandOutput(trimmed);
    const newEntryId = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    // Create entry with empty initial displayed text
    const newEntry: CommandEntry = {
      id: newEntryId,
      command: trimmed,
      fullOutput,
      displayedOutput: "",
      isCompleted: false,
    };

    setEntries((prev) => [...prev, newEntry]);

    // Typewriter effect settings (fast, realistic terminal typewriter speed)
    let charIndex = 0;
    const stepSize = fullOutput.length > 250 ? 3 : 2; // Speed up slightly on longer text for great UX
    const speedMs = 12;

    typingTimerRef.current = setInterval(() => {
      charIndex += stepSize;
      if (charIndex >= fullOutput.length) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setEntries((prev) =>
          prev.map((e) =>
            e.id === newEntryId
              ? { ...e, displayedOutput: fullOutput, isCompleted: true }
              : e,
          ),
        );
        setIsTyping(false);
      } else {
        const slice = fullOutput.slice(0, charIndex);
        setEntries((prev) =>
          prev.map((e) =>
            e.id === newEntryId ? { ...e, displayedOutput: slice } : e,
          ),
        );
      }
      scrollToBottom();
    }, speedMs);
  };

  // Run 'whoami' initially with typewriter on mount
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      runCommand("whoami");
    }, 450);

    return () => {
      clearTimeout(initialTimer);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep scroll stuck to bottom as output changes
  useEffect(() => {
    scrollToBottom();
  }, [entries]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    runCommand(inputVal);
  };

  const handleChipClick = (cmd: string) => {
    runCommand(cmd);
    // Focus terminal input
    inputRef.current?.focus();
  };

  return (
    <div className="rounded-2xl border border-border bg-[#0a0e17] text-slate-100 shadow-2 overflow-hidden flex flex-col h-[500px] sm:h-[520px] backdrop-blur-md">
      {/* Authentic PC Terminal Window Header / Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03] select-none shrink-0">
        {/* Traffic Light Window Controls */}
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/80 inline-block shadow-xs" />
          <span className="size-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/80 inline-block shadow-xs" />
          <span className="size-3 rounded-full bg-[#27c93f] border border-[#1aab29]/80 inline-block shadow-xs" />
        </div>

        {/* Window Title */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-slate-400 font-medium">
          <Terminal size={13} className="text-sky-400 shrink-0" />
          <span>lounes@workstation:~</span>
        </div>

        {/* Window Badge & Clear Action */}
        <div className="flex items-center gap-2">
          {entries.length > 0 && (
            <button
              onClick={() => runCommand("clear")}
              title="Clear terminal"
              className="text-slate-400 hover:text-slate-200 transition-colors p-1"
            >
              <IconTrash />
            </button>
          )}
          <span className="font-mono text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
            bash · 80x24
          </span>
        </div>
      </div>

      {/* Predefined Clickable Command Buttons (Quick Select) */}
      <div className="px-3.5 py-2 border-b border-white/10 bg-white/[0.02] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 select-none">
        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 me-1">
          <Sparkle size={11} className="text-accent" />
          <span className="hidden sm:inline">Commands:</span>
        </span>
        {PREDEFINED_COMMANDS.map((item) => {
          const isActive = activeCommand === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleChipClick(item.id)}
              className={`rounded px-2 py-0.5 font-mono text-[10px] sm:text-[11px] transition-all whitespace-nowrap border ${
                isActive
                  ? "bg-accent/20 border-accent/60 text-sky-300 font-semibold shadow-[0_0_8px_rgba(56,189,248,0.25)]"
                  : "bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white hover:border-white/20"
              }`}
              title={item.desc}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Terminal Screen Console Buffer */}
      <div
        ref={containerRef}
        onClick={() => inputRef.current?.focus()}
        className="p-4 sm:p-5 font-mono text-xs flex-1 overflow-y-auto space-y-4 cursor-text selection:bg-sky-500/30 selection:text-sky-200"
      >
        {/* Terminal Header Banner */}
        <div className="text-[11px] text-slate-400 space-y-0.5 pb-2 border-b border-white/5 select-none">
          <p className="text-slate-300 font-semibold">Lounès Benseba Workstation [Version 2.4.0-x86_64]</p>
          <p className="text-slate-400">Type a command or click predefined options above to explore.</p>
        </div>

        {/* Command History with Typewriter Text Output */}
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-1.5 leading-relaxed">
            {/* Prompt line that was executed */}
            <div className="flex items-center gap-2 text-slate-400 select-none">
              <span className="text-emerald-400 font-bold">lounes@engineer</span>
              <span>:</span>
              <span className="text-sky-400 font-bold">~</span>
              <span>$</span>
              <span className="text-white font-semibold">{entry.command}</span>
            </div>

            {/* Typewriter Output Content */}
            <pre className="font-mono text-[11px] sm:text-xs text-slate-200 whitespace-pre-wrap pl-3 border-l-2 border-accent/40 bg-white/[0.015] py-1.5 rounded-r">
              {entry.displayedOutput}
              {!entry.isCompleted && (
                <span className="inline-block w-1.5 h-3.5 bg-sky-400 ml-0.5 animate-pulse align-middle" />
              )}
            </pre>
          </div>
        ))}

        {/* Active Command Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
          <div className="flex items-center gap-2 text-slate-400 select-none shrink-0">
            <span className="text-emerald-400 font-bold">lounes@engineer</span>
            <span>:</span>
            <span className="text-sky-400 font-bold">~</span>
            <span>$</span>
          </div>

          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isTyping ? "executing..." : "type command (e.g. skills)..."}
              disabled={isTyping}
              className="w-full bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-slate-600 focus:ring-0 p-0"
              autoComplete="off"
              spellCheck="false"
            />
            {/* Terminal Cursor */}
            <span className="inline-block w-2 h-4 bg-sky-400 animate-pulse ml-1 shrink-0" />
          </div>

          {inputVal.trim() && (
            <button
              type="submit"
              disabled={isTyping}
              className="text-slate-400 hover:text-sky-300 p-1 transition-colors shrink-0"
              title="Execute"
            >
              <IconEnter />
            </button>
          )}
        </form>
      </div>

      {/* Terminal Footer Status Bar */}
      <div className="px-4 py-1.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[10px] font-mono text-slate-400 select-none shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Shell Active</span>
        </span>
        <span className="text-slate-400">UTF-8 · ZSH</span>
      </div>
    </div>
  );
}
