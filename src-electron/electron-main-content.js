import { ipcMain } from 'electron'
// import path from 'path'
// import fs from 'fs'

// import { electronData } from './electron-main-electron-data'
// import { WebsitePathItem } from '../src/types/WebsitePathItem'
// import {
//   openConfigurationDB, configurationDB, ConfigurationSimpleRepository
// } from '../src/db/repositories/ConfigurationRepository'
// import {
//   openPagesDB, pagesDB, PagesRepository, PagesDatabaseCollections
// } from '../src/db/repositories/PagesRepository'
import {
  openCoursesDB, coursesDB, CoursesRepository, CoursesDatabaseCollections
} from '../src/db/repositories/CoursesRepository'

export default function initMainContentHandlers () {
  ipcMain.on('content-get-courses-list-sync', (event, website) => {
    openCoursesDB(website.path)
    const repository = new CoursesRepository(
      coursesDB,
      CoursesDatabaseCollections.Courses
    )
    event.returnValue = repository.findAll()
  })
}
