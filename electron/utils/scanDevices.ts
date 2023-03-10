import * as ping from 'ping';
import { execPromise } from './execPromise';

export interface DeviceInfo {
  ip: string;
  mac: string;
  hostname: string;
  vendor: string;
  ping: boolean;
}

function parseIpAndMac(line: string) {
  const ipAndMacRegex =
    /((?:[0-9]{1,3}\.){3}[0-9]{1,3}).*?(([0-9a-fA-F]{1,2}:){5}[0-9a-fA-F]{1,2})/;
  const match = ipAndMacRegex.exec(line);
  if (match) {
    const ip = match[1];
    const mac = match[2];
    return {
      ip,
      mac,
    };
  }
}

function paddingMac(mac: string) {
  return mac
    .split(':')
    .reduce((pre, cur) => {
      pre.push(cur.length < 2 ? '0' + cur : cur);
      return pre;
    }, [] as string[])
    .join(':');
}

export async function scanDevices() {
  const deviceInfos: DeviceInfo[] = [];

  // filter out multicast addresses: `224.0.|239.255.`
  // filter out broadcast address: `.255`
  const arpCommand =
    process.platform === 'win32'
      ? 'arp -an | findstr /V "224.0.|239.255.|.255" | findstr /V "incomplete"'
      : 'arp -an | grep -v "224\\.0\\.\\|239\\.255\\.\\|\\.255" | grep -v incomplete';

  const { stdout } = await execPromise(arpCommand);
  const lines = stdout.split('\n');
  lines.forEach((line) => {
    const result = parseIpAndMac(line);
    if (result) {
      const deviceInfo = {
        ip: result.ip,
        mac: paddingMac(result.mac),
        hostname: '',
        vendor: '',
        ping: false,
      };
      deviceInfos.push(deviceInfo);
    }
  });

  const pingPromises = deviceInfos.map(({ ip }) => ping.promise.probe(ip));
  await Promise.allSettled(pingPromises).then((results) => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        deviceInfos[index].ping = result.value.alive;
      }
    });
  });

  // const promises = deviceInfos.map((device) => getVendor(device.ip));
  // await Promise.all(promises);
  return deviceInfos;
}
