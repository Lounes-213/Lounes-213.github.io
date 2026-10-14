import type { SVGProps } from "react";

export type TechIconProps = SVGProps<SVGSVGElement> & { size?: number };

export const IconFlutter = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M14.3 2.5L3.5 13.3l3.3 3.3L20.8 2.5h-6.5z" fill="#02569B" />
    <path d="M14.3 12.2l-5.6 5.6 3.3 3.3 5.6-5.6-3.3-3.3z" fill="#0175C2" />
    <path d="M8.7 17.8l3.3 3.3 2.3-2.3-3.3-3.3-2.3 2.3z" fill="#29B6F6" />
    <path d="M14.3 21.1h6.5l-5.6-5.6-3.3 3.3 2.4 2.3z" fill="#02569B" />
  </svg>
);

export const IconDart = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M4 14.5L9.5 20H15L7.5 12.5 4 14.5z" fill="#01579B" />
    <path d="M4 9.5L9.5 4H15L7.5 11.5 4 9.5z" fill="#00B0FF" />
    <path d="M9.5 4l10 10-4.5 4.5-10-10L9.5 4z" fill="#00838F" />
    <path d="M15 4h5v5l-10 10H5v-5L15 4z" fill="#00B4AB" />
  </svg>
);

export const IconPython = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path
      d="M11.9 2c-3.1 0-4.9 1.4-4.9 3.2v2.3h5v.8H5.3C3.5 8.3 2 9.9 2 12.3c0 2.5 1.5 4 3.3 4h1.7v-2c0-2 1.7-3.7 3.7-3.7h5.1c1.6 0 3-1.3 3-3V5.2c0-1.8-1.8-3.2-4.9-3.2h-2zM9.5 3.9a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z"
      fill="#387EB8"
    />
    <path
      d="M12.1 22c3.1 0 4.9-1.4 4.9-3.2v-2.3h-5v-.8h6.7c1.8 0 3.3-1.6 3.3-4 0-2.5-1.5-4-3.3-4H17v2c0 2-1.7 3.7-3.7 3.7H8.2c-1.6 0-3 1.3-3 3v2.4c0 1.8 1.8 3.2 4.9 3.2h2zM14.5 20.1a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"
      fill="#FFE052"
    />
  </svg>
);

export const IconNextjs = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="12" cy="12" r="10" fill="currentColor" className="text-fg" />
    <path
      d="M15.5 8.5v7m-3.5-7v7m-4.5-7l8 10"
      stroke="var(--bg)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconFastAPI = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="12" cy="12" r="10" fill="#059669" />
    <path d="M13 3L6 13h5l-1 8 8-11h-5l1-7z" fill="#ffffff" />
  </svg>
);

export const IconJava = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path
      d="M8.5 17.5c2.5.5 5.5.5 7.5-.2 0 0-4.5 1.5-9 .2 0 0 1 .5 1.5 0zM7 19.5c3.2.5 7.3.5 10-.3 0 0-5.8 2-11.8.3 0 0 1.2.5 1.8 0zM12.5 3c-.8 2-2 3.5-2.5 5 .5-.2 1.5-.7 2-1.5.5 1.5.8 2.5 0 4.5 2-1 2.5-3 2.5-4-.5.5-1 1-1.5 1 .5-2 0-3.5-.5-5z"
      fill="#EA2D2E"
    />
    <path
      d="M16 11c1 .2 2 .8 1.8 1.8-.3 1-1.8 1.4-3.3 1.4.5-.4 1-.8 1-1.2 0-.8-.8-1-1.5-1.1.7-.5 1.5-.7 2-.9z"
      fill="#5382A1"
    />
  </svg>
);

export const IconR = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <ellipse cx="12" cy="12" rx="10" ry="8" fill="#276DC3" />
    <text x="12" y="16" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
      R
    </text>
  </svg>
);

export const IconWeb = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M4 3h16l-1.5 15L12 21l-6.5-3L4 3z" fill="#E44D26" />
    <path d="M12 5v14l4.8-2.2 1.2-11.8H12z" fill="#F16529" />
    <path d="M8 8h8M8 11.5h7.5l-.5 4.5-3 1-3-1-.2-2" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconTensorFlow = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#FF6F00" opacity="0.2" />
    <path d="M12 2l9 5v10l-9 5V2z" fill="#FF6F00" />
    <path d="M12 2L3 7v10l9 5V2z" fill="#FFA000" />
    <path d="M12 7l4 2.5v5L12 17v-5l-4-2.5V7l4 2.5z" fill="#ffffff" />
  </svg>
);

export const IconOpenCV = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="12" cy="7" r="4.5" fill="#EE2C2C" />
    <circle cx="7" cy="16" r="4.5" fill="#008000" />
    <circle cx="17" cy="16" r="4.5" fill="#0000EE" />
    <circle cx="12" cy="7" r="2" fill="#ffffff" />
    <circle cx="7" cy="16" r="2" fill="#ffffff" />
    <circle cx="17" cy="16" r="2" fill="#ffffff" />
  </svg>
);

export const IconStreamlit = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M14.5 4.5l-8 14.5H2l6.5-12 6 2v-4.5z" fill="#FF4B4B" />
    <path d="M22 19H9.5l6-11 6.5 11z" fill="#FF2B2B" />
  </svg>
);

export const IconPandas = ({ size = 20, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <rect x="4" y="4" width="6" height="6" rx="1.5" fill="#150458" />
    <rect x="14" y="4" width="6" height="6" rx="1.5" fill="#E70488" />
    <rect x="4" y="14" width="6" height="6" rx="1.5" fill="#E70488" />
    <rect x="14" y="14" width="6" height="6" rx="1.5" fill="#150458" />
  </svg>
);

export const IconTikTok = ({ size = 18, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path
      d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.31 0 .61.05.88.15V9.78a5.674 5.674 0 0 0-.88-.07A5.69 5.69 0 1 0 15.54 15.4V8.81a7.35 7.35 0 0 0 4.46 1.49V7.21a4.27 4.27 0 0 1-3.4-1.39z"
      fill="currentColor"
    />
  </svg>
);

export const IconFacebook = ({ size = 18, className, ...props }: TechIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path
      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
      fill="currentColor"
    />
  </svg>
);
