import { contextBridge, ipcRenderer } from 'electron';
import { ElectronAPI } from '~~/types';

contextBridge.exposeInMainWorld('electronAPI', {
  fetchLocalDevices: () => ipcRenderer.invoke('getLocalDevices'),
} as ElectronAPI);
