export enum ActivePlatform {
  NETFLIX = 'Netflix',
  DISNEY = 'Disney+',
  PRIME_VIDEO = 'Prime Video'
}

export enum SidebarTab {
  DASHBOARD = 'Dashboard',
  LIBRARY = 'Library',
  GROWTH = 'Growth',
  DEMOGRAPHICS = 'Demographics',
  REPORTS = 'Reports'
}

export interface MetricCardData {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtext?: string;
  progress?: number;
  color?: string;
}

export interface RegionData {
  id: string;
  name: string;
  flagCode: string;
  marketShare: number;
  growthIndex: number;
  status: 'DOMINANT' | 'EXPANDING' | 'STABLE';
  trend: 'up' | 'stable' | 'down';
}
