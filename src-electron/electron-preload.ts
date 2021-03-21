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
import { ProjectPathItem } from 'src/types/ProjectPathItem'

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

contextBridge.exposeInMainWorld('myProjectManagerAPI', {
  initPathsSync () {
    ipcRenderer.sendSync('project-manager-init-paths-sync')
  },
  getProjectPathListSync (): Array<ProjectPathItem> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ipcRenderer.sendSync('project-manager-get-project-path-list-sync')
  },
  openProjectSync (item: ProjectPathItem) {
    ipcRenderer.sendSync('project-manager-open-project-sync', item)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteProject (item: ProjectPathItem): Promise<any> {
    return ipcRenderer.invoke('project-manager-delete-project', item)
  }
})

contextBridge.exposeInMainWorld('myDatabaseAPI', {
  // getAdapter (projectPath, filename, databaseDefault) {
  //   // const adapter = new FileSync<TSchema>(path.join(projectPath, filename))
  //   // const adapter = new FileSync(path.join(projectPath, filename))
  //   // const db = lowdb(adapter)
  //   // void db.defaults(_.cloneDeep(databaseDefault)).write()
  //   // return db
  //   return new FileSync(path.join(projectPath, filename))
  // }
})
