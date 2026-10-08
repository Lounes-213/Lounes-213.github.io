import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionProps = {
  id: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  intro?: ReactNode;
  /** Rendered beside the header on wide screens (filters, meta, actions). */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  /** `wide` for grids and diagrams, `content` for reading-width sections. */
  width?: "content" | "wide";
  /** Adds the blueprint grid motif to the section background. */
  blueprint?: boolean;
};

/**
 * Sections differ in content, never in rhythm. One component owns the vertical
 * padding, the container width and the header composition, so no section can
 * drift out of the spacing scale.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  aside,
  children,
  className,
  width = "content",
  blueprint = false,
}: SectionProps) {
  const hasHeader = Boolean(eyebrow ?? title ?? intro);

  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={cn(
        "relative py-section",
        blueprint && "blueprint-focus",
        className,
      )}
    >
      <div className={width === "wide" ? "container-wide-page" : "container-page"}>
        {hasHeader && (
          <header className="mb-stack-lg flex flex-col gap-stack-md lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-prose">
              {eyebrow && <p className="eyebrow mb-stack-xs">{eyebrow}</p>}
              {title && (
                <h2 id={`${id}-title`} className="text-h2 max-w-[22ch] text-balance">
                  {title}
                </h2>
              )}
              {intro && <p className="mt-stack-sm text-lead text-fg-muted">{intro}</p>}
            </div>
            {aside && <div className="shrink-0">{aside}</div>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
