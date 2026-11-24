import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Music, Users } from 'lucide-react';
import type { DiscordPresenceStatus, PhotoSlot } from '../types/keepsake';
import { HelloKittySticker, SatinBow } from './RibbonMotif';
import sittingKittyFallback from '../assets/images/sitting_hello_kitty.webp';

const SITTING_KITTY_URL =
  'https://media.discordapp.net/attachments/1572190852573302875/1574689620464246814/JmMC2gAAAAZJREFUAwCbjLJ4vCHaGwAAAABJRU5ErkJggg.png?ex=6b068f7d&is=6b053dfd&hm=d1dc07b7bb795310b6e5cd8560bd18724da1c6963e24447c8c0874400542d66d&format=webp&quality=lossless';

interface DiscordProfilesPageProps {
  profiles: [PhotoSlot, PhotoSlot];
  onOpenLightbox: (id: PhotoSlot['id']) => void;
}

function TinyHeart({ className = 'w-2.5 h-2.5' }: { className?: string }) {
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

function DiscordMark({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function DiscordStatusBadge({ status }: { status: DiscordPresenceStatus }) {
  if (status === 'idle') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800">
        <svg viewBox="0 0 16 16" className="w-3 h-3 text-amber-500 shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M10.8 11.4A5.5 5.5 0 0 1 6.2 2.3a6 6 0 1 0 7.5 7.5 5.4 5.4 0 0 1-2.9 1.6Z" />
        </svg>
        <span>Idle</span>
      </span>
    );
  }

  if (status === 'streaming') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-purple-800">
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-purple-600 text-white shrink-0" aria-hidden="true">
          <svg viewBox="0 0 12 12" className="w-2 h-2 ml-0.5" fill="currentColor">
            <path d="M3 2.2v7.6l6.5-3.8L3 2.2z" />
          </svg>
        </span>
        <span>Streaming</span>
      </span>
    );
  }

  const fallbackMeta: Record<
    Exclude<DiscordPresenceStatus, 'idle' | 'streaming'>,
    { label: string; dotClass: string; textClass: string }
  > = {
    online: { label: 'Online', dotClass: 'bg-emerald-500', textClass: 'text-emerald-800' },
    dnd: { label: 'Do Not Disturb', dotClass: 'bg-rose-600', textClass: 'text-rose-800' },
    offline: { label: 'Offline', dotClass: 'bg-stone-400', textClass: 'text-stone-600' },
  };

  const meta = fallbackMeta[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${meta.textClass}`}>
      <span aria-hidden="true" className={`w-2 h-2 rounded-full ${meta.dotClass}`} />
      <span>{meta.label}</span>
    </span>
  );
}

export function DiscordProfilesPage({
  profiles,
  onOpenLightbox,
}: DiscordProfilesPageProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [sittingSrc, setSittingSrc] = useState(SITTING_KITTY_URL);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col items-center"
    >
      {/* Header */}
      <div className="relative flex flex-col items-center text-center select-none">
        <SatinBow className="w-16 h-10 mb-1" color="#C45473" />
        <h1
          className="font-display font-black tracking-[-0.02em] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-[#CE5B7C] via-[#A63A59] to-[#752039]"
          style={{ fontSize: 'clamp(2.6rem, 6.5vw, 4.4rem)' }}
        >
          <span className="block">discord</span>
          <span className="block">profiles</span>
        </h1>
        <p className="mt-3 font-cursive text-2xl text-[#9E3B58]">
          vanish &amp; chi
        </p>

        <span
          aria-hidden="true"
          className="coquette-float absolute -left-8 bottom-8 text-[#C85475]"
        >
          <TinyHeart className="w-2.5 h-2.5" />
        </span>
        <span
          aria-hidden="true"
          className="coquette-float-delayed absolute -right-7 top-14 text-[#C85475]"
        >
          <TinyHeart className="w-2 h-2" />
        </span>
      </div>

      {/* 2 Side-by-Side Live Lanyard Discord Profile Cards */}
      <section
        aria-label="Live Discord profiles"
        className="relative mt-20 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 gap-24 sm:gap-12 items-start"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none hidden sm:flex items-center justify-center absolute top-40 left-1/2 -translate-x-1/2 z-20"
        >
          <span className="w-6 border-t border-dashed border-[#D68CA3]" />
          <span className="mx-1 w-6 h-6 rounded-full bg-[#FFF9FB] border border-[#E5C0CC] shadow-xs flex items-center justify-center text-[#5865F2]">
            <DiscordMark className="w-3 h-3" />
          </span>
          <span className="w-6 border-t border-dashed border-[#D68CA3]" />
        </div>

        {profiles.map((profile, index) => {
          const tiltClass =
            index === 0
              ? 'sm:-rotate-[1.4deg] hover:rotate-0'
              : 'sm:rotate-[1.4deg] hover:rotate-0';
          const hasErr = Boolean(imageErrors[profile.id]);
          const status = profile.discordStatus ?? 'offline';
          const displayName = profile.discordDisplayName ?? profile.label;

          return (
            <div
              key={profile.id}
              className={`flex flex-col items-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${tiltClass}`}
            >
              <div className="group relative w-72 sm:w-80 flex flex-col items-center justify-between text-center rounded-2xl border border-[#E5C0CC] hover:border-[#C45473] bg-gradient-to-b from-[#FFFCFD] via-[#FFF9FB] to-[#FDF2F6] p-4 pt-5 pb-5 shadow-[0_18px_40px_rgba(117,32,57,0.2)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_24px_52px_rgba(117,32,57,0.26)]">
                <img
                  src={sittingSrc}
                  alt="Hello Kitty sitting on a cloud"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (sittingSrc !== sittingKittyFallback) {
                      setSittingSrc(sittingKittyFallback);
                    }
                  }}
                  className="pointer-events-none select-none absolute -top-20 left-1/2 -translate-x-1/2 z-30 w-28 h-28 object-contain drop-shadow-[0_6px_12px_rgba(117,32,57,0.2)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
                />
                <FrameCornerPearl className="top-2.5 left-2.5" />
                <FrameCornerPearl className="top-2.5 right-2.5" />
                <FrameCornerPearl className="bottom-2.5 left-2.5" />
                <FrameCornerPearl className="bottom-2.5 right-2.5" />

                <button
                  type="button"
                  onClick={() => onOpenLightbox(profile.id)}
                  aria-label={`Zoom ${profile.label}'s Discord profile avatar`}
                  className="w-full flex flex-col items-center cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
                >
                  <div className="relative w-full rounded-xl bg-white p-2.5 pb-3 shadow-[0_8px_22px_rgba(140,40,69,0.1)] ring-1 ring-[#EED0DA] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-12 h-3.5 -rotate-1 rounded-xs bg-[#F6D3DF]/80 border border-[#E5B6C6]/70 shadow-2xs backdrop-blur-[1px]"
                    />

                    <div className="relative w-full">
                      {!hasErr ? (
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#1E1F22] ring-1 ring-[#F0D7E0]">
                          <img
                            src={profile.src}
                            alt={profile.alt}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setImageErrors((prev) => ({ ...prev, [profile.id]: true }))
                            }
                            className="w-full h-full object-cover block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-square rounded-lg border border-[#F0D7E0] bg-white flex flex-col items-center justify-center p-4">
                          <SatinBow className="w-12 h-8 mb-2" color="#C45473" />
                          <span className="font-display italic text-base text-[#9E3B58]">
                            {profile.label}
                          </span>
                        </div>
                      )}

                      <HelloKittySticker
                        className={`absolute -bottom-3.5 z-20 w-14 h-12 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${
                          index === 1 ? '-left-3.5 -rotate-8' : '-right-3.5 rotate-8'
                        }`}
                      />
                    </div>

                    <p className="mt-2.5 font-cursive text-[1.35rem] leading-snug text-[#9E3B58] group-hover:text-[#752039] transition-colors">
                      {profile.label}&apos;s discord
                    </p>
                  </div>
                </button>

                {/* Live Lanyard profile metadata */}
                <div className="mt-3.5 pt-3 border-t border-[#F0D7E0] w-full text-left flex flex-col gap-2 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <DiscordMark className="w-3.5 h-3.5 text-[#5865F2] shrink-0" />
                      <span className="text-xs font-semibold text-[#3B1E28] truncate">
                        {displayName}
                      </span>
                      {profile.discordUsername && (
                        <span className="font-mono text-[11px] text-[#7A5864] truncate">
                          @{profile.discordUsername}
                        </span>
                      )}
                      {profile.guildTag && (
                        <span className="font-mono text-[10px] text-[#9E3B58] shrink-0">
                          · {profile.guildTag}
                        </span>
                      )}
                    </div>
                    <div className="shrink-0">
                      <DiscordStatusBadge status={status} />
                    </div>
                  </div>

                  {profile.discordCustomStatus && (
                    <p className="text-[11px] italic text-[#7A4B5A] pl-5 leading-snug">
                      &ldquo;{profile.discordCustomStatus}&rdquo;
                    </p>
                  )}

                  {profile.spotify ? (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#4E2C37] pl-5">
                      <Music className="w-3 h-3 shrink-0 text-[#1DB954]" aria-hidden="true" />
                      <span className="truncate">
                        {profile.spotify.song} — {profile.spotify.artist}
                      </span>
                    </div>
                  ) : profile.activityLabel ? (
                    <p className="text-[11px] text-[#4E2C37] pl-5 truncate">
                      {profile.activityLabel}
                    </p>
                  ) : null}

                  <div className="pt-1.5 border-t border-[#F2DCE4] flex flex-col gap-1">
                    {profile.discordId && (
                      <div className="flex items-center gap-1.5 text-[11px] font-mono tabular-nums text-[#7A5864]">
                        <Users className="w-3 h-3 shrink-0 text-[#B86A82]" aria-hidden="true" />
                        <span>ID {profile.discordId}</span>
                      </div>
                    )}
                    {profile.activePlatforms && (
                      <p className="text-[11px] text-[#7A5864]">
                        Active on {profile.activePlatforms}
                      </p>
                    )}
                    {profile.discordUrl && (
                      <a
                        href={profile.discordUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[#9E3B58] hover:text-[#752039] underline underline-offset-2 transition-colors w-fit"
                      >
                        <span>Open Discord Profile</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </motion.div>
  );
}
