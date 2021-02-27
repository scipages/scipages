import { app, BrowserWindow, ipcMain, shell } from 'electron'

export default function initMainWindowHandlers () {
  // ipcMain.handle('window-minimize', (e, args) => {
  ipcMain.handle('window-minimize', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win === null) {
      return
    }
    win.minimize()
  })
  // ipcMain.handle('window-toggleMaximize', (e, args) => {
  ipcMain.handle('window-toggleMaximize', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win === null) {
      return
    }
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })
  // ipcMain.handle('window-close', (e, args) => {
  ipcMain.handle('window-close', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win === null) {
      return
    }
    // Close DevTools before closing the window:
    // https://github.com/electron/electron/issues/25012
    if (win.webContents.isDevToolsOpened()) {
      win.webContents.closeDevTools()
    }
    win.close()
    // app.quit()
    // app.exit(0)
  })
  // ipcMain.handle('window-app-relaunch', (e, args) => {
  ipcMain.handle('window-app-relaunch', () => {
    app.relaunch()
    app.exit()
  })
  // ipcMain.handle('window-show-modal', (e, args) => {
  ipcMain.handle('window-show-modal', (e, url) => {
    const win = BrowserWindow.getFocusedWindow()
    if (win === null) {
      return
    }
    const child = new BrowserWindow({ parent: win, modal: true, show: false })
    child.setMenu(null)
    child.setMenuBarVisibility(false)
    void child.loadURL(url)
    child.once('ready-to-show', () => {
      child.show()
    })
  })
  // ipcMain.handle('window-open-url', (e, args) => {
  ipcMain.handle('window-open-url', (e, url) => {
    void shell.openExternal(url)
  })
}
