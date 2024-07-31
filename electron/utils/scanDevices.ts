import { execPromise } from './execPromise'
import type { VendorInfo } from './getVendorInfos'
import { getVendorInfos } from './getVendorInfos'
import { ping } from './ping'

export interface DeviceInfo {
  ip: string
  mac: string
  vendorInfo: VendorInfo | null
  ping: boolean
}

function parseIpAndMac(line: string) {
  // eslint-disable-next-line regexp/no-misleading-capturing-group, regexp/no-unused-capturing-group, regexp/use-ignore-case -- need to optimize
  const ipAndMacRegex = /((?:\d{1,3}\.){3}\d{1,3}).*?(([0-9a-fA-F]{1,2}:){5}[0-9a-fA-F]{1,2})/
  const match = ipAndMacRegex.exec(line)
  if (match) {
    const ip = match[1]
    const mac = match[2]
    return {
      ip,
      mac,
    }
  }
}

function paddingMac(mac: string) {
  return mac
    .split(':')
    .reduce((pre, cur) => {
      pre.push(cur.length < 2 ? `0${cur}` : cur)
      return pre
    }, [] as string[])
    .join(':')
}

export async function scanDevices() {
  const deviceInfos: DeviceInfo[] = []

  // filter out multicast addresses: `224.0.|239.255.`
  // filter out broadcast address: `.255`
  const arpCommand
    = process.platform === 'win32'
      ? 'arp -an | findstr /V "224.0.|239.255.|.255" | findstr /V "incomplete"'
      : 'arp -an | grep -v "224\\.0\\.\\|239\\.255\\.\\|\\.255" | grep -v incomplete'

  const { stdout } = await execPromise(arpCommand)
  const lines = stdout.split('\n')
  lines.forEach((line) => {
    const result = parseIpAndMac(line)
    if (result) {
      const mac = paddingMac(result.mac)
      deviceInfos.push({
        ip: result.ip,
        mac,
        vendorInfo: getVendorInfos(mac),
        ping: false,
      })
    }
  })

  const pingResponses = await ping(deviceInfos.map(v => v.ip))
  pingResponses.forEach((pr) => {
    const deviceInfo = deviceInfos.find(di => di.ip === pr.host)
    if (deviceInfo) {
      deviceInfo.ping = pr.alive
    }
  })

  return deviceInfos
}
