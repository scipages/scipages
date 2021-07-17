import { contextBridge, ipcRenderer } from 'electron'
import { ElectronData } from '../../src/types/ElectronData'

contextBridge.exposeInMainWorld('myElectronDataAPI', {
  retrieveElectronData (func: (data: ElectronData) => void) {
    void ipcRenderer.invoke('electron-data:retrieve').then((result: ElectronData) => {
      func(result)
    })
  },
  retrieveElectronDataSync (): ElectronData {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ipcRenderer.sendSync('electron-data:retrieve-sync')
  }
})
