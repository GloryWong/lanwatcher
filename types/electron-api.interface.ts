import { Device } from './device.interface';

export interface ElectronAPI {
  fetchLocalDevices: () => Promise<Device[]>;
}
