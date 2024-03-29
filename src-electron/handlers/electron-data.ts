import { app, ipcMain } from 'electron'

import path from 'path'
import { ElectronData } from '../../src-common/types/ElectronData'

export const electronData: ElectronData = {
  // @ts-ignore
  debugging: process.env.DEBUGGING,
  electronVersion: process.versions.electron,
  userDataPath: app.getPath('userData'),
  userDataWebsitesPath: path.join(app.getPath('userData'), 'scipages-websites'),
  userDataConfigurationPath: path.join(app.getPath('userData'), 'scipages-configuration')
}

export default function initElectronDataHandlers () {
  ipcMain.handle('electron-data:retrieve', (): ElectronData => {
    return electronData
  })
  ipcMain.on('electron-data:retrieve-sync', (event) => {
    event.returnValue = electronData
  })
}
