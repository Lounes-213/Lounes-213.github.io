"use client";

import { useRef, useState } from "react";
import { External, Instagram, Pause, Play, Volume2, VolumeX } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import type { ReelProject } from "@/content/reels";
import { pick } from "@/content/schema";
import type { Locale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils/cn";

import { Card3D } from "@/components/motion/Card3D";

type ReelCardProps = {
  project: ReelProject;
  locale: Locale;
  tWatch: string;
  tMute: string;
  tUnmute: string;
  tPlay: string;
  tPause: string;
};

export function ReelCard({
  project,
  locale,
  tWatch,
  tMute,
  tUnmute,
  tPlay,
  tPause,
}: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const title = pick(project.title, locale);
  const category = pick(project.category, locale);
  const description = pick(project.description, locale);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setHasInteracted(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!isPlaying) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setHasInteracted(true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!hasInteracted && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!hasInteracted && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Card3D maxTilt={7} scale={1.015} glare={true} glareMaxOpacity={0.14} className="h-full">
      <article
        className="group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-surface shadow-1 transition-colors duration-300 hover:border-accent/40 hover:shadow-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Video Container (Compact smartphone ratio on mobile, standard 9:15 on desktop) */}
        <div
          className="relative aspect-[9/13] sm:aspect-[9/15] w-full cursor-pointer overflow-hidden bg-surface-sunken"
          onClick={() => togglePlay()}
        >
          <video
            ref={videoRef}
            src={project.videoSrc}
            poster={project.posterSrc}
            playsInline
            loop
            muted={isMuted}
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Gradient shadow for readable overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/55" />

          {/* Top Header: Languages badges (Clean, no redundant Instagram button) */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2 sm:p-3 z-10 gap-1.5 translate-z-20">
            <div className="flex flex-wrap items-center gap-1">
              {project.languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full bg-accent/90 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-white shadow-xs backdrop-blur-md"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Center Play/Pause Indicator Button with 3D elevation */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-200 pointer-events-none translate-z-30",
              isPlaying && !isHovered ? "opacity-0" : "opacity-100",
            )}
          >
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? tPause : tPlay}
              className="pointer-events-auto grid size-10 sm:size-12 place-items-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/60 shadow-md border border-white/20"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
            </button>
          </div>

          {/* Bottom Floating Bar: Mute button & Category */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2 sm:p-3 z-10 gap-1.5 translate-z-20">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? tUnmute : tMute}
              className="grid size-7 sm:size-8 place-items-center rounded-full bg-black/70 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-110 border border-white/10 shrink-0"
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-accent" />}
            </button>

            <Badge variant="neutral" className="bg-black/60 text-white/90 border-white/10 text-[9px] sm:text-[11px] backdrop-blur-sm truncate max-w-[170px] sm:max-w-none">
              {category}
            </Badge>
          </div>
        </div>

        {/* Card Body: Title, Short Description, Tags & Discreet Link */}
        <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
          <div className="translate-z-10">
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-fg group-hover:text-accent transition-colors line-clamp-1">
              <a
                href={project.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-2"
              >
                {title}
              </a>
            </h3>
            <p className="mt-1 text-xs text-fg-muted line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Tech tags & Minimalist Instagram link (Not a bulky button) */}
          <div className="mt-3 pt-2.5 border-t border-border-subtle flex flex-col gap-2 translate-z-20">
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border-subtle bg-surface-sunken px-1.5 py-0.5 text-[10px] font-medium text-fg-subtle"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Simple, sleek link directly to Instagram reel */}
            <div className="flex items-center justify-between pt-1">
              <a
                href={project.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-fg-muted hover:text-accent transition-colors"
              >
                <Instagram size={13} className="text-[#E1306C] transition-transform duration-200 group-hover/link:scale-110" />
                <span className="group-hover/link:underline underline-offset-2">{tWatch}</span>
                <External size={11} className="opacity-60 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100" />
              </a>
            </div>
          </div>
        </div>
      </article>
    </Card3D>
  );
}
