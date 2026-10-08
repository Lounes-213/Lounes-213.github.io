"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

/**
 * Copy the address to the clipboard. The visible label changes and a status
 * region announces the result, so the confirmation reaches screen readers too.
 * If the clipboard is blocked (permissions, insecure context) the button simply
 * stays in its resting state — the `mailto:` link next to it always works.
 */
export function CopyEmailButton({ email, className }: { email: string; className?: string }) {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-control border border-border-interactive px-4 text-body",
          "text-fg-muted transition-colors dur-2 hover:bg-bg-subtle hover:text-fg",
          className,
        )}
      >
        {copied ? <Check size={16} className="text-success-text" /> : <Copy size={16} />}
        <span>{copied ? t("emailCopied") : t("copyEmail")}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? t("emailCopied") : ""}
      </span>
    </>
  );
}
