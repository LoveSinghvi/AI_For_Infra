export type TabType = 'citizen-voice' | 'demand-heatmap' | 'ai-prioritizer' | 'public-impact';

export interface HotspotData {
  id: string;
  code: string;
  title: string;
  sector: string;
  state: string;
  severity: number;
  badge: string;
  notes: string;
  pop: string;
  gap: string;
  budgetCap: number;
  dashArray: string;
  coords: { x: number; y: number };
  keywords: string[];
  audioFile: string;
  audioDuration: string;
  audioDialect: string;
  audioTranscript: string;
  image: string;
}

export interface Proposal {
  id: string;
  rank: number;
  rankBadge: string;
  title: string;
  category: string;
  location: string;
  aiScore: number;
  image: string;
  imageAlt: string;
  gisLayer: string;
  corpusVersion: string;
  grievanceCount: string;
  grievanceDuration: string;
  impactBeneficiaries: string;
  schemeAlignment: string;
  estCost: number; // in Cr
  roiMultiplier: number;
  netEconomicValue: number; // in Cr
  tenderDays: number;
  sanctioned: boolean;
  block?: string;
  governanceStatus?: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  sampleTranscript?: string;
  sampleTranslation?: string;
  dialect?: string;
}
