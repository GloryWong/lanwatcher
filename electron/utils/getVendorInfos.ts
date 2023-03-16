import oui from 'oui';
import Store from 'electron-store';
import { flag } from 'country-emoji';

export interface VendorInfo {
  company: string;
  address: string;
  city: string;
  country: string;
  flag: string;
}

const store = new Store<Record<string, VendorInfo>>({
  name: 'vendor-info',
  clearInvalidConfig: true,
});

const memoryCache = new Map<string, VendorInfo>();
function getVendorInfoFromCache(macAddress: string) {
  let info = memoryCache.get(macAddress);
  if (info) return info;

  info = store.get(macAddress);
  if (info) {
    memoryCache.set(macAddress, info);
  }

  return info;
}

function setVendorInfoToCache(macAddress: string, vendorInfo: VendorInfo) {
  memoryCache.set(macAddress, vendorInfo);
  store.set(macAddress, vendorInfo);
}

function parseVendorString(vendorStr: string | null): VendorInfo | null {
  if (!vendorStr) return null;

  const [company, address, city, country] = vendorStr.split('\n');
  return {
    company,
    address,
    city: country ? city : '-',
    country: country ?? city,
    flag: flag(country ?? city) ?? '',
  };
}

export function getVendorInfos(macAddresses: string): VendorInfo | null;
export function getVendorInfos(macAddresses: string[]): (VendorInfo | null)[];
export function getVendorInfos(macAddresses: string | string[]) {
  const single = typeof macAddresses === 'string';
  const macAddresses$ = single ? [macAddresses] : macAddresses;
  const vendorInfos = macAddresses$.map((v) => {
    const vendorInfo = getVendorInfoFromCache(v);
    if (vendorInfo) return vendorInfo;

    const vendorInfo$ = parseVendorString(oui(v));
    if (vendorInfo$) setVendorInfoToCache(v, vendorInfo$);
    return vendorInfo$;
  });
  return single ? vendorInfos[0] : vendorInfos;
}
