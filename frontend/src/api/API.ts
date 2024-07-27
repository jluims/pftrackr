import { BACKEND_URL } from "../config";
import { CapacityData } from "../types/capacity";
import { Club } from "../types/gyms";

class API {
  private static makeRequest(endpoint: string, options?: RequestInit) {
    if (!endpoint.startsWith("/")) {
      throw new Error("Endpoint must start with /");
    }

    return fetch(BACKEND_URL + endpoint, options);
  }

  static async getGyms(zipCode: string): Promise<Club[]> {
    const res = await this.makeRequest(`/api/gyms/${zipCode}`);

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error);
    }

    const { gyms } = json;

    return gyms;
  }

  static async getCapacityInfo(gymId: string): Promise<CapacityData> {
    const res = await this.makeRequest(`/api/capacity/${gymId}`);
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error);
    }

    return json.capacities;
  }
}

export { API };
