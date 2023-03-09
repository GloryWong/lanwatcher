import { NetworkInfo } from '~/electron/utils/getNetworkInfo';
import { ping } from '~/electron/utils/ping';
import { pingRange } from '~/electron/utils/pingRange';
import { DeviceInfo } from '~~/electron/utils/scanDevices';

export interface ElectronAPI {
  scanDevices: () => Promise<DeviceInfo[]>;
  getNetworkInfo: () => Promise<NetworkInfo | undefined>;
  ping: typeof ping;
  pingRange: typeof pingRange;
}
