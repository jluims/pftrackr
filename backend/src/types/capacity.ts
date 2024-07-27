export interface CapacityResult {
  data: CapacityData;
  errors: PFErrorResponse[];
}

export interface PFErrorResponse {
  code: string;
  message: string;
  correlationId: string;
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
