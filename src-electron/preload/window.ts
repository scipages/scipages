import { contextBridge, ipcRenderer } from 'electron'
import { WindowMaxUnmaxParam } from '../../src-common/types/WindowMaxUnmaxParam'

let isWindowMaxUnmaxListenerSet = false

contextBridge.exposeInMainWorld('myWindowAPI', {
  receiveMaxUnmax (func: (data: WindowMaxUnmaxParam) => void) {
    if (isWindowMaxUnmaxListenerSet) {
      return
    }
    ipcRenderer.on('window:max-unmax', (event, ...args) => {
      // @ts-ignore
      func(...args)
    })
    isWindowMaxUnmaxListenerSet = true
  },
  minimize () {
    void ipcRenderer.invoke('window:minimize')
  },
  toggleMaximize () {
    void ipcRenderer.invoke('window:toggleMaximize')
  },
  close () {
    void ipcRenderer.invoke('window:close')
  },
  appRelaunch () {
    void ipcRenderer.invoke('window:app-relaunch')
  },
  showModal (url: string) {
    void ipcRenderer.invoke('window:show-modal', url)
  },
  openURL (url: string) {
    void ipcRenderer.invoke('window:open-url', url)
  },
  getCurrentURLSync (): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ipcRenderer.sendSync('window:get-current-url-sync')
  }
})
