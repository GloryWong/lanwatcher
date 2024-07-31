import type { SubnetInfo } from './calculateSubnetInfo'
import { calculateSubnetInfo } from './calculateSubnetInfo'
import type { NetworkInterface } from './getNetworkInterface'
import { getNetworkInterface } from './getNetworkInterface'

export interface NetworkInfo extends NetworkInterface {
  subnetInfo: SubnetInfo
}

export function getNetworkInfo() {
  const nif = getNetworkInterface()
  if (!nif)
    return

  const { address, netmask } = nif
  const subnetInfo = calculateSubnetInfo(address, netmask)

  return {
    ...nif,
    subnetInfo,
  } as NetworkInfo
}
