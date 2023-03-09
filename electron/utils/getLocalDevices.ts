import { getDeviceByIp } from './getDeviceByIp';
import { getLocalIPs } from './getLocalIPs';
import { Device } from '~~/types';

export function getLocalDevices() {
  const ips = getLocalIPs();

  return Promise.allSettled(ips.map((ip) => getDeviceByIp(ip))).then(
    (results) => {
      const results$: Device[] = [];
      results.forEach((result) => {
        if (result.status === 'rejected' || !result.value) return;
        results$.push(result.value);
      });
      return results$;
    },
  );
}
