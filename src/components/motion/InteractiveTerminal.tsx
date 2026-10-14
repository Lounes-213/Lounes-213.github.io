"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Terminal, Sparkle } from "@/components/icons";
import { profile } from "@/content/profile";
import { pick } from "@/content/schema";
import type { Locale } from "@/lib/i18n/routing";

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

const IconEnter = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 10 4 15 9 20" />
    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
  </svg>
);

const IconTrash = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

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
          ` • Role        : Software Engineer`,
          ` • Degrees     : ${
            locale === "ar"
              ? "BSc Informatique & MSc Bioinformatique (USTHB)"
              : locale === "fr"
              ? "Licence Informatique & Master Bioinformatique (USTHB)"
              : "BSc Computer Science & MSc Bioinformatics (USTHB)"
          }`,
          ` • Location    : ${pick(profile.location, locale)}`,
          ` • Status      : Active · Available for high-impact projects`,
          ``,
          ` [CORE LANGUAGES & ENGINEERING]`,
          ` • Languages   : Flutter, Dart, Python, Java, Next.js, FastAPI, R, TypeScript`,
          ` • Architecture: Clean Architecture, SOLID Principles, BLoC, Riverpod`,
          ` • Engineering : Scalable Mobile Apps, High-Throughput APIs, Data Pipelines`,
          ` • Code Quality: 100% Type-Safe, Robust Error Handling, Clean UI/UX`,
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
          `   - USTHB Algiers`,
          `   - Computational modeling, algorithmic genomics, advanced data structures`,
          ``,
          ` [2021 - 2024] Bachelor's Degree (BSc) in Computer Science`,
          `   - USTHB Algiers`,
          `   - Software engineering, operating systems, networking, database systems`,
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
        return `bash: command not found: "${cmd}". Type 'help' or click an option above.`;
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
    const stepSize = fullOutput.length > 250 ? 3 : 2;
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
    inputRef.current?.focus();
  };

  return (
    <div className="well relative overflow-hidden p-5 sm:p-6 shadow-2 border border-border rounded-2xl h-full flex flex-col justify-between">
      <div>
        {/* Card Header matching previous styling */}
        <div className="flex items-center justify-between gap-2 text-fg-subtle border-b border-border-subtle pb-3 select-none">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-accent shrink-0" />
            <span className="font-mono text-caption ltr-island font-semibold text-fg">~ whoami</span>
          </div>

          <div className="flex items-center gap-2">
            {entries.length > 0 && (
              <button
                onClick={() => runCommand("clear")}
                title="Clear output"
                className="text-fg-subtle hover:text-fg transition-colors p-1"
              >
                <IconTrash />
              </button>
            )}
            <span className="font-mono text-[11px] text-fg-subtle">
              bash · workstation
            </span>
          </div>
        </div>

        {/* Predefined Clickable Command Options / Pills */}
        <div className="my-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 select-none">
          <span className="text-[10px] font-mono text-fg-subtle flex items-center gap-1 me-1 shrink-0">
            <Sparkle size={11} className="text-accent" />
            <span className="hidden sm:inline">Options:</span>
          </span>
          {PREDEFINED_COMMANDS.map((item) => {
            const isActive = activeCommand === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleChipClick(item.id)}
                className={`rounded-lg px-2.5 py-1 font-mono text-[10px] sm:text-[11px] transition-all whitespace-nowrap border ${
                  isActive
                    ? "bg-accent/15 border-accent text-accent font-semibold shadow-xs"
                    : "bg-surface border-border-subtle text-fg-muted hover:text-fg hover:border-accent/40 hover:bg-surface-elevated"
                }`}
                title={item.desc}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Output Screen with Typewriter Effect */}
        <div
          ref={containerRef}
          onClick={() => inputRef.current?.focus()}
          className="min-h-[220px] max-h-[290px] overflow-y-auto font-mono text-caption pr-1 space-y-3 cursor-text selection:bg-accent/20"
        >
          {entries.map((entry) => (
            <div key={entry.id} className="space-y-1.5 leading-relaxed">
              {/* Command line */}
              <div className="flex items-center gap-1.5 text-accent font-semibold text-caption select-none">
                <span className="text-fg-subtle font-normal">$</span>
                <span>{entry.command}</span>
              </div>

              {/* Typewriter Output Content */}
              <pre className="font-mono text-[11px] sm:text-xs text-fg whitespace-pre-wrap pl-3 border-l-2 border-accent/40 bg-surface-sunken/60 py-2 rounded-r">
                {entry.displayedOutput}
                {!entry.isCompleted && (
                  <span className="inline-block w-1.5 h-3 bg-accent ml-0.5 animate-pulse align-middle" />
                )}
              </pre>
            </div>
          ))}
        </div>

        {/* Interactive CLI Input Line */}
        <form onSubmit={handleSubmit} className="mt-3 pt-2.5 border-t border-border-subtle flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-accent font-mono text-caption shrink-0 select-none font-bold">
            <span>$</span>
          </div>

          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isTyping ? "executing..." : "type command (skills, education, contact...)"}
              disabled={isTyping}
              className="w-full bg-transparent border-none outline-none font-mono text-caption text-fg placeholder:text-fg-subtle/50 focus:ring-0 p-0"
              autoComplete="off"
              spellCheck="false"
            />
            {/* Terminal Cursor */}
            <span className="inline-block w-1.5 h-3.5 bg-accent animate-pulse ml-1 shrink-0" />
          </div>

          {inputVal.trim() && (
            <button
              type="submit"
              disabled={isTyping}
              className="text-fg-subtle hover:text-accent p-1 transition-colors shrink-0"
              title="Execute"
            >
              <IconEnter />
            </button>
          )}
        </form>
      </div>

      {/* Card Footer Hint matching previous styling */}
      <p className="mt-3 border-t border-border-subtle pt-2.5 text-caption text-fg-subtle flex items-center justify-between">
        <span>Production software built with clean architecture &amp; data pipelines.</span>
        <span className="font-mono text-[10px] text-fg-subtle/80">Active</span>
      </p>
    </div>
  );
}
