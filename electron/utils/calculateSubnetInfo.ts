import * as ip from 'ip';

export interface SubnetInfo extends ip.SubnetInfo {
  firstAddressLong: number;
  lastAddressLong: number;
}

export function calculateSubnetInfo(
  ipAddress: string,
  netmask: string,
): SubnetInfo {
  const subnet = ip.subnet(ipAddress, netmask);
  const { firstAddress, lastAddress } = subnet;

  return {
    ...subnet,
    firstAddressLong: ip.toLong(firstAddress),
    lastAddressLong: ip.toLong(lastAddress),
  };
}
