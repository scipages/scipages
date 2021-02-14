import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'
import electronData from './electron-data'
import windowStateKeeper from './electron-window-state-keeper'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    fs.unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname
}

let mainWindow

function createWindow () {
  // Get window state
  const mainWindowStateKeeper = windowStateKeeper('main')

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    x: mainWindowStateKeeper.x,
    y: mainWindowStateKeeper.y,
    width: mainWindowStateKeeper.width,
    height: mainWindowStateKeeper.height,
    minWidth: 1000,
    minHeight: 600,
    // show: false,
    // backgroundColor: '#1976d2',
    frame: false,
    titleBarStyle: 'hidden',
    useContentSize: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })

  // Track window state
  mainWindowStateKeeper.track(mainWindow)

  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show()
  //   mainWindow.focus()
  // })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('maximize', (e) => {
    if (mainWindow !== null) {
      mainWindow.webContents.send('window-maximized', {})
    }
  })
  mainWindow.on('unmaximize', (e) => {
    if (mainWindow !== null) {
      mainWindow.webContents.send('window-unmaximized', {})
    }
  })
  // mainWindow.on('minimize', (e) => {
  //   // ..
  // })
  // mainWindow.on('restore', (e) => {
  //   // ..
  // })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.handle('window-controls-channel', function (e, args) {
  if (mainWindow === null) {
    return
  }

  if (args.minimize === true) {
    mainWindow.minimize()
  }
  if (args.maximize === true) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
      return false
    } else {
      mainWindow.maximize()
      return true
    }
  }
  if (args.close === true) {
    // Close DevTools before closing the window:
    // https://github.com/electron/electron/issues/25012
    if (mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.webContents.closeDevTools()
    }
    mainWindow.close()
    // app.quit()
    // app.exit(0)
  }
  if (args.showModal === true) {
    const child = new BrowserWindow({ parent: mainWindow, modal: true, show: false })
    child.setMenu(null)
    child.setMenuBarVisibility(false)
    child.loadURL('https://www.google.com')
    child.once('ready-to-show', () => {
      child.show()
    })
  }
})

ipcMain.handle('get-data-channel', (event, args) => {
  return electronData
})
