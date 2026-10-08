import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/lib/i18n/routing";
import { fetchLinkyData } from "@/lib/linky";

type WorkProps = { locale: Locale };

/**
 * Work: Real-world mobile and web applications shipped by Lounès Benseba.
 */
export async function Work({ locale: _locale }: WorkProps) {
  const t = await getTranslations("work");
  const linkyData = await fetchLinkyData("lounes_owner");

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
            {linkyData.portfolio.length} Production Apps
          </Badge>
        </div>
      }
    >
      <Reveal animateOnView>
        <WorkGallery projects={linkyData.portfolio} />
      </Reveal>
    </Section>
  );
}
