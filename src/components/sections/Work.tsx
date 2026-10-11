import { getTranslations } from "next-intl/server";
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
        <div className="flex items-center gap-2">
          <Badge variant="accent" dot>
            {reels.length} Projects & Video Demos
          </Badge>
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
