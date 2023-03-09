export function getSubnetIPsFromCIDR(cidr: string) {
  const [ipAddress, maskBits] = cidr.split('/');

  const mask = parseInt(maskBits);
  const shift = 32 - mask;

  const ipAsNum = ipAddress
    .split('.')
    .reduce((result, value) => (result << 8) + parseInt(value, 10), 0);

  const firstAddress = ((ipAsNum >> shift) << shift) + 1;
  const lastAddress = (firstAddress | ((1 << shift) - 1)) - 1;

  const ipAddresses = [];
  for (let i = firstAddress; i <= lastAddress; i++) {
    const octets = [
      (i >>> 24) & 0xff,
      (i >>> 16) & 0xff,
      (i >>> 8) & 0xff,
      i & 0xff,
    ];
    ipAddresses.push(octets.join('.'));
  }

  return ipAddresses;
}
