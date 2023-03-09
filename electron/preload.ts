import { contextBridge, ipcRenderer } from 'electron';
import { ElectronAPI } from '~~/types';

contextBridge.exposeInMainWorld('electronAPI', {
  fetchLocalHosts: () => ipcRenderer.invoke('fetchLocalHosts'),
  getMyDevice: () => ipcRenderer.invoke('getMyDevice'),
} as ElectronAPI);
