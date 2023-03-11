import { ElectronAPI } from './electron-api.interface';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
