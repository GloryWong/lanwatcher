import { PingResponse } from 'ping';
import { NetworkInterface } from '~~/electron/utils/getNetworkInterface';
import { DeviceInfo } from '~~/electron/utils/scanDevices';

export interface ElectronAPI {
  scanDevices: () => Promise<DeviceInfo[]>;
  getNetworkInterface: () => Promise<NetworkInterface | undefined>;
  ping: (ips: string[]) => Promise<PingResponse[]>;
}
