import { app, ipcMain } from 'electron'

import path from 'path'

export const electronData = {
  electronVersion: app.getVersion(),
  userDataPath: app.getPath('userData'),
  userDataProjectsPath: path.join(app.getPath('userData'), 'scipages-projects'),
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
