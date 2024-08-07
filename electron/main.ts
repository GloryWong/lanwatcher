import path from 'node:path'
import { release } from 'node:os'
import { BrowserWindow, app, ipcMain, nativeTheme, shell } from 'electron'
import { scanDevices } from './utils/scanDevices'
import { ping } from './utils/ping'
import { getNetworkInfo } from './utils/getNetworkInfo'
import { pingRange } from './utils/pingRange'

// Remove electron security warnings only in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/securit
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1'))
  app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32')
  app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Menu.setApplicationMenu(null);

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
// process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
//   ? path.join(process.env.ROOT, 'public')
//   : path.join(process.env.ROOT, '.output/public')
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let win: BrowserWindow | null = null

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (app.isPackaged) {
    win.loadFile(path.join(path.join(process.env.ROOT!, 'public')!, 'index.html'))
  }
  else {
    win.loadURL(process.env.VITE_DEV_SERVER_URL!)
    win.webContents.openDevTools({
      mode: 'undocked',
    })
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:'))
      shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized())
      win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  }
  else {
    createWindow()
  }
})

app.whenReady().then(() => {
  ipcMain.handle('getNetworkInfo', getNetworkInfo)
  ipcMain.handle('scanDevices', scanDevices)
  ipcMain.handle('ping', (evt, ips: string[]) => ping(ips))
  ipcMain.handle('pingRange', (evt, start: number, end: number) =>
    pingRange(start, end))
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    }
    else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })
  createWindow()
})
