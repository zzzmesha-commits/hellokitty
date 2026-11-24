import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VIDEO_ID = 'uxWOTxYvorE';
const START_SECONDS = 135; // 2:15
const PLAYER_VOLUME = 22;
const SONG_TITLE = 'Paraluman — Adie';

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void;
  unMute: () => void;
  getPlayerState: () => number;
  getCurrentTime: () => number;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    element: HTMLElement | string,
    options: {
      videoId: string;
      width?: number | string;
      height?: number | string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: { target: YTPlayerInstance }) => void;
        onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
        onError?: () => void;
      };
    }
  ) => YTPlayerInstance;
  PlayerState?: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeIframeApi(): Promise<YTNamespace> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window unavailable'));
  }
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }
  if (ytApiPromise) {
    return ytApiPromise;
  }

  ytApiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      if (window.YT?.Player) {
        resolve(window.YT);
      } else {
        reject(new Error('YouTube IFrame API failed to initialize'));
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => reject(new Error('Failed to load YouTube IFrame API'));
      document.head.appendChild(script);
    }
  });

  return ytApiPromise;
}

export function BackgroundMusic() {
  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const isReadyRef = useRef(false);
  const userMutedRef = useRef(false);
  const userInteractedRef = useRef(false);
  const startedFromSkipRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const startPlayback = () => {
      const player = playerRef.current;
      if (!player || !isReadyRef.current || userMutedRef.current) return;

      try {
        player.unMute();
        player.setVolume(PLAYER_VOLUME);
        if (!startedFromSkipRef.current) {
          player.seekTo(START_SECONDS, true);
          startedFromSkipRef.current = true;
        }
        player.playVideo();
      } catch {
        // Ignore playback errors before user activation
      }
    };

    const removeUnlockListeners = () => {
      window.removeEventListener('click', handleFirstInteraction, true);
      window.removeEventListener('keydown', handleFirstInteraction, true);
      window.removeEventListener('touchend', handleFirstInteraction, true);
    };

    function handleFirstInteraction(event: Event) {
      const target = event.target as Node | null;
      if (target && toggleButtonRef.current?.contains(target)) {
        return;
      }
      userInteractedRef.current = true;
      if (isReadyRef.current && !userMutedRef.current) {
        startPlayback();
        removeUnlockListeners();
      }
    }

    window.addEventListener('click', handleFirstInteraction, true);
    window.addEventListener('keydown', handleFirstInteraction, true);
    window.addEventListener('touchend', handleFirstInteraction, true);

    void loadYouTubeIframeApi()
      .then((YT) => {
        if (cancelled || !playerHostRef.current) return;

        playerRef.current = new YT.Player(playerHostRef.current, {
          videoId: VIDEO_ID,
          width: 200,
          height: 200,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            start: START_SECONDS,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return;
              isReadyRef.current = true;
              event.target.setVolume(PLAYER_VOLUME);

              if (!userMutedRef.current) {
                event.target.seekTo(START_SECONDS, true);
                startedFromSkipRef.current = true;
                event.target.playVideo();
                if (userInteractedRef.current) {
                  removeUnlockListeners();
                }
              }
            },
            onStateChange: (event) => {
              if (cancelled) return;
              const playingState = YT.PlayerState?.PLAYING ?? 1;
              const pausedState = YT.PlayerState?.PAUSED ?? 2;
              const endedState = YT.PlayerState?.ENDED ?? 0;

              if (event.data === playingState) {
                setIsPlaying(true);
              } else if (event.data === pausedState) {
                setIsPlaying(false);
              } else if (event.data === endedState) {
                if (!userMutedRef.current) {
                  event.target.seekTo(START_SECONDS, true);
                  event.target.playVideo();
                } else {
                  setIsPlaying(false);
                }
              }
            },
            onError: () => {
              if (!cancelled) {
                setIsPlaying(false);
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          setIsPlaying(false);
        }
      });

    return () => {
      cancelled = true;
      removeUnlockListeners();
      isReadyRef.current = false;
      try {
        playerRef.current?.destroy();
      } catch {
        // Ignore cleanup errors
      }
      playerRef.current = null;
    };
  }, []);

  const toggleAudio = () => {
    const player = playerRef.current;
    if (!player || !isReadyRef.current) return;

    if (isPlaying) {
      userMutedRef.current = true;
      try {
        player.pauseVideo();
      } catch {
        // Ignore pause errors
      }
      setIsPlaying(false);
    } else {
      userMutedRef.current = false;
      try {
        player.unMute();
        player.setVolume(PLAYER_VOLUME);
        if (!startedFromSkipRef.current || player.getCurrentTime() < START_SECONDS) {
          player.seekTo(START_SECONDS, true);
          startedFromSkipRef.current = true;
        }
        player.playVideo();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      {/* Hidden YouTube player container */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-[9999px] -top-[9999px] w-px h-px opacity-0 overflow-hidden"
      >
        <div ref={playerHostRef} />
      </div>

      <button
        ref={toggleButtonRef}
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? `Mute ${SONG_TITLE}` : `Play ${SONG_TITLE}`}
        title={isPlaying ? `Mute ${SONG_TITLE} (2:15)` : `Play ${SONG_TITLE} (2:15)`}
        className="fixed bottom-4 right-4 z-30 w-9 h-9 rounded-full border border-[#E5C0CC] hover:border-[#C45473] bg-[#FFF9FB]/90 backdrop-blur-xs text-[#9E3B58] hover:text-[#752039] shadow-[0_6px_18px_rgba(166,58,89,0.12)] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4" aria-hidden="true" />
        ) : (
          <VolumeX className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
