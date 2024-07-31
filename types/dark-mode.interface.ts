export interface DarkMode {
  toggle: () => Promise<boolean>
  system: () => Promise<boolean>
}
