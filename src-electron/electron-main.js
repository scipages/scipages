import { app, BrowserWindow, nativeTheme } from 'electron'
import fs from 'fs'
import path from 'path'
// import windowStateKeeper from './window-state-keeper.js'
import initMainWindowHandlers from './handlers/main-window'
import initElectronDataHandlers from './handlers/electron-data'
import initWebsitesManagerHandlers from './handlers/websites-manager'
import initContentHandlers from './handlers/content'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    fs.unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

let mainWindow

function createWindow () {
  // Get window state
  // const mainWindowStateKeeper = windowStateKeeper('main')

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    // x: mainWindowStateKeeper.x,
    // y: mainWindowStateKeeper.y,
    // width: mainWindowStateKeeper.width,
    // height: mainWindowStateKeeper.height,
    width: 1000,
    height: 600,
    minWidth: 1000,
    minHeight: 600,
    // show: false,
    // backgroundColor: '#1976d2',
    frame: false,
    titleBarStyle: 'hidden',
    useContentSize: true,
    webPreferences: {
      enableRemoteModule: false,
      nodeIntegration: false,
      // (Electron 12+ has it enabled by default anyway)
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  // Track window state
  // mainWindowStateKeeper.track(mainWindow)

  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show()
  //   mainWindow.focus()
  // })

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('maximize', (e) => {
    if (mainWindow !== null) {
      mainWindow.webContents.send('window-max-unmax', { max: true })
    }
  })
  mainWindow.on('unmaximize', (e) => {
    if (mainWindow !== null) {
      mainWindow.webContents.send('window-max-unmax', { max: false })
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

initMainWindowHandlers()
initElectronDataHandlers()
initWebsitesManagerHandlers()
initContentHandlers()
