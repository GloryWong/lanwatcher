import { Device } from './device.interface';
import { Host } from './host.interface';

export interface ElectronAPI {
  fetchLocalHosts: () => Promise<Host[]>;
  getMyDevice: () => Promise<Device>;
}
