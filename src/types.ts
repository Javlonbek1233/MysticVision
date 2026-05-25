export interface TarotCard {
  id: string;
  name: string;
  number: number;
  arcana: 'Major' | 'Minor';
  keywords: string[];
  description: string;
  uprightMeaning: string;
  reversedMeaning: string;
  iconName: string; // Used for drawing custom vector/symbolic card elements
}

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  dateRange: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  rulingPlanet: string;
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  strengths: string[];
  weaknesses: string[];
  compatibility: string[];
  luckyStone: string;
  colorHex: string;
  description: string;
  spiritualLesson: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isTarotSpread?: boolean;
  drawnCards?: { card: TarotCard; isReversed: boolean; position: string }[];
}

export interface DailyHoroscope {
  sign: string;
  date: string;
  overall: string;
  love: string;
  career: string;
  wellness: string;
  cosmicAdvice: string;
  energyLevel: number; // 0-100
  luckyNumber: number;
  luckyColor: string;
  spiritualRitual: string;
}
