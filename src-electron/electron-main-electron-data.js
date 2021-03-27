import { app, ipcMain } from 'electron'

import path from 'path'

export const electronData = {
  debugging: process.env.DEBUGGING,
  electronVersion: app.getVersion(),
  userDataPath: app.getPath('userData'),
  userDataWebsitesPath: path.join(app.getPath('userData'), 'scipages-websites'),
  userDataConfigurationPath: path.join(app.getPath('userData'), 'scipages-configuration')
}

export default function initMainElectronDataHandlers () {
  ipcMain.handle('electron-data-retrieve', () => {
    return electronData
  })
  ipcMain.on('electron-data-retrieve-sync', (event) => {
    event.returnValue = electronData
  })
}
