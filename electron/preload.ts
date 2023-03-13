import { contextBridge, ipcRenderer } from 'electron';
import { DarkMode, ElectronAPI } from '~~/types';

contextBridge.exposeInMainWorld('electronAPI', {
  scanDevices: () => ipcRenderer.invoke('scanDevices'),
  getNetworkInterface: () => ipcRenderer.invoke('getNetworkInterface'),
  ping: (ips: string[]) => ipcRenderer.invoke('ping', ips),
  // onConnect: (callback) =>
  //   ipcRenderer.on('connect', (event, connection: Connection) => {
  //     callback(connection);
  //   }),
  // onDisconnect: (callback) => ipcRenderer.on('disconnect', callback),
} as ElectronAPI);

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
} as DarkMode);
