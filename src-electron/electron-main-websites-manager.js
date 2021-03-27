import { ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'

import { electronData } from './electron-main-electron-data'
// import { WebsitePathItem } from '../src/types/WebsitePathItem'
import {
  openConfigurationDB, ConfigurationDB, ConfigurationSimpleRepository
} from '../src/db/repositories/ConfigurationRepository'
import { openPagesDB } from '../src/db/repositories/PagesRepository'
import { openCoursesDB } from '../src/db/repositories/CoursesRepository'

export default function initMainWebsitesManagerHandlers () {
  ipcMain.on('websites-manager-init-paths-sync', (event) => {
    // Create the websites directory
    if (!fs.existsSync(electronData.userDataWebsitesPath)) {
      fs.mkdirSync(electronData.userDataWebsitesPath, { recursive: true })
    }
    // Create the configuration directory
    if (!fs.existsSync(electronData.userDataConfigurationPath)) {
      fs.mkdirSync(electronData.userDataConfigurationPath, { recursive: true })
    }
    // event.returnValue should always be set for synchronous message,
    // even when nothing if actually returned, otherwise the renderer process
    // will be blocked.
    event.returnValue = null
  })
  ipcMain.on('websites-manager-get-website-path-list-sync', (event) => {
    // const paths: Array<WebsitePathItem> = []
    const paths = []
    fs.readdirSync(electronData.userDataWebsitesPath).forEach(file => {
      if (fs.lstatSync(path.resolve(electronData.userDataWebsitesPath, file)).isDirectory() && file.startsWith('website-')) {
        const pathTmp = path.join(electronData.userDataWebsitesPath, file)

        openConfigurationDB(pathTmp)
        const repository = new ConfigurationSimpleRepository(
          ConfigurationDB
        )
        const title = repository.getValue('title')

        paths.push({
          filename: file,
          path: pathTmp,
          title: title,
          uuid: file.substring('website-'.length)
        })
      }
    })
    event.returnValue = paths
  })
  ipcMain.on('websites-manager-open-website-sync', (event, item) => {
    openConfigurationDB(item.path)
    openPagesDB(item.path)
    openCoursesDB(item.path)

    event.returnValue = null
  })
  ipcMain.handle('websites-manager-delete-website', async (event, item) => {
    if (item.path.startsWith(electronData.userDataWebsitesPath)) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fs.rmdir(item.path, { recursive: true }, (err, result) => {
          if (err) {
            reject('Error - Website path deletion failed')
          } else {
            resolve('Success - Website path deleted')
          }
        })
      })

      // fs.rmdirSync(item.path, { recursive: true })
    }
  })
}
