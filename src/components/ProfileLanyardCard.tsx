import React from 'react';
import { ExternalLink, Users } from 'lucide-react';
import type { DiscordPresenceStatus, PhotoSlot } from '../types/keepsake';
import { HelloKittySticker, SatinBow } from './RibbonMotif';
import sittingKittyFallback from '../assets/images/sitting_hello_kitty.webp';

const SITTING_KITTY_URL =
  'https://media.discordapp.net/attachments/1572190852573302875/1574689620464246814/JmMC2gAAAAZJREFUAwCbjLJ4vCHaGwAAAABJRU5ErkJggg.png?ex=6b068f7d&is=6b053dfd&hm=d1dc07b7bb795310b6e5cd8560bd18724da1c6963e24447c8c0874400542d66d&format=webp&quality=lossless';

interface ProfileLanyardCardProps {
  photo: PhotoSlot;
  hasImageError: boolean;
  onImageError: () => void;
  onOpenLightbox: () => void;
  tilt?: 'left' | 'right';
}

function FrameCornerPearl({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white via-[#FCEEF3] to-[#D9A7B8] border border-[#E4BBC8] shadow-2xs ${className}`}
    />
  );
}

function PhotoCornerMount({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const posClasses: Record<typeof position, string> = {
    tl: '-top-0.5 -left-0.5',
    tr: '-top-0.5 -right-0.5 rotate-90',
    br: '-bottom-0.5 -right-0.5 rotate-180',
    bl: '-bottom-0.5 -left-0.5 -rotate-90',
  };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 w-5 h-5 drop-shadow-[0_1px_2px_rgba(117,32,57,0.18)] ${posClasses[position]}`}
    >
      <path d="M2 2 L22 2 L2 22 Z" fill="#F4C9D7" stroke="#D58FA6" strokeWidth="1" />
      <path d="M4.5 4.5 L15.5 4.5 L4.5 15.5 Z" fill="none" stroke="#FFF9FB" strokeWidth="0.9" strokeDasharray="1.8 1.4" />
    </svg>
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

function formatDisplayUrl(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return rawUrl;
  }
}

export function ProfileLanyardCard({
  photo,
  hasImageError,
  onImageError,
  onOpenLightbox,
  tilt,
}: ProfileLanyardCardProps) {
  const [useFallback, setUseFallback] = React.useState(false);
  const [sittingSrc, setSittingSrc] = React.useState(SITTING_KITTY_URL);
  const status = photo.discordStatus ?? 'online';
  const displayName = photo.discordDisplayName ?? photo.label;
  const username = photo.discordUsername;

  const activeSrc = useFallback && photo.fallbackSrc ? photo.fallbackSrc : photo.src;

  const handleImgError = () => {
    if (!useFallback && photo.fallbackSrc) {
      setUseFallback(true);
      return;
    }
    onImageError();
  };

  const tiltClass =
    tilt === 'left'
      ? 'sm:-rotate-[1.6deg] hover:rotate-0'
      : tilt === 'right'
        ? 'sm:rotate-[1.6deg] hover:rotate-0'
        : '';

  return (
    <div
      className={`flex flex-col items-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${tiltClass}`}
    >
      {/* Keepsake Polaroid Card */}
      <div className="group relative w-72 sm:w-80 flex flex-col items-center justify-between text-center rounded-2xl border border-[#E5C0CC] hover:border-[#C45473] bg-gradient-to-b from-[#FFFCFD] via-[#FFF9FB] to-[#FDF2F6] p-4 pt-5 pb-5 shadow-[0_18px_40px_rgba(166,58,89,0.14)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_24px_52px_rgba(166,58,89,0.2)]">
        {/* Sitting Hello Kitty perched above the photograph */}
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

        {/* Pearl accents at the 4 frame corners */}
        <FrameCornerPearl className="top-2.5 left-2.5" />
        <FrameCornerPearl className="top-2.5 right-2.5" />
        <FrameCornerPearl className="bottom-2.5 left-2.5" />
        <FrameCornerPearl className="bottom-2.5 right-2.5" />

        {/* Clickable Polaroid Photograph + Handwritten Caption */}
        <button
          type="button"
          onClick={onOpenLightbox}
          aria-label={`View ${photo.label}'s photograph`}
          className="w-full flex flex-col items-center cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
        >
          {/* Polaroid-style glossy mat with vintage satin photo-corner mounts */}
          <div className="relative w-full rounded-xl bg-white p-2.5 pb-3 shadow-[0_8px_22px_rgba(140,40,69,0.1)] ring-1 ring-[#EED0DA] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]">
            {/* Dainty translucent satin tape holding top center of the photo */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-12 h-3.5 -rotate-1 rounded-xs bg-[#F6D3DF]/80 border border-[#E5B6C6]/70 shadow-2xs backdrop-blur-[1px]"
            />

            <div className="relative w-full rounded-lg overflow-visible">
              <PhotoCornerMount position="tl" />
              <PhotoCornerMount position="tr" />
              <PhotoCornerMount position="bl" />
              <PhotoCornerMount position="br" />

              {!hasImageError ? (
                <div className="relative w-full aspect-[11/12] rounded-lg overflow-hidden bg-[#FAF0F3] ring-1 ring-[#F0D7E0]">
                  <img
                    src={activeSrc}
                    alt={photo.alt}
                    referrerPolicy="no-referrer"
                    onError={handleImgError}
                    className="w-full h-full object-cover object-center block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                  {/* Soft warm rose photographic sheen & vignette */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#752039]/15 via-transparent to-white/15 mix-blend-soft-light"
                  />
                  {/* Subtle diagonal glossy highlight on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ) : (
                <div className="w-full aspect-square rounded-lg border border-[#F0D7E0] bg-white flex flex-col items-center justify-center p-4">
                  <SatinBow className="w-12 h-8 mb-2" color="#C45473" />
                  <span className="font-display italic text-base text-[#9E3B58]">
                    {photo.label}
                  </span>
                </div>
              )}

              {/* Cute Hello Kitty corner sticker on each photograph */}
              <HelloKittySticker
                className={`absolute -bottom-3.5 z-20 w-14 h-12 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${
                  tilt === 'right' ? '-left-3.5 -rotate-8' : '-right-3.5 rotate-8'
                }`}
              />
            </div>

            {/* Handwritten cursive Polaroid love note */}
            <p className="mt-2.5 font-cursive text-[1.35rem] leading-snug text-[#9E3B58] group-hover:text-[#752039] transition-colors">
              {photo.title}
            </p>
          </div>

          <div className="mt-3.5 flex items-center justify-center gap-3 w-full">
            <span className="h-px w-7 bg-[#E6C2CD]" aria-hidden="true" />
            <span className="font-display italic text-xl font-bold tracking-wide text-[#9E3B58] group-hover:text-[#752039] transition-colors">
              {photo.label}
            </span>
            <span className="h-px w-7 bg-[#E6C2CD]" aria-hidden="true" />
          </div>
        </button>

        {/* Unboxed Discord Profile Details separated by clean hairline */}
        <div className="mt-3 pt-3 border-t border-[#F0D7E0] w-full text-left flex flex-col gap-2 px-1">
          {/* Discord Name & Status */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <DiscordMark className="w-3.5 h-3.5 text-[#5865F2] shrink-0" />
              <span className="text-xs font-semibold text-[#3B1E28] truncate">
                {displayName}
              </span>
              {username && (
                <span className="font-mono text-[11px] text-[#7A5864] truncate">
                  @{username}
                </span>
              )}
              {photo.guildTag && (
                <span className="font-mono text-[10px] text-[#9E3B58] shrink-0">
                  · {photo.guildTag}
                </span>
              )}
            </div>
            <div className="shrink-0">
              <DiscordStatusBadge status={status} />
            </div>
          </div>

          {/* Unboxed Custom Status Thought Line */}
          {photo.discordCustomStatus && (
            <p className="text-[11px] italic text-[#7A4B5A] pl-5 leading-snug">
              “{photo.discordCustomStatus}”
            </p>
          )}

          {/* Live Spotify or Discord Activity */}
          {photo.spotify ? (
            <p className="text-[11px] text-[#4E2C37] pl-5 leading-snug truncate">
              Listening to <span className="font-medium">{photo.spotify.song}</span> — {photo.spotify.artist}
            </p>
          ) : photo.activityLabel ? (
            <p className="text-[11px] text-[#4E2C37] pl-5 leading-snug truncate">
              {photo.activityLabel}
            </p>
          ) : null}

          {/* Bio */}
          {photo.discordBio && (
            <p className="text-xs leading-relaxed text-[#4E2C37]">
              {photo.discordBio}
            </p>
          )}

          {/* Active Platforms, Mutuals & Profile Link */}
          {(photo.activePlatforms || photo.discordMutuals || photo.discordUrl) && (
            <div className="pt-1.5 border-t border-[#F2DCE4] flex flex-col gap-1">
              {photo.activePlatforms && (
                <div className="text-[11px] text-[#7A5864]">
                  Active on {photo.activePlatforms}
                </div>
              )}
              {photo.discordMutuals && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#7A5864]">
                  <Users className="w-3 h-3 shrink-0 text-[#B86A82]" aria-hidden="true" />
                  <span>{photo.discordMutuals}</span>
                </div>
              )}
              {photo.discordUrl && (
                <a
                  href={photo.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#9E3B58] hover:text-[#752039] underline underline-offset-2 transition-colors w-fit"
                >
                  <span>{formatDisplayUrl(photo.discordUrl)}</span>
                  <ExternalLink className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
