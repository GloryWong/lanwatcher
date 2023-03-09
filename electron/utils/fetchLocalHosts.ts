import { instance } from './instance';

export async function fetchLocalHosts() {
  const hosts = await instance.discover();

  return hosts;
}
