import { ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'

import { electronData } from './electron-main-electron-data'
// import { ProjectPathItem } from '../src/types/ProjectPathItem'
import {
  openConfigurationDB, ConfigurationDB, ConfigurationSimpleRepository
} from '../src/db/repositories/ConfigurationRepository'
import { openPagesDB } from '../src/db/repositories/PagesRepository'
import { openCoursesDB } from '../src/db/repositories/CoursesRepository'

export default function initMainProjectManagerHandlers () {
  ipcMain.on('project-manager-init-paths-sync', (event) => {
    // Create the projects directory
    if (!fs.existsSync(electronData.userDataProjectsPath)) {
      fs.mkdirSync(electronData.userDataProjectsPath, { recursive: true })
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
  ipcMain.on('project-manager-get-project-path-list-sync', (event) => {
    // const paths: Array<ProjectPathItem> = []
    const paths = []
    fs.readdirSync(electronData.userDataProjectsPath).forEach(file => {
      if (fs.lstatSync(path.resolve(electronData.userDataProjectsPath, file)).isDirectory() && file.startsWith('project-')) {
        const pathTmp = path.join(electronData.userDataProjectsPath, file)

        openConfigurationDB(pathTmp)
        const repository = new ConfigurationSimpleRepository(
          ConfigurationDB
        )
        const title = repository.getValue('title')

        paths.push({
          filename: file,
          path: pathTmp,
          title: title,
          uuid: file.substring('project-'.length)
        })
      }
    })
    event.returnValue = paths
  })
  ipcMain.on('project-manager-open-project-sync', (event, item) => {
    openConfigurationDB(item.path)
    openPagesDB(item.path)
    openCoursesDB(item.path)

    event.returnValue = null
  })
  ipcMain.handle('project-manager-delete-project', async (event, item) => {
    if (item.path.startsWith(electronData.userDataProjectsPath)) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fs.rmdir(item.path, { recursive: true }, (err, result) => {
          if (err) {
            reject('Error - Project path deletion failed')
          } else {
            resolve('Success - Project path deleted')
          }
        })
      })

      // fs.rmdirSync(item.path, { recursive: true })
    }
  })
}
