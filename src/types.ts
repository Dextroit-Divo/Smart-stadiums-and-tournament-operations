export type Tab = 'home' | 'live-feed' | 'map' | 'seat-finder';

export interface Match {
  id: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  status: 'live' | 'upcoming' | 'completed';
  time?: string;
  stage?: string;
}

export interface PlayerStats {
  name: string;
  kills: number;
  accuracy: number;
  avatarUrl: string;
  team: string;
}

export interface CommentaryMessage {
  id: string;
  timestamp: string;
  message: string;
  highlight?: string;
}

export interface MapZone {
  id: string;
  name: string;
  occupancy: number;
  capacity: number;
  status: string;
  description: string;
  imgUrl: string;
  amenities: Array<{
    name: string;
    type: 'food' | 'restroom' | 'security' | 'info';
    distance: string;
    waitTime: string;
  }>;
}

export interface SectionCapacity {
  id: string;
  name: string;
  current: number;
  total: number;
  status: 'normal' | 'full' | 'low';
}
