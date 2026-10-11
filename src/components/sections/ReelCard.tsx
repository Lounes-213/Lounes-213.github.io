"use client";

import { useRef, useState } from "react";
import { External, Instagram, Pause, Play, Volume2, VolumeX } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import type { ReelProject } from "@/content/reels";
import { pick } from "@/content/schema";
import type { Locale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils/cn";

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
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-surface shadow-1 transition-all duration-300 hover:border-accent/40 hover:shadow-2"
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

        {/* Top Header: Languages & Direct Instagram Link */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2 sm:p-3 z-10 gap-1.5">
          {/* Programming Languages Badge */}
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

          {/* Instagram Reel Button */}
          <a
            href={project.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={tWatch}
            className="flex items-center gap-1 rounded-full bg-black/60 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-medium text-white/95 backdrop-blur-md transition-all hover:bg-black hover:scale-105 border border-white/10 shrink-0"
          >
            <Instagram size={12} className="text-[#E1306C]" />
            <span className="hidden min-[400px]:inline text-[10px] sm:text-[11px]">Reel</span>
            <External size={10} className="opacity-70" />
          </a>
        </div>

        {/* Center Play/Pause Indicator Button */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-200 pointer-events-none",
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
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2 sm:p-3 z-10 gap-1.5">
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

      {/* Card Body: Title, Short Description, Tags (compact on mobile) */}
      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold tracking-tight text-fg group-hover:text-accent transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="mt-1 text-xs text-fg-muted line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tech tags & Link Footer */}
        <div className="mt-3 pt-2.5 border-t border-border-subtle flex flex-col gap-2">
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

          <a
            href={project.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between gap-1.5 rounded-lg bg-surface-sunken px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-fg-muted hover:text-fg hover:bg-surface-elevated transition-all border border-border-subtle"
          >
            <span className="flex items-center gap-1.5">
              <Instagram size={13} className="text-[#E1306C]" />
              {tWatch}
            </span>
            <External size={11} className="opacity-60" />
          </a>
        </div>
      </div>
    </article>
  );
}
