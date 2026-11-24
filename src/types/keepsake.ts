export type DiscordPresenceStatus = 'online' | 'idle' | 'dnd' | 'streaming' | 'offline';

export interface PhotoSlot {
  id: 'pic-1' | 'pic-2';
  discordId?: string;
  src: string;
  fallbackSrc?: string;
  label: string;
  title: string;
  caption: string;
  alt: string;
  discordDisplayName?: string;
  discordUsername?: string;
  discordStatus?: DiscordPresenceStatus;
  discordCustomStatus?: string;
  discordMutuals?: string;
  discordBio?: string;
  discordUrl?: string;
  guildTag?: string;
  activityLabel?: string;
  activePlatforms?: string;
  spotify?: {
    song: string;
    artist: string;
    albumArtUrl?: string;
  } | null;
}

export interface LoveLetterData {
  envelopeLabel: string;
  envelopeHint: string;
  salutation: string;
  paragraphs: string[];
  signOff: string;
  signature: string;
}

export interface CoupleKeepsakeData {
  titleLine1: string;
  titleLine2: string;
  photos: [PhotoSlot, PhotoSlot];
  loveLetter: LoveLetterData;
}
