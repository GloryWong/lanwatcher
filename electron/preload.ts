import { contextBridge, ipcRenderer } from 'electron';
import { ElectronAPI } from '~~/types';

contextBridge.exposeInMainWorld('electronAPI', {
  scanDevices: () => ipcRenderer.invoke('scanDevices'),
  getNetworkInterface: () => ipcRenderer.invoke('getNetworkInterface'),
  // onConnect: (callback) =>
  //   ipcRenderer.on('connect', (event, connection: Connection) => {
  //     callback(connection);
  //   }),
  // onDisconnect: (callback) => ipcRenderer.on('disconnect', callback),
} as ElectronAPI);
