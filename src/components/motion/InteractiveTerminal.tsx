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
  { id: "whoami", label: "whoami", desc: "Identity & Background" },
  { id: "skills", label: "skills", desc: "Technical Stack" },
  { id: "education", label: "education", desc: "USTHB Academic Timeline" },
  { id: "projects", label: "projects", desc: "Shipped Projects & Showcase" },
  { id: "contact", label: "contact", desc: "Direct Channels & Socials" },
  { id: "clear", label: "clear", desc: "Reset Console" },
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

  // Helper to generate clean output without any tacky '====' lines
  // whoami only has identity/degrees/location/status (no core languages)
  // projects only has real project names and what they do (no tech stacks)
  const getCommandOutput = (cmd: string): string => {
    const trimmed = cmd.trim().toLowerCase();

    switch (trimmed) {
      case "whoami":
        return [
          `• user      : ${profile.name}`,
          `• role      : Software Engineer`,
          `• education : ${
            locale === "ar"
              ? "ليسانس إعلام آلي · ماستر بيومعلوماتية (USTHB)"
              : locale === "fr"
              ? "Licence Informatique · Master Bioinformatique (USTHB)"
              : "BSc Computer Science · MSc Bioinformatics (USTHB)"
          }`,
          `• location  : ${pick(profile.location, locale)}`,
          `• status    : Active · Shipping production software`,
        ].join("\n");

      case "skills":
      case "stack":
        return [
          `• mobile    : Flutter (Expert Architecture), Dart, Riverpod, BLoC, SQLite`,
          `• backend   : Python (FastAPI, Flask), Next.js, Node.js, Java, REST APIs`,
          `• data / ai : Python (Pandas, NumPy, Scikit-learn), R (Bioinformatics Pipelines)`,
          `• devops    : Docker, Git & GitHub Actions, Linux CLI, Supabase, Firebase`,
        ].join("\n");

      case "education":
      case "degrees":
        return [
          `• [2024 - Present] Master 2 (MSc) in Bioinformatics — USTHB`,
          `  - Algorithmic modeling, computational genomics & advanced data structures`,
          `• [2021 - 2024] Bachelor's Degree (BSc) in Computer Science — USTHB`,
          `  - Core foundations in Software Engineering, OOP, Systems & Networks`,
        ].join("\n");

      case "projects":
      case "work":
        return [
          `• Maktabat Al-I'tissam : Digital reading & educational e-learning library platform`,
          `• Golden Goal          : Real-time football match tracker, live scores & league manager`,
          `• Kamir Gym            : Fitness club companion, memberships & workout management suite`,
          `• CUBE 3 (Bab Ezzouar) : Smart campus & student residence services portal`,
          `• Ascent Club          : Scientific & cultural events, workshops & member hub`,
          `• Volagro DZ           : Enterprise digital platform for agro-industry & livestock`,
          ``,
          `➔ Scrolling down to live video demos...`,
        ].join("\n");

      case "contact":
      case "email":
        return [
          `• email    : bensebalounes7@gmail.com`,
          `• linkedin : https://www.linkedin.com/in/lounes-benseba-a07549393/`,
          `• github   : https://github.com/Lounes-213`,
          `• socials  : @lounes.7i (Instagram, TikTok, Facebook)`,
        ].join("\n");

      case "help":
        return [
          `• whoami    : Identity, education & status`,
          `• skills    : Technical stack & tools`,
          `• education : Academic degrees from USTHB`,
          `• projects  : Shipped projects & showcases (auto-scrolls to demos)`,
          `• contact   : Email, LinkedIn, GitHub & socials`,
          `• clear     : Clear the terminal output`,
        ].join("\n");

      default:
        return `bash: command not found: "${cmd}". Type 'help' or select an option above.`;
    }
  };

  // Scroll to bottom helper
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  // Smooth scroll to #work section when projects command is triggered
  const triggerScrollToWork = () => {
    setTimeout(() => {
      const workElem = document.getElementById("work");
      if (workElem) {
        workElem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 450);
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

    // Auto-scroll down to projects section if project command is executed
    if (trimmed.toLowerCase() === "projects" || trimmed.toLowerCase() === "work") {
      triggerScrollToWork();
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
    const stepSize = fullOutput.length > 220 ? 3 : 2;
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
        {/* Card Header matching previous styling with green accents and window controls */}
        <div className="flex items-center justify-between gap-2 text-fg-subtle border-b border-border-subtle pb-3 select-none">
          <div className="flex items-center gap-2">
            {/* Window Traffic Lights */}
            <div className="flex items-center gap-1.5 me-1">
              <span className="size-2.5 rounded-full bg-[#ff5f56] inline-block" />
              <span className="size-2.5 rounded-full bg-[#ffbd2e] inline-block" />
              <span className="size-2.5 rounded-full bg-[#27c93f] inline-block" />
            </div>
            <Terminal size={15} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
            <span className="font-mono text-caption ltr-island font-semibold text-fg">
              ~ whoami
            </span>
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
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              bash · active
            </span>
          </div>
        </div>

        {/* Predefined Clickable Command Options / Pills */}
        <div className="my-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 select-none">
          <span className="text-[10px] font-mono text-fg-subtle flex items-center gap-1 me-1 shrink-0">
            <Sparkle size={11} className="text-emerald-500 dark:text-emerald-400" />
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
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs"
                    : "bg-surface border-border-subtle text-fg-muted hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-surface-elevated"
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
          className="min-h-[220px] max-h-[290px] overflow-y-auto font-mono text-caption pr-1 space-y-3 cursor-text selection:bg-emerald-500/20"
        >
          {entries.map((entry) => (
            <div key={entry.id} className="space-y-1.5 leading-relaxed">
              {/* Command line with green developer identity */}
              <div className="flex items-center gap-1.5 font-semibold text-caption select-none">
                <span className="text-emerald-500 dark:text-emerald-400">lounes@engineer</span>
                <span className="text-fg-subtle">:</span>
                <span className="text-sky-500 dark:text-sky-400">~</span>
                <span className="text-fg-subtle">$</span>
                <span className="text-fg ml-1">{entry.command}</span>
              </div>

              {/* Typewriter Output Content */}
              <pre className="font-mono text-[11px] sm:text-xs text-fg whitespace-pre-wrap pl-3 border-l-2 border-emerald-500/50 bg-surface-sunken/60 py-2 rounded-r">
                {entry.displayedOutput}
                {!entry.isCompleted && (
                  <span className="inline-block w-1.5 h-3 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
                )}
              </pre>
            </div>
          ))}
        </div>

        {/* Interactive CLI Input Line */}
        <form onSubmit={handleSubmit} className="mt-3 pt-2.5 border-t border-border-subtle flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-caption shrink-0 select-none font-bold">
            <span className="text-emerald-500 dark:text-emerald-400">lounes@engineer</span>
            <span className="text-fg-subtle">:</span>
            <span className="text-sky-500 dark:text-sky-400">~</span>
            <span className="text-fg-subtle">$</span>
          </div>

          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isTyping ? "..." : "type command (skills, projects, education...)"}
              disabled={isTyping}
              className="w-full bg-transparent border-none outline-none font-mono text-caption text-fg placeholder:text-fg-subtle/50 focus:ring-0 p-0"
              autoComplete="off"
              spellCheck="false"
            />
            {/* Terminal Blinking Cursor in Green */}
            <span className="inline-block w-1.5 h-3.5 bg-emerald-400 animate-pulse ml-1 shrink-0" />
          </div>

          {inputVal.trim() && (
            <button
              type="submit"
              disabled={isTyping}
              className="text-fg-subtle hover:text-emerald-400 p-1 transition-colors shrink-0"
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
        <span className="font-mono text-[10px] text-emerald-500 dark:text-emerald-400 font-semibold">Active</span>
      </p>
    </div>
  );
}
