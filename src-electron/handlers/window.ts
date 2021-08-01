import { app, BrowserWindow, ipcMain, shell, dialog, clipboard } from 'electron'
import os from 'os'

import packageInfo from '../../src-common/packageInfo'

export default function initWindowHandlers () {
  // ipcMain.handle('window:minimize', (e, args) => {
  ipcMain.handle('window:minimize', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win === null) {
      return
    }
    win.minimize()
  })
  // ipcMain.handle('window:toggleMaximize', (e, args) => {
  ipcMain.handle('window:toggleMaximize', () => {
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
  // ipcMain.handle('window:close', (e, args) => {
  ipcMain.handle('window:close', () => {
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
  // ipcMain.handle('window:app-relaunch', (e, args) => {
  ipcMain.handle('window:app-relaunch', () => {
    app.relaunch()
    app.exit()
  })
  // ipcMain.handle('window:open-url', (e, args) => {
  ipcMain.handle('window:open-url', (e, url: string) => {
    void shell.openExternal(url)
  })
  ipcMain.on('window:get-current-url-sync', (event) => {
    const win = BrowserWindow.getFocusedWindow()
    if (win === null) {
      return ''
    }
    event.returnValue = win.webContents.getURL()
  })
  // ipcMain.handle('window:show-modal', (e, args) => {
  ipcMain.handle('window:show-modal', (e, url: string) => {
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
  ipcMain.handle('window:show-about-dialog', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win === null) {
      return
    }
    const detail = `Version: ${packageInfo.version}\n` +
      `Electron: ${process.versions.electron}\n` +
      `Chrome: ${process.versions.chrome}\n` +
      `Node.js: ${process.version}\n` +
      `V8: ${process.versions.v8}\n` +
      `OS: ${os.type()} ${os.arch()} ${os.release()}`
      // `OS: ${os.type()} - ${os.platform()} - ${os.arch()} - ${os.release()} - ${os.version()}`

    const buttons = ['OK', 'Copy']

    dialog.showMessageBox(
      win,
      {
        title: packageInfo.productName,
        type: 'info',
        message: packageInfo.productName,
        detail: detail,
        buttons: buttons,
        noLink: true,
        defaultId: buttons.indexOf('OK'),
        cancelId: buttons.indexOf('OK')
      }
    )
      .then(result => {
        if (buttons[result.response] === 'Ok') {
          console.log('Ok button clicked.')
        } else if (buttons[result.response] === 'Copy') {
          clipboard.writeText(detail)
          console.log('Copied to clipboard.')
        }
      })
      .catch(() => {
        console.log('Action failed on window:show-about-dialog')
      })
  })
}
