export interface CapacityResult {
  data: CapacityData;
  errors: unknown[];
}

export interface CapacityData {
  maxCapacity: number;
  crowdHistory: CrowdHistory[];
}

export interface CrowdHistory {
  weekDay: string;
  hourOfDay: number;
  visits: number;
}
