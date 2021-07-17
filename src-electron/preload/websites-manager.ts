import { contextBridge, ipcRenderer } from 'electron'
import { WebsitePathItem } from '../types/WebsitePathItem'

contextBridge.exposeInMainWorld('myWebsitesManagerAPI', {
  initPathsSync () {
    ipcRenderer.sendSync('websites-manager:init-paths-sync')
  },
  getWebsitePathListSync (): Array<WebsitePathItem> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ipcRenderer.sendSync('websites-manager:get-website-path-list-sync')
  },
  openWebsiteSync (item: WebsitePathItem) {
    ipcRenderer.sendSync('websites-manager:open-website-sync', item)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createWebsite (title: string, theme: string): Promise<any> {
    return ipcRenderer.invoke('websites-manager:create-website', title, theme)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteWebsite (item: WebsitePathItem): Promise<any> {
    return ipcRenderer.invoke('websites-manager:delete-website', item)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exportWebsite (item: WebsitePathItem): Promise<any> {
    return ipcRenderer.invoke('websites-manager:export-website', item)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  importWebsite (): Promise<any> {
    return ipcRenderer.invoke('websites-manager:import-website')
  }
})
