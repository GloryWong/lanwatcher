export interface Device {
  ip: string;
  mac: string;
  name?: string;
  vendor?: string;
  isHostDevice?: boolean;
}
