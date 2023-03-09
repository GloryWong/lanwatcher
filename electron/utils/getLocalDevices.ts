import Arpping from 'arpping';

const arpping = new Arpping({
  useCache: false,
});

export async function getLocalDevices() {
  const hosts = await arpping.discover();

  return hosts.map((host) => ({
    ip: host.ip,
    mac: host.mac,
    name: host.name,
    isHostDevice: host.isHostDevice,
  }));
}
