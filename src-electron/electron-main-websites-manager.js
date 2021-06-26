import { ipcMain, dialog, app, BrowserWindow } from 'electron'
import path from 'path'
import fs from 'fs'
import archiver from 'archiver'
import { v4 as uuidv4 } from 'uuid'
import extract from 'extract-zip'

import { electronData } from './electron-main-electron-data'
// import { WebsitePathItem } from '../src/types/WebsitePathItem'
import {
  openConfigurationDB, configurationDB, ConfigurationSimpleRepository
} from '../src/db/repositories/ConfigurationRepository'
import {
  openPagesDB //, PagesDatabaseCollections, pagesDB, PagesRepository,
} from '../src/db/repositories/PagesRepository'
import {
  openCoursesDB //, coursesDB, CoursesRepository, CoursesDatabaseCollections,
} from '../src/db/repositories/CoursesRepository'

function timeDifference (current, previous) {
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = current - previous

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000).toString() + ' seconds ago'
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute).toString() + ' minutes ago'
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour).toString() + ' hours ago'
  } else if (elapsed < msPerMonth) {
    return '~ ' + Math.round(elapsed / msPerDay).toString() + ' days ago'
  } else if (elapsed < msPerYear) {
    return '~ ' + Math.round(elapsed / msPerMonth).toString() + ' months ago'
  } else {
    return '~ ' + Math.round(elapsed / msPerYear).toString() + ' years ago'
  }
}

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
          configurationDB
        )
        const title = repository.getValue('title')

        let latestModifiedTimeDiff = 0
        let latestModifiedTimeDiffStr = ''
        fs.readdirSync(pathTmp).forEach(fileJson => {
          const timeInMilliseconds = fs.lstatSync(path.resolve(electronData.userDataWebsitesPath, file, fileJson)).mtime.getTime()
          const timeDiff = Date.now() - timeInMilliseconds
          const timeDiffStr = timeDifference(Date.now(), timeInMilliseconds)
          if (fileJson !== 'configuration.json' && (latestModifiedTimeDiff === 0 || latestModifiedTimeDiff > timeDiff)) {
            latestModifiedTimeDiff = timeDiff
            latestModifiedTimeDiffStr = timeDiffStr
          }
        })

        paths.push({
          filename: file,
          path: pathTmp,
          title: title,
          uuid: file.substring('website-'.length),
          dateModified: latestModifiedTimeDiffStr
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
  ipcMain.handle('websites-manager-create-website', async (event, title, theme) => {
    return new Promise((resolve, reject) => {
      console.log(title)
      console.log(theme)
      const newUuid = uuidv4()
      const newFilename = 'website-' + newUuid
      const newPath = path.join(electronData.userDataWebsitesPath, newFilename)
      const newWebsite = {
        filename: newFilename,
        path: newPath,
        title: title,
        uuid: newUuid,
        dateModified: timeDifference(Date.now(), Date.now())
      }

      try {
        // Create the website/project directory
        if (!fs.existsSync(newWebsite.path)) {
          fs.mkdirSync(newWebsite.path, { recursive: true })
        }

        openConfigurationDB(newWebsite.path)
        const configurationRepository = new ConfigurationSimpleRepository(
          configurationDB
        )
        configurationRepository.setValue('title', title)
        configurationRepository.setValue('theme', theme)
        openPagesDB(newWebsite.path)
        // const pagesRepository = new PagesRepository(
        //   pagesDB, PagesDatabaseCollections.Pages
        // )
        openCoursesDB(newWebsite.path)
        // const coursesRepository = new CoursesRepository(
        //   coursesDB, CoursesDatabaseCollections.Courses
        // )

        resolve(`Success - Website creation completed: ${title}`)
      } catch (err) {
        reject('Error - Website creation failed')
      }
    })
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
  ipcMain.handle('websites-manager-export-website', async (event, item) => {
    const win = BrowserWindow.getFocusedWindow()
    if (item.path.startsWith(electronData.userDataWebsitesPath) && win !== null) {
      const options = {
        title: "Save file for exported website",
        defaultPath: path.join(app.getPath('documents'), (new Date()).toISOString().replaceAll(':', '.') + ' - ' + item.title),
        buttonLabel: "Save Zip File",
        filters: [
          { name: 'Zip files', extensions: ['zip'] }
          // { name: 'Custom File Type', extensions: ['as'] },
          // { name: 'All Files', extensions: ['*'] }
        ]
      }
      return new Promise((resolve, reject) => {
        dialog.showSaveDialog(win, options).then((result) => {
          if (result.canceled) {
            resolve('Export cancelled')
            return
          } else if (result.filePath === undefined) {
            resolve('Export filePath not set')
            return
          }
          const output = fs.createWriteStream(result.filePath)
          const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
          })
          output.on('close', function () {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            resolve(`Success - Website exported to ${result.filePath}. ${archive.pointer().toString()} total bytes written. ${warnings.join(' - ')}`)
          })
          const warnings = []
          archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
              warnings.push(err.code + ', ' + err.name + ', ' + err.message)
            } else {
              throw err
            }
          })
          archive.on('error', function (err) {
            throw err
          })
          archive.pipe(output)
          archive.directory(item.path, false)
          void archive.finalize()
        }).catch((err) => {
          reject('Error - Website export failed')
        })
      })
    }
  })
  ipcMain.handle('websites-manager-import-website', async (event) => {
    const win = BrowserWindow.getFocusedWindow()
    if (win !== null) {
      const importPath = path.join(electronData.userDataWebsitesPath, 'website-' + uuidv4())
      const options = {
        title: "Select file for website import",
        defaultPath: app.getPath('documents'),
        buttonLabel: "Import Zip File",
        filters: [
          { name: 'Zip files', extensions: ['zip'] }
          // { name: 'Custom File Type', extensions: ['as'] },
          // { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile']
        // properties: ['openFile', 'multiSelections']
      }
      return new Promise((resolve, reject) => {
        dialog.showOpenDialog(win, options).then(async (result) => {
          if (result.canceled) {
            resolve('Import cancelled')
            return
          } else if (result.filePaths === undefined || result.filePaths.length === 0) {
            resolve('Import filePath not set')
            return
          }
          await extract(result.filePaths[0], { dir: importPath })
          resolve(`Success - Website import completed: ${result.filePaths[0]}`)
        }).catch((err) => {
          reject('Error - Website import failed')
        })
      })
    }
  })
}
