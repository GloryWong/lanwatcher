import { DarkMode } from './dark-mode.interface';
import { ElectronAPI } from './electron-api.interface';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
    darkMode: DarkMode;
  }
}
