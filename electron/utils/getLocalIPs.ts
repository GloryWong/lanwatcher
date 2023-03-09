import os from 'os';
import { getSubnetIPsFromCIDR } from './getSubnetIPsFromCIDR';

export function getLocalIPs() {
  const ifaces = os.networkInterfaces();

  let ipAddresses: string[] = [];

  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname]?.forEach((iface) => {
      if (iface.family !== 'IPv4' || iface.internal !== false || !iface.cidr) {
        return;
      }

      ipAddresses = getSubnetIPsFromCIDR(iface.cidr);
    });
  });

  return ipAddresses;
}
