import { contextBridge, ipcRenderer } from 'electron';
import { DarkMode, ElectronAPI } from '~~/types';

contextBridge.exposeInMainWorld('electronAPI', {
  scanDevices: () => ipcRenderer.invoke('scanDevices'),
  getNetworkInfo: () => ipcRenderer.invoke('getNetworkInfo'),
  ping: (ips: string[]) => ipcRenderer.invoke('ping', ips),
  pingRange: (start: number, end: number) =>
    ipcRenderer.invoke('pingRange', start, end),
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
