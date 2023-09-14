import * as ip from 'ip';
import { SetOptional } from 'type-fest';

export interface SubnetInfo extends Omit<ip.SubnetInfo, 'contains'> {
  firstAddressLong: number;
  lastAddressLong: number;
}

export function calculateSubnetInfo(
  ipAddress: string,
  netmask: string,
): SubnetInfo {
  const subnet = ip.subnet(ipAddress, netmask);
  const { firstAddress, lastAddress } = subnet;
  delete (subnet as SetOptional<ip.SubnetInfo, 'contains'>).contains;

  return {
    ...subnet,
    firstAddressLong: ip.toLong(firstAddress),
    lastAddressLong: ip.toLong(lastAddress),
  };
}
