import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import type { LoveLetterData } from '../types/keepsake';
import {
  HelloKittyGripPaw,
  HelloKittyPeekingHead,
  SatinBow,
} from './RibbonMotif';
import surpriseKittyFallback from '../assets/images/kitty_surprise_fallback.gif';

const SURPRISE_KITTY_GIF_URL =
  'https://i.pinimg.com/originals/f4/8d/b0/f48db085f9baf6d22dbf60f6a0f7f20b.gif';

interface LoveLetterEnvelopeProps {
  letter: LoveLetterData;
  onOpenCelebrate?: (origin: { x: number; y: number }) => void;
}

type EnvelopeStage = 'closed' | 'surprise' | 'open';

function SealHeart({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 14.2s-5.6-3.5-6.9-7.1C.3 4.8 1.9 2.5 4.3 2.5c1.5 0 2.8.8 3.7 2 .9-1.2 2.2-2 3.7-2 2.4 0 4 2.3 3.2 4.6-1.3 3.6-6.9 7.1-6.9 7.1z" />
    </svg>
  );
}

function LetterCornerPearl({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white via-[#FCEEF3] to-[#D9A7B8] border border-[#E4BBC8] shadow-2xs z-20 ${className}`}
    />
  );
}

function CutePostageStamp() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5"
    >
      {/* Dainty wavy postmark lines */}
      <svg viewBox="0 0 32 18" className="w-7 h-4 text-[#D991A8]" fill="none">
        <path
          d="M1 4 C6 1, 11 7, 16 4 C21 1, 26 7, 31 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M1 9 C6 6, 11 12, 16 9 C21 6, 26 12, 31 9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M1 14 C6 11, 11 17, 16 14 C21 11, 26 17, 31 14"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      {/* Perforated pastel pink postage stamp */}
      <div className="w-10 h-11 rounded-xs border border-dashed border-[#DF9BB1] bg-[#FFF5F8] p-1 shadow-2xs flex flex-col items-center justify-center rotate-3">
        <div className="w-full h-full rounded-[2px] bg-gradient-to-b from-[#FCE1EA] to-[#F7CAD9] flex flex-col items-center justify-center">
          <SealHeart className="w-3.5 h-3.5 text-[#C45473]" />
          <span className="mt-0.5 font-mono text-[7px] font-medium tracking-wider text-[#8E304B]">
            LOVE
          </span>
        </div>
      </div>
    </div>
  );
}

export function LoveLetterEnvelope({
  letter,
  onOpenCelebrate,
}: LoveLetterEnvelopeProps) {
  const [stage, setStage] = useState<EnvelopeStage>('closed');
  const [surpriseGifSrc, setSurpriseGifSrc] = useState<string>(SURPRISE_KITTY_GIF_URL);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (stage === 'closed') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !document.querySelector('[role="dialog"]')) {
        setStage('closed');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage]);

  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const triggerCelebrate = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const isKeyboard = event.detail === 0;
    const x = isKeyboard ? rect.left + rect.width / 2 : event.clientX;
    const y = isKeyboard ? rect.top + rect.height / 2 : event.clientY;
    onOpenCelebrate?.({ x, y });
  };

  const handleOpenEnvelope = (event: React.MouseEvent<HTMLButtonElement>) => {
    triggerCelebrate(event);
    setStage('surprise');
  };

  const handleRevealLetter = (event: React.MouseEvent<HTMLButtonElement>) => {
    triggerCelebrate(event);
    setStage('open');
  };

  return (
    <section
      aria-label="Love letter envelope"
      className="mt-28 sm:mt-32 w-full flex flex-col items-center"
    >
      <AnimatePresence mode="wait" initial={false}>
        {stage === 'closed' && (
          <motion.button
            key="closed-envelope"
            type="button"
            onClick={handleOpenEnvelope}
            aria-expanded={false}
            aria-label={`${letter.envelopeLabel}. ${letter.envelopeHint}`}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.9, y: 10 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.06, y: -8 }
            }
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -4 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.28, ease: easeCurve }}
            className="group relative w-full max-w-sm cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C45473]"
          >
            {/* Hello Kitty peeking up behind the top edge of the envelope */}
            <div className="pointer-events-none absolute -top-[84px] left-1/2 -translate-x-1/2 z-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
              <HelloKittyPeekingHead className="w-36 h-[116px]" />
            </div>

            {/* Two rounded Hello Kitty hands holding both sides of the envelope */}
            <HelloKittyGripPaw className="absolute top-[46%] -translate-y-1/2 -left-4 z-20 w-11 h-9 rotate-[82deg] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
            <HelloKittyGripPaw className="absolute top-[46%] -translate-y-1/2 -right-4 z-20 w-11 h-9 -rotate-[82deg] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />

            {/* Envelope card body */}
            <div className="relative z-10 w-full rounded-2xl border border-[#E5C0CC] group-hover:border-[#C45473] bg-gradient-to-b from-[#FFFDFD] via-[#FFF8FA] to-[#FDF0F4] p-3 shadow-[0_14px_34px_rgba(166,58,89,0.14)]">
              {/* Corner pearls */}
              <LetterCornerPearl className="top-2.5 left-2.5" />
              <LetterCornerPearl className="top-2.5 right-2.5" />
              <LetterCornerPearl className="bottom-2.5 left-2.5" />
              <LetterCornerPearl className="bottom-2.5 right-2.5" />

              {/* Inner stitched envelope stationery frame */}
              <div className="relative w-full min-h-[202px] rounded-xl border border-dashed border-[#E6BDC9] bg-[#FFFBFD] overflow-hidden flex flex-col items-center justify-end pb-6 pt-24 px-6">
                {/* Envelope flap & pocket geometry */}
                <svg
                  viewBox="0 0 360 200"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 w-full h-full"
                  aria-hidden="true"
                >
                  {/* Lower side & bottom pocket folds */}
                  <path
                    d="M0 200 L145 104 L215 104 L360 200"
                    fill="#FDF2F6"
                    fillOpacity="0.65"
                    stroke="#E8C7D2"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M0 0 L150 105 M360 0 L210 105"
                    stroke="#EBD1DA"
                    strokeWidth="1.1"
                  />
                  {/* Top triangular envelope flap */}
                  <path
                    d="M0 0 L180 118 L360 0 Z"
                    fill="#FAF0F4"
                    stroke="#DFB3C1"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14 4 L180 110 L346 4"
                    fill="none"
                    stroke="#F2DCE4"
                    strokeWidth="1"
                  />
                </svg>

                {/* Cute love postage stamp & postmark */}
                <CutePostageStamp />

                {/* Dainty satin bow tucked behind the wax heart seal */}
                <div className="relative z-10 -mt-14 mb-5 flex flex-col items-center">
                  <SatinBow className="w-12 h-8 -mb-4 opacity-90" color="#C85D7C" />
                  <span
                    aria-hidden="true"
                    className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-br from-[#D46282] via-[#B44162] to-[#872441] border-2 border-[#F8D9E3] shadow-[0_6px_14px_rgba(140,40,69,0.28)] flex items-center justify-center text-[#FFF7F9] transition-transform duration-200 ease-out group-hover:scale-110"
                  >
                    <SealHeart className="w-4 h-4" />
                  </span>
                </div>

                {/* Handwritten cursive recipient label on envelope front */}
                <p className="relative z-10 font-cursive text-2xl sm:text-[1.7rem] font-semibold leading-tight text-[#8E304B] group-hover:text-[#752039] transition-colors">
                  {letter.envelopeLabel}
                </p>
                <span className="relative z-10 mt-1 text-xs font-medium tracking-wide text-[#7E5B67]">
                  {letter.envelopeHint}
                </span>
              </div>
            </div>
          </motion.button>
        )}

        {stage === 'surprise' && (
          <motion.div
            key="kitty-surprise"
            role="region"
            aria-label="Hello Kitty surprise"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.72, y: 20 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.92, y: -10 }
            }
            transition={{ duration: 0.42, ease: easeCurve }}
            className="relative w-full max-w-sm"
          >
            {/* Open envelope pocket cradling Hello Kitty */}
            <div className="relative rounded-2xl border border-[#E5C0CC] bg-gradient-to-b from-[#FFFDFD] via-[#FFF8FA] to-[#FDF0F4] p-4 shadow-[0_20px_48px_rgba(166,58,89,0.18)]">
              <LetterCornerPearl className="top-2.5 left-2.5" />
              <LetterCornerPearl className="bottom-2.5 left-2.5" />
              <LetterCornerPearl className="bottom-2.5 right-2.5" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => setStage('closed')}
                aria-label="Close surprise"
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-lg border border-[#E5C0CC] bg-[#FFF9FB] text-[#752039] hover:bg-[#FAF0F3] hover:border-[#C45473] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>

              <div className="relative rounded-xl border border-dashed border-[#E6BDC9] bg-gradient-to-b from-[#FFFBFD] to-[#FFF4F8] px-6 py-7 flex flex-col items-center text-center overflow-visible">
                {/* Floating little hearts around Hello Kitty */}
                <span
                  aria-hidden="true"
                  className="coquette-float absolute top-6 left-8 text-[#E46B90]"
                >
                  <SealHeart className="w-3.5 h-3.5" />
                </span>
                <span
                  aria-hidden="true"
                  className="coquette-float-delayed absolute top-10 right-9 text-[#C85475]"
                >
                  <SealHeart className="w-3 h-3" />
                </span>
                <span
                  aria-hidden="true"
                  className="coquette-float absolute top-20 left-12 text-[#F29CB7]"
                >
                  <SealHeart className="w-2.5 h-2.5" />
                </span>

                {/* Hello Kitty popping up happily */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 28, scale: 0.65, rotate: -6 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, scale: 1, rotate: 0 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.01 }
                      : { type: 'spring', stiffness: 320, damping: 16 }
                  }
                  className="-mt-6 mb-2"
                >
                  <img
                    src={surpriseGifSrc}
                    alt="Pixel kitty writing a love letter"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      if (surpriseGifSrc !== surpriseKittyFallback) {
                        setSurpriseGifSrc(surpriseKittyFallback);
                      }
                    }}
                    className="w-36 h-32 object-contain select-none drop-shadow-[0_6px_14px_rgba(166,58,89,0.18)]"
                  />
                </motion.div>

                <p className="font-cursive text-3xl font-bold text-[#9E3B58] leading-tight">
                  Surprise!
                </p>
                <p className="mt-1.5 text-xs font-medium text-[#6F4856]">
                  Hello Kitty brought a special note for you
                </p>

                <button
                  type="button"
                  onClick={handleRevealLetter}
                  className="mt-5 inline-flex items-center gap-2 py-2.5 px-6 rounded-xl bg-[#B84C6C] hover:bg-[#9E3B58] text-white text-sm font-medium shadow-[0_8px_20px_rgba(166,58,89,0.24)] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
                >
                  <SealHeart className="w-3.5 h-3.5" />
                  <span>Read the letter</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'open' && (
          <motion.div
            key="opened-letter"
            role="region"
            aria-label="Love letter message"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.72, y: 24 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.8, y: 16 }
            }
            transition={{ duration: 0.48, ease: easeCurve }}
            className="relative w-full max-w-lg"
          >
            {/* Hello Kitty peeking & holding both sides of the opened love letter */}
            <div className="pointer-events-none absolute -top-[84px] left-1/2 -translate-x-1/2 z-0">
              <HelloKittyPeekingHead className="w-36 h-[116px]" />
            </div>
            <HelloKittyGripPaw className="absolute top-[42%] -translate-y-1/2 -left-4 z-20 w-11 h-9 rotate-[82deg]" />
            <HelloKittyGripPaw className="absolute top-[42%] -translate-y-1/2 -right-4 z-20 w-11 h-9 -rotate-[82deg]" />

            {/* Subtle open envelope pocket cradling the bottom of the letter */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-3 left-4 right-4 h-20 rounded-b-2xl border border-[#E5C0CC] bg-gradient-to-b from-[#FAF0F4] to-[#F6E2EA] shadow-[0_14px_34px_rgba(166,58,89,0.14)] z-0"
            />

            {/* Scaled-up stationery letter sheet */}
            <div className="relative z-10 rounded-2xl border border-[#E5C0CC] bg-[#FFFDFD] p-4 sm:p-5 shadow-[0_20px_48px_rgba(166,58,89,0.16)]">
              {/* Close button top-right */}
              <button
                type="button"
                onClick={() => setStage('closed')}
                aria-label="Fold love letter"
                className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-lg border border-[#E5C0CC] bg-[#FFF9FB] text-[#752039] hover:bg-[#FAF0F3] hover:border-[#C45473] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>

              {/* Corner pearls */}
              <LetterCornerPearl className="top-2.5 left-2.5" />
              <LetterCornerPearl className="bottom-2.5 left-2.5" />
              <LetterCornerPearl className="bottom-2.5 right-2.5" />

              {/* Stitched stationery border */}
              <div className="rounded-xl border border-dashed border-[#E6BDC9] bg-gradient-to-b from-[#FFFDFD] to-[#FFF7FA] px-6 py-7 sm:px-9 sm:py-8 text-left">
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: prefersReducedMotion ? 0 : 0.14, ease: easeCurve }}
                >
                  <p className="font-cursive text-3xl sm:text-[2rem] font-bold text-[#9E3B58] mb-4">
                    {letter.salutation}
                  </p>

                  <div className="space-y-4">
                    {letter.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="font-cursive text-[1.45rem] sm:text-[1.625rem] font-medium leading-[1.58] text-[#4A2230]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-7 pt-5 border-t border-[#F0D7E0] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <p className="font-cursive text-2xl font-semibold text-[#9E3B58]">
                        {letter.signOff}
                      </p>
                      <p className="font-cursive text-[1.65rem] font-bold text-[#752039] inline-flex items-center gap-2 mt-0.5">
                        <span>{letter.signature}</span>
                        <SealHeart className="w-3.5 h-3.5 text-[#C85475] shrink-0" />
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStage('closed')}
                      className="self-start sm:self-auto py-2 px-4 rounded-lg border border-[#E5C0CC] hover:border-[#C45473] bg-[#FFF9FB] hover:bg-[#FAF0F3] text-[#752039] text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
                    >
                      Fold letter
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
