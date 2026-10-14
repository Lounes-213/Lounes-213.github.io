import { getTranslations } from "next-intl/server";
import { External, Instagram } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { reels } from "@/content/reels";
import type { Locale } from "@/lib/i18n/routing";
import { WorkList } from "./WorkList";

type WorkProps = { locale: Locale };

/**
 * Work: Real-world mobile and web applications shipped by Lounès Benseba,
 * presented through high-fidelity vertical video Reels with direct playback.
 */
export async function Work({ locale }: WorkProps) {
  const t = await getTranslations("work");

  return (
    <Section
      id="work"
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t("intro")}
      width="wide"
      blueprint
      aside={
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent" dot>
            {reels.length} Projects & Video Demos
          </Badge>
          <a
            href="https://instagram.com/lounes.7i"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface px-3 py-1 text-xs font-medium text-fg-muted hover:text-accent hover:border-accent/40 transition-colors shadow-xs"
          >
            <Instagram size={13} className="text-[#E1306C]" />
            <span>@lounes.7i</span>
            <External size={11} className="opacity-60" />
          </a>
        </div>
      }
    >
      <WorkList
        projects={reels}
        locale={locale}
        tWatch={t("watchOnInstagram")}
        tMute={t("mute")}
        tUnmute={t("unmute")}
        tPlay={t("play")}
        tPause={t("pause")}
        tAll={t("all")}
        tMobile={t("mobile")}
        tWeb={t("web")}
      />
    </Section>
  );
}
