export type ScreenType = 'historia' | 'batalha' | 'alianca' | 'destino' | 'menu';

export interface PartyMember {
  id: string;
  name: string;
  role: string;
  hp: number;
  maxHp: number;
  gemState: string;
  gemTurbidity: number; // 0 to 100
  isAlert?: boolean;
}

export interface DossierRecord {
  id: string;
  docCode: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  imageUrl: string;
  description: string;
  classifiedText: string;
  analysis: string;
}

export interface SaveSlotData {
  slot: number;
  date: string;
  playerName: string;
  currentScreen: ScreenType;
  collectiveTurbidity: number;
  aoiTurbidity: number;
  enemyHp: number;
  bondRen: number;
  bondAoi: number;
  chosenRoute?: string | null;
}
