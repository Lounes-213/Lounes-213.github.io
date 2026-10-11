import type { SVGProps } from "react";

/**
 * The whole icon set, inline. Twelve icons cost less as paths than as a
 * dependency, they inherit `currentColor` (so they follow the theme with no
 * extra work) and they scale from the token type scale.
 */
export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export const ArrowRight = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ArrowLeft = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M20 12H5" />
    <path d="m11 18-6-6 6-6" />
  </svg>
);

export const Send = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export const ArrowUp = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 19V5" />
    <path d="m6 11 6-6 6 6" />
  </svg>
);

export const ArrowDown = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 5v14" />
    <path d="m18 13-6 6-6-6" />
  </svg>
);

export const External = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M14 4h6v6" />
    <path d="M20 4 10 14" />
    <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

export const Sun = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const Moon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </svg>
);

export const Monitor = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <rect x="2.5" y="4" width="19" height="13" rx="1.6" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

export const Globe = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
  </svg>
);

export const Check = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const Sparkle = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="m6.5 6.5 2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2" />
  </svg>
);

export const Terminal = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <rect x="2.5" y="4" width="19" height="16" rx="2" />
    <path d="m6.5 9 3 3-3 3M12.5 15h5" />
  </svg>
);

export const Copy = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M15 5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15" />
  </svg>
);

export const Mail = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const WhatsApp = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M20 11.8A8 8 0 0 1 8.4 19L4 20l1.2-4.2A8 8 0 1 1 20 11.8Z" />
    <path d="M9.2 9.4c0 3 2.4 5.4 5.4 5.4.5 0 1-.4 1-.9v-.8l-1.6-.7-.8.9c-1-.4-1.8-1.2-2.2-2.2l.9-.8-.7-1.6h-.9c-.5 0-1 .4-1.1.9Z" />
  </svg>
);

export const GitHub = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M9 20.5c-4 1-4-2.5-5.5-3M15.5 22v-3.4a3 3 0 0 0-.8-2.3c2.6-.3 4.3-1.3 4.3-5.2a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.9s-1.1-.3-3.4 1.3a8.3 8.3 0 0 0-4.4 0C7.7 5.1 6.6 5.4 6.6 5.4a3.7 3.7 0 0 0-.1 2.9A4 4 0 0 0 5.4 11c0 3.9 1.7 4.9 4.3 5.2a3 3 0 0 0-.8 2.3V22" />
  </svg>
);

export const LinkedIn = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <path d="M7.5 10v7M7.5 7.2v.1M11.5 17v-4a2.2 2.2 0 0 1 4.4 0v4" />
  </svg>
);

export const Layers = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);

export const Compass = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5.5-5.5 2 2-5.5 5.5-2Z" />
  </svg>
);

export const Pulse = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M3 12h4l2.5-6 4 12 2.5-6h5" />
  </svg>
);

export const Shield = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Smartphone = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </svg>
);

export const Cloud = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M6.5 18.5a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17 9.6a3.9 3.9 0 0 1 .4 8.9Z" />
  </svg>
);

export const Download = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const FileText = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export const Play = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <polygon points="6 4 19 12 6 20 6 4" fill="currentColor" stroke="none" />
  </svg>
);

export const Pause = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
    <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
  </svg>
);

export const Volume2 = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

export const VolumeX = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="22" y1="9" x2="16" y2="15" />
    <line x1="16" y1="9" x2="22" y2="15" />
  </svg>
);

export const Instagram = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

