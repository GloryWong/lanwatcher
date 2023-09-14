import { SubnetInfo, calculateSubnetInfo } from './calculateSubnetInfo';
import { NetworkInterface, getNetworkInterface } from './getNetworkInterface';

export interface NetworkInfo extends NetworkInterface {
  subnetInfo: SubnetInfo;
}

export function getNetworkInfo() {
  const nif = getNetworkInterface();
  if (!nif) return;

  const { address, netmask } = nif;
  const subnetInfo = calculateSubnetInfo(address, netmask);

  return {
    ...nif,
    subnetInfo,
  } as NetworkInfo;
}
