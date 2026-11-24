import React from 'react';
import { SatinBow } from './RibbonMotif';

interface BlossomSpec {
  left: string;
  size: number;
  duration: string;
  delay: string;
  color: string;
  kind: 'blossom' | 'petal' | 'heart';
  foreground?: boolean;
}

const FALLING_CHERRY_BLOSSOMS: BlossomSpec[] = [
  { left: '3%', size: 22, duration: '11.5s', delay: '-2s', color: '#F9B4CB', kind: 'blossom' },
  { left: '7%', size: 15, duration: '13.5s', delay: '-8s', color: '#F69AB9', kind: 'petal' },
  { left: '12%', size: 12, duration: '14s', delay: '-5s', color: '#FBC7D9', kind: 'heart' },
  { left: '17%', size: 20, duration: '12.5s', delay: '-10s', color: '#FAD0DF', kind: 'blossom', foreground: true },
  { left: '22%', size: 16, duration: '11s', delay: '-4s', color: '#F394B6', kind: 'petal' },
  { left: '27%', size: 14, duration: '15s', delay: '-12s', color: '#F9B8CE', kind: 'petal' },
  { left: '33%', size: 23, duration: '13s', delay: '-6s', color: '#F7A8C4', kind: 'blossom' },
  { left: '39%', size: 14, duration: '12s', delay: '-1s', color: '#FAD5E2', kind: 'petal', foreground: true },
  { left: '44%', size: 11, duration: '14.5s', delay: '-9s', color: '#F5A3C0', kind: 'heart' },
  { left: '50%', size: 20, duration: '11.8s', delay: '-3.5s', color: '#F9B4CB', kind: 'blossom' },
  { left: '56%', size: 15, duration: '13.2s', delay: '-7.5s', color: '#F394B6', kind: 'petal' },
  { left: '61%', size: 22, duration: '14.2s', delay: '-11s', color: '#FAD0DF', kind: 'blossom', foreground: true },
  { left: '67%', size: 15, duration: '12.2s', delay: '-2.5s', color: '#F9B8CE', kind: 'petal' },
  { left: '72%', size: 12, duration: '15.2s', delay: '-8.5s', color: '#FBC7D9', kind: 'heart' },
  { left: '77%', size: 21, duration: '11.2s', delay: '-5.5s', color: '#F7A8C4', kind: 'blossom' },
  { left: '82%', size: 16, duration: '13.8s', delay: '-12.5s', color: '#F394B6', kind: 'petal', foreground: true },
  { left: '87%', size: 14, duration: '12.8s', delay: '-4.5s', color: '#FAD5E2', kind: 'petal' },
  { left: '91%', size: 23, duration: '14.6s', delay: '-9.5s', color: '#F9B4CB', kind: 'blossom' },
  { left: '95%', size: 15, duration: '11.6s', delay: '-1.5s', color: '#F69AB9', kind: 'petal', foreground: true },
];

const CORNER_SPARKLES = [
  { top: '12%', left: '6%', delay: '0s', size: 'w-4 h-4' },
  { top: '26%', left: '4%', delay: '1.2s', size: 'w-3 h-3' },
  { top: '68%', left: '5%', delay: '0.6s', size: 'w-3.5 h-3.5' },
  { top: '84%', left: '8%', delay: '1.8s', size: 'w-3 h-3' },
  { top: '14%', right: '6%', delay: '0.9s', size: 'w-4 h-4' },
  { top: '32%', right: '4%', delay: '2.1s', size: 'w-3 h-3' },
  { top: '70%', right: '5%', delay: '0.4s', size: 'w-3.5 h-3.5' },
  { top: '85%', right: '8%', delay: '1.5s', size: 'w-3 h-3' },
];

function ScallopedLaceEdge({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 28"
      preserveAspectRatio="none"
      className={`w-full h-5 sm:h-6 text-[#FFF9FB]/90 drop-shadow-[0_2px_4px_rgba(166,58,89,0.12)] ${
        flip ? 'rotate-180' : ''
      }`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={flip ? 'lace-scallop-bottom' : 'lace-scallop-top'}
          width="40"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 0 H40 V10 C35 22, 25 22, 20 10 C15 22, 5 22, 0 10 Z"
            fill="currentColor"
          />
          <circle cx="10" cy="12" r="2" fill="#F2B8CC" opacity="0.65" />
          <circle cx="30" cy="12" r="2" fill="#F2B8CC" opacity="0.65" />
          <path
            d="M0 10 C5 22, 15 22, 20 10 C25 22, 35 22, 40 10"
            fill="none"
            stroke="#E8B2C5"
            strokeWidth="1.2"
          />
        </pattern>
      </defs>
      <rect
        width="1200"
        height="28"
        fill={`url(#${flip ? 'lace-scallop-bottom' : 'lace-scallop-top'})`}
      />
    </svg>
  );
}

function SakuraBlossomSvg({ color, size }: { color: string; size: number }) {
  const angles = [0, 72, 144, 216, 288];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className="drop-shadow-[0_2px_4px_rgba(166,58,89,0.18)]"
      aria-hidden="true"
    >
      {angles.map((angle) => (
        <g key={angle} transform={`rotate(${angle} 16 16)`}>
          <path
            d="M16 15 C12.5 11, 11.2 6.2, 13.8 3.6 C14.9 2.6, 15.6 3.5, 16 4.7 C16.4 3.5, 17.1 2.6, 18.2 3.6 C20.8 6.2, 19.5 11, 16 15 Z"
            fill={color}
            stroke="#FFF9FB"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
        </g>
      ))}
      <circle cx="16" cy="16" r="2.6" fill="#FCE0EC" />
      <circle cx="16" cy="16" r="1.4" fill="#D9688A" />
    </svg>
  );
}

function SakuraPetalSvg({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="drop-shadow-[0_1px_3px_rgba(166,58,89,0.16)]"
      aria-hidden="true"
    >
      <path
        d="M12 3.5 C11.4 2.2, 9.6 2.1, 8.2 3.8 C5.5 7.2, 5.8 13.4, 8.6 18.1 C10.1 20.4, 11.2 21.6, 12 22 C12.8 21.6, 13.9 20.4, 15.4 18.1 C18.2 13.4, 18.5 7.2, 15.8 3.8 C14.4 2.1, 12.6 2.2, 12 3.5 Z"
        fill={color}
        fillOpacity="0.92"
        stroke="#FFF8FA"
        strokeWidth="0.9"
      />
      <path
        d="M12 6.5 C12.2 10.5, 12.1 15, 12 19.5"
        stroke="#FFF5F8"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function MiniHeartSvg({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} aria-hidden="true">
      <path
        d="M8 14.2s-5.6-3.5-6.9-7.1C.3 4.8 1.9 2.5 4.3 2.5c1.5 0 2.8.8 3.7 2 .9-1.2 2.2-2 3.7-2 2.4 0 4 2.3 3.2 4.6-1.3 3.6-6.9 7.1-6.9 7.1z"
        fillOpacity="0.82"
      />
    </svg>
  );
}

function SparkleSvg({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
    </svg>
  );
}

function renderBlossomItem(item: BlossomSpec) {
  if (item.kind === 'blossom') {
    return <SakuraBlossomSvg color={item.color} size={item.size} />;
  }
  if (item.kind === 'petal') {
    return <SakuraPetalSvg color={item.color} size={item.size} />;
  }
  return <MiniHeartSvg color={item.color} size={item.size} />;
}

export function BackgroundDecorations() {
  const backgroundBlossoms = FALLING_CHERRY_BLOSSOMS.filter((b) => !b.foreground);
  const foregroundBlossoms = FALLING_CHERRY_BLOSSOMS.filter((b) => b.foreground);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none fixed inset-0 overflow-hidden z-[1]"
      >
        {/* Top & bottom dainty scalloped lace edges */}
        <div className="absolute inset-x-0 top-0">
          <ScallopedLaceEdge />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <ScallopedLaceEdge flip />
        </div>

        {/* Subtle corner satin bows */}
        <div className="hidden sm:block absolute top-5 left-5 -rotate-12 opacity-80">
          <SatinBow className="w-14 h-9 drop-shadow-xs" color="#C45473" />
        </div>
        <div className="hidden sm:block absolute top-5 right-5 rotate-12 opacity-80">
          <SatinBow className="w-14 h-9 drop-shadow-xs" color="#C45473" />
        </div>
        <div className="hidden sm:block absolute bottom-5 left-5 rotate-12 opacity-75">
          <SatinBow className="w-12 h-8 drop-shadow-xs" color="#C45473" />
        </div>

        {/* Soft twinkling four-point sparkles along outer margins */}
        {CORNER_SPARKLES.map((sparkle, index) => (
          <span
            key={index}
            className="coquette-twinkle absolute text-[#FFFDFD] drop-shadow-[0_0_6px_rgba(220,104,142,0.5)]"
            style={
              {
                top: sparkle.top,
                left: sparkle.left,
                right: sparkle.right,
                '--twinkle-delay': sparkle.delay,
              } as React.CSSProperties
            }
          >
            <SparkleSvg className={sparkle.size} />
          </span>
        ))}

        {/* Falling cherry blossoms & notched petals behind cards */}
        {backgroundBlossoms.map((item, index) => (
          <span
            key={`bg-${index}`}
            className="sakura-petal-fall absolute -top-10"
            style={
              {
                left: item.left,
                '--petal-duration': item.duration,
                '--petal-delay': item.delay,
              } as React.CSSProperties
            }
          >
            {renderBlossomItem(item)}
          </span>
        ))}
      </div>

      {/* Gentle foreground depth cherry blossoms drifting softly */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none fixed inset-0 overflow-hidden z-[25]"
      >
        {foregroundBlossoms.map((item, index) => (
          <span
            key={`fg-${index}`}
            className="sakura-petal-fall absolute -top-10 opacity-75"
            style={
              {
                left: item.left,
                '--petal-duration': item.duration,
                '--petal-delay': item.delay,
              } as React.CSSProperties
            }
          >
            {renderBlossomItem(item)}
          </span>
        ))}
      </div>
    </>
  );
}
