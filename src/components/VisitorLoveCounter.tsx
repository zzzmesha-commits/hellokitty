import React, { useState } from 'react';

const VISITOR_COUNT_STORAGE_KEY = 'vanish_chi_visitor_love_count_v1';
let hasRecordedCurrentPageView = false;

function readAndIncrementPageViews(): number {
  let current = 0;
  try {
    const raw = window.localStorage.getItem(VISITOR_COUNT_STORAGE_KEY);
    const parsed = raw ? Number.parseInt(raw, 10) : 0;
    current = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  } catch {
    current = 0;
  }

  if (!hasRecordedCurrentPageView) {
    hasRecordedCurrentPageView = true;
    current += 1;
    try {
      window.localStorage.setItem(VISITOR_COUNT_STORAGE_KEY, String(current));
    } catch {
      // Ignore storage write errors
    }
  }

  return Math.max(1, current);
}

function PixelHeart({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9 8"
      fill="currentColor"
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="1" y="0" width="2" height="1" />
      <rect x="6" y="0" width="2" height="1" />
      <rect x="0" y="1" width="4" height="2" />
      <rect x="5" y="1" width="4" height="2" />
      <rect x="0" y="3" width="9" height="1" />
      <rect x="1" y="4" width="7" height="1" />
      <rect x="2" y="5" width="5" height="1" />
      <rect x="3" y="6" width="3" height="1" />
      <rect x="4" y="7" width="1" height="1" />
    </svg>
  );
}

export function VisitorLoveCounter() {
  const [views] = useState<number>(() => readAndIncrementPageViews());

  const formattedDigits = String(views)
    .padStart(6, '0')
    .slice(-6)
    .split('');

  const viewCount = views;

  return (
    <footer
      aria-label="Visitor Love Counter"
      className="mt-14 sm:mt-16 pb-2 flex flex-col items-center text-center select-none"
    >
      {/* Old-school beveled hit-counter housing */}
      <div className="inline-flex flex-col items-center rounded-md border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#C995A6] border-b-[#C995A6] bg-[#F7E4EB]/95 px-4 py-3 shadow-[0_8px_22px_rgba(166,58,89,0.1)]">
        <div className="flex items-center gap-2 mb-2">
          <PixelHeart className="w-3 h-3 text-[#C45473]" />
          <span className="font-mono text-[11px] font-medium tracking-wide text-[#6E3647]">
            Visitor Love Counter
          </span>
          <PixelHeart className="w-3 h-3 text-[#C45473]" />
        </div>

        {/* Recessed retro digital odometer readout */}
        <div
          aria-live="polite"
          className="inline-flex items-center gap-1 rounded-xs border-2 border-t-[#14070B] border-l-[#14070B] border-r-[#5D2C3B] border-b-[#5D2C3B] bg-[#240F16] px-2 py-1.5 shadow-inner"
        >
          {formattedDigits.map((digit, index) => (
            <span
              key={index}
              className="relative inline-flex items-center justify-center w-5 sm:w-6 h-7 sm:h-8 rounded-[2px] bg-gradient-to-b from-[#331620] via-[#240F16] to-[#2C121B] border border-[#49212E] font-mono tabular-nums text-base sm:text-lg font-medium text-[#FFD3E1] leading-none"
              style={{
                textShadow: '0 0 6px rgba(255, 160, 194, 0.45)',
              }}
            >
              {/* Classic mechanical flip-counter center crease */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#14070B]/70"
              />
              <span className="relative z-10">{digit}</span>
            </span>
          ))}
        </div>

        <p className="mt-2 font-mono text-[11px] tabular-nums text-[#7A5461]">
          {viewCount === 1 ? '1 page view' : `${viewCount.toLocaleString()} page views`}
        </p>
      </div>
    </footer>
  );
}
