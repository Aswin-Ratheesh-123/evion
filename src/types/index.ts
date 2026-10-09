export interface MilestoneItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  progressPercent: number; // 0 to 100
  powerKw?: number;
  batterySocTarget?: number;
  image?: string;
  layout: 'text-left' | 'image-left' | 'full-width' | 'dark-digital' | 'energy-flow' | 'branching' | 'destination-hub';
  badge: string;
  stats?: { label: string; value: string }[];
}

export interface VehicleModel {
  id: string;
  name: string;
  tagline: string;
  colorName: string;
  primaryColor: string;
  accentGlow: string;
  glassColor: string;
  batteryCapacityKwh: number;
  maxChargeRateKw: number;
  rangeKm: number;
  acceleration: string;
}

export interface JourneyTelemetry {
  progress: number;
  speedKmh: number;
  batterySoc: number;
  activeMilestoneIndex: number;
  currentMilestone: MilestoneItem | null;
  isCharging: boolean;
}

export interface StationNode {
  id: string;
  name: string;
  subTitle: string;
  location: string;
  type: string;
  powerKw: number;
  voltageV: number;
  progressPercent: number;
  sectionIndex: number;
  description: string;
  metrics: {
    chargeTimeMin: number;
    availability: string;
    solarBuffering: string;
  };
}

export interface EVComparisonModel {
  id: string;
  name: string;
  batteryKwh: number;
  maxKw: number;
  effWhKm: number;
}
