
export enum AppPanel {
  FARMER = 'FARMER',
  BMC = 'BMC',
  TANKER = 'TANKER',
  FACTORY = 'FACTORY',
  CNDF = 'CNDF',
  BOOTH = 'BOOTH',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  REPORTS = 'REPORTS',
  WEBSITE = 'WEBSITE'
}

export interface ReportConfig {
  type: 'Farmer' | 'Sales' | 'Inventory' | 'Quality';
  dateRange: { start: string; end: string };
  format: 'PDF' | 'Excel' | 'Print';
}

export interface VehicleLog {
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
  temp: number;
  status: 'Normal' | 'Warning' | 'Critical';
}

export interface AIInsight {
  type: 'Prediction' | 'Alert' | 'Advisory';
  message: string;
  confidence: number;
}
