import type { DarkMode } from './dark-mode.interface'
import type { ElectronAPI } from './electron-api.interface'

declare global {
  interface Window {
    electronAPI: ElectronAPI
    darkMode: DarkMode
  }
}
