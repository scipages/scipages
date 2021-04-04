/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is
 * specified in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   const { contextBridge } = require('electron')
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */

// const { app, BrowserWindow, contextBridge, ipcRenderer } = require('electron')
// import { BrowserWindow, contextBridge, ipcRenderer } from 'electron'
// import path from 'path'
// import fs from 'fs'

import { contextBridge, ipcRenderer } from 'electron'
// import { contextBridge, remote, ipcRenderer, shell } from 'electron'
// const { app, BrowserWindow } = remote

import { ElectronData } from 'src/types/ElectronData'
import { WindowMaxUnmaxParam } from 'src/types/WindowMaxUnmaxParam'
import { WebsitePathItem } from 'src/types/WebsitePathItem'

let isWindowMaxUnmaxListenerSet = false

contextBridge.exposeInMainWorld('myWindowAPI', {
  receiveMaxUnmax (func: (data: WindowMaxUnmaxParam) => void) {
    if (isWindowMaxUnmaxListenerSet) {
      return
    }
    ipcRenderer.on('window-max-unmax', (event, ...args) => {
      // @ts-ignore
      func(...args)
    })
    isWindowMaxUnmaxListenerSet = true
  },
  minimize () {
    void ipcRenderer.invoke('window-minimize')
  },
  toggleMaximize () {
    void ipcRenderer.invoke('window-toggleMaximize')
  },
  close () {
    void ipcRenderer.invoke('window-close')
  },
  appRelaunch () {
    void ipcRenderer.invoke('window-app-relaunch')
  },
  showModal (url: string) {
    void ipcRenderer.invoke('window-show-modal', url)
  },
  openURL (url: string) {
    void ipcRenderer.invoke('window-open-url', url)
  },
  getCurrentURLSync (): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ipcRenderer.sendSync('window-get-current-url-sync')
  }
})

contextBridge.exposeInMainWorld('myElectronDataAPI', {
  retrieveElectronData (func: (data: ElectronData) => void) {
    void ipcRenderer.invoke('electron-data-retrieve').then((result: ElectronData) => {
      func(result)
    })
  },
  retrieveElectronDataSync (): ElectronData {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ipcRenderer.sendSync('electron-data-retrieve-sync')
  }
})

contextBridge.exposeInMainWorld('myWebsitesManagerAPI', {
  initPathsSync () {
    ipcRenderer.sendSync('websites-manager-init-paths-sync')
  },
  getWebsitePathListSync (): Array<WebsitePathItem> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ipcRenderer.sendSync('websites-manager-get-website-path-list-sync')
  },
  openWebsiteSync (item: WebsitePathItem) {
    ipcRenderer.sendSync('websites-manager-open-website-sync', item)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteWebsite (item: WebsitePathItem): Promise<any> {
    return ipcRenderer.invoke('websites-manager-delete-website', item)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exportWebsite (item: WebsitePathItem): Promise<any> {
    return ipcRenderer.invoke('websites-manager-export-website', item)
  }
})

contextBridge.exposeInMainWorld('myDatabaseAPI', {
  // getAdapter (websitePath, filename, databaseDefault) {
  //   // const adapter = new FileSync<TSchema>(path.join(websitePath, filename))
  //   // const adapter = new FileSync(path.join(websitePath, filename))
  //   // const db = lowdb(adapter)
  //   // void db.defaults(_.cloneDeep(databaseDefault)).write()
  //   // return db
  //   return new FileSync(path.join(websitePath, filename))
  // }
})
