import os from 'os';

export interface NetworkInterface {
  name: string;
  address: string;
  netmask: string;
  family: string;
  mac: string;
}

export function getNetworkInterface() {
  const interfaceInfosDic = os.networkInterfaces();

  for (const [name, interfaceInfos] of Object.entries(interfaceInfosDic)) {
    if (!interfaceInfos) continue;

    for (const interfaceInfo of interfaceInfos) {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        return {
          name,
          address: interfaceInfo.address,
          netmask: interfaceInfo.netmask,
          family: interfaceInfo.family,
          mac: interfaceInfo.mac,
        } as NetworkInterface;
      }
    }
  }
}
