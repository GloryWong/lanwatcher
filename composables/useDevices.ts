import { DeviceInfo } from '~~/electron/utils/scanDevices';

export function useDevices() {
  const scanning = ref(false);
  const devices = ref<DeviceInfo[]>([]);

  const scan = async () => {
    console.log('Start to fetch devices...');
    scanning.value = true;
    devices.value = await window.electronAPI.scanDevices();
    console.log('Fetched', devices.value.length, 'devices');
    scanning.value = false;
  };

  const scanAuto = new Auto(scan);
  const autoScanning = ref(false);
  const startAutoScan = () => {
    scanAuto.start();
    autoScanning.value = true;
  };

  const stopAutoScan = () => {
    scanAuto.stop();
    autoScanning.value = false;
  };

  return {
    devices,
    scan,
    scanning: readonly(scanning),
    startAutoScan,
    stopAutoScan,
    autoScanning: readonly(autoScanning),
  };
}
