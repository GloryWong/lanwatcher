import * as ping from 'ping';
import { Device } from '~~/types';

export async function getDeviceByIp(ip: string) {
  const rsp = await ping.promise.probe(ip);

  if (!rsp.alive) return;

  return {
    ip: rsp.host,
  } as Device;
}
