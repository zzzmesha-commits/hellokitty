import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SatinBow } from './RibbonMotif';

interface EntryPromptScreenProps {
  onEnter: (origin: { x: number; y: number }) => void;
}

function TinyHeart({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 14.2s-5.6-3.5-6.9-7.1C.3 4.8 1.9 2.5 4.3 2.5c1.5 0 2.8.8 3.7 2 .9-1.2 2.2-2 3.7-2 2.4 0 4 2.3 3.2 4.6-1.3 3.6-6.9 7.1-6.9 7.1z" />
    </svg>
  );
}

function FrameCornerPearl({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white via-[#FCEEF3] to-[#D9A7B8] border border-[#E4BBC8] shadow-2xs ${className}`}
    />
  );
}

export function EntryPromptScreen({ onEnter }: EntryPromptScreenProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleChooseYes = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const isKeyboard = event.detail === 0;
    const x = isKeyboard ? rect.left + rect.width / 2 : event.clientX;
    const y = isKeyboard ? rect.top + rect.height / 2 : event.clientY;
    onEnter({ x, y });
  };

  return (
    <motion.main
      aria-labelledby="entry-question-heading"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 w-full max-w-md flex flex-col items-center"
    >
      <div className="relative w-full rounded-2xl border border-[#E5C0CC] bg-[#FFF9FB]/95 p-4 sm:p-5 shadow-[0_20px_50px_rgba(166,58,89,0.16)]">
        {/* Coquette Satin Bow Crest */}
        <div className="flex justify-center -mt-10 mb-1.5 pointer-events-none">
          <SatinBow className="w-16 h-10 drop-shadow-xs" color="#B84868" />
        </div>

        {/* Corner pearls */}
        <FrameCornerPearl className="top-2.5 left-2.5" />
        <FrameCornerPearl className="top-2.5 right-2.5" />
        <FrameCornerPearl className="bottom-2.5 left-2.5" />
        <FrameCornerPearl className="bottom-2.5 right-2.5" />

        {/* Stitched inner stationery card */}
        <div className="rounded-xl border border-dashed border-[#E6BDC9] bg-gradient-to-b from-[#FFFDFD] to-[#FFF5F8] px-6 py-9 sm:px-8 sm:py-10 text-center flex flex-col items-center">
          <TinyHeart className="w-4 h-4 text-[#C85475] mb-3" />

          <h1
            id="entry-question-heading"
            className="font-display text-3xl sm:text-[2.15rem] font-bold leading-tight text-[#8E2D4A] text-balance"
          >
            do vanish and chi cute together
          </h1>

          <p className="mt-2.5 text-xs font-medium tracking-wide text-[#7E5B67]">
            Answer to enter
          </p>

          <div className="mt-7 w-full grid grid-cols-2 gap-3.5">
            <button
              type="button"
              onClick={handleChooseYes}
              className="py-2.5 px-6 rounded-xl bg-[#B84C6C] hover:bg-[#9E3B58] text-white font-display italic text-lg font-bold shadow-[0_8px_20px_rgba(166,58,89,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
            >
              yes
            </button>
            <button
              type="button"
              onClick={handleChooseYes}
              className="py-2.5 px-6 rounded-xl border border-[#DFB3C1] hover:border-[#C45473] bg-[#FDF1F5] hover:bg-[#FCE6EE] text-[#752039] font-display italic text-lg font-bold transition-all duration-200 ease-out hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
            >
              yes
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
