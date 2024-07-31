import type { ping } from '~/electron/utils/ping'
import type { NetworkInfo } from '~/electron/utils/getNetworkInfo'
import type { pingRange } from '~/electron/utils/pingRange'
import type { DeviceInfo } from '~~/electron/utils/scanDevices'

export interface ElectronAPI {
  scanDevices: () => Promise<DeviceInfo[]>
  getNetworkInfo: () => Promise<NetworkInfo | undefined>
  ping: typeof ping
  pingRange: typeof pingRange
}
