import type { SVGProps } from "react";

/**
 * Familia de iconos propia — Social Commerce
 * Grid base 24×24. Stroke consistente. Terminales y joins redondeados.
 * Cada icono soporta `active` para alternar entre outline y filled.
 * Ver ICONOGRAPHY_SPEC.md
 */

export interface IconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
  size?: number;
}

const base = {
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconHome({ active, size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path
        d="M4 11.5 12 4l8 7.5"
        stroke="currentColor"
        {...base}
      />
      <path
        d="M6 10v8.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V10"
        stroke="currentColor"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.18 : 0}
        {...base}
      />
      <path d="M10 19.5v-5h4v5" stroke="currentColor" {...base} />
    </svg>
  );
}

export function IconExplore({ active, size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle
        cx="12"
        cy="12"
        r="8.2"
        stroke="currentColor"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.14 : 0}
        {...base}
      />
      <path
        d="m14.6 9.4-1.4 4-4 1.4 1.4-4 4-1.4Z"
        stroke="currentColor"
        fill="currentColor"
        fillOpacity={active ? 0.9 : 0}
        {...base}
      />
    </svg>
  );
}

export function IconHeart({ active, size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z"
        stroke="currentColor"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 1 : 0}
        {...base}
      />
    </svg>
  );
}

export function IconChat({ active, size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path
        d="M4 12c0-4.4 3.6-7.5 8-7.5s8 3.1 8 7.5-3.6 7.5-8 7.5c-.9 0-1.8-.1-2.6-.4L5.5 20l.9-3.4C5 15.3 4 13.8 4 12Z"
        stroke="currentColor"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.16 : 0}
        {...base}
      />
      <path d="M9 11.2h6M9 14h4" stroke="currentColor" {...base} />
    </svg>
  );
}

export function IconProfile({ active, size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle
        cx="12"
        cy="8.2"
        r="3.2"
        stroke="currentColor"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 1 : 0}
        {...base}
      />
      <path
        d="M5 19.5c.9-3.4 3.6-5.2 7-5.2s6.1 1.8 7 5.2"
        stroke="currentColor"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.16 : 0}
        {...base}
      />
    </svg>
  );
}

export function IconShare({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="18" cy="6" r="2.3" stroke="currentColor" {...base} />
      <circle cx="6" cy="12" r="2.3" stroke="currentColor" {...base} />
      <circle cx="18" cy="18" r="2.3" stroke="currentColor" {...base} />
      <path d="m8.1 10.8 7.8-3.6M8.1 13.2l7.8 3.6" stroke="currentColor" {...base} />
    </svg>
  );
}

export function IconAsk({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" {...base} />
      <path
        d="M9.6 9.8c.2-1.2 1.2-2 2.5-2 1.4 0 2.5.9 2.5 2.1 0 1.6-2.3 1.7-2.5 3.3"
        stroke="currentColor"
        {...base}
      />
      <circle cx="12.1" cy="16.3" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBuy({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path
        d="M6 8h12l-1 10.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L6 8Z"
        stroke="currentColor"
        {...base}
      />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="currentColor" {...base} />
    </svg>
  );
}

export function IconWhatsapp({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path
        d="M21 16.4v2.7a1.8 1.8 0 0 1-2 1.8 17.8 17.8 0 0 1-7.8-2.8 17.5 17.5 0 0 1-5.4-5.4A17.8 17.8 0 0 1 3 4.9 1.8 1.8 0 0 1 4.8 3h2.7a1.8 1.8 0 0 1 1.8 1.5c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14.4 14.4 0 0 0 5.4 5.4l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6A1.8 1.8 0 0 1 21 16.4Z"
        stroke="currentColor"
        {...base}
      />
    </svg>
  );
}

export function IconSearch({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" {...base} />
      <path d="m19 19-3.4-3.4" stroke="currentColor" {...base} />
    </svg>
  );
}

export function IconFilter({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" {...base} />
    </svg>
  );
}

export function IconClose({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" {...base} />
    </svg>
  );
}

export function IconBack({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path d="M15 5.5 8 12l7 6.5" stroke="currentColor" {...base} />
    </svg>
  );
}

export function IconMore({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="5.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconStore({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path d="M4.5 9.5 5.5 5h13l1 4.5" stroke="currentColor" {...base} />
      <path
        d="M5 9.5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"
        stroke="currentColor"
        {...base}
      />
      <path d="M9.5 19.5V15a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4.5" stroke="currentColor" {...base} />
    </svg>
  );
}

export function IconBell({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path
        d="M7 10.5a5 5 0 0 1 10 0c0 3 .8 4.2 1.5 5H5.5c.7-.8 1.5-2 1.5-5Z"
        stroke="currentColor"
        {...base}
      />
      <path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" {...base} />
    </svg>
  );
}

export function IconMapPin({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path
        d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11Z"
        stroke="currentColor"
        {...base}
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" {...base} />
    </svg>
  );
}

export function IconSave({ active, size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path
        d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.6-6 3.6V5.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.9 : 0}
        {...base}
      />
    </svg>
  );
}
