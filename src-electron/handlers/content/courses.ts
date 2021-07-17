import { ipcMain } from 'electron'
// import path from 'path'
// import fs from 'fs'

// import { electronData } from '../electron-data'
import { WebsitePathItem } from '../../../src/types/WebsitePathItem'
import {
  openCoursesDB, coursesDB, CoursesRepository, CoursesDatabaseCollections
} from '../../../src/db/repositories/CoursesRepository'
import { Course } from '../../../src/db/entities/Course'

export default function initContentCoursesHandlers () {
  ipcMain.on('content:courses:list-sync', (event, website: WebsitePathItem) => {
    // @ts-ignore
    openCoursesDB(website.path)
    const repository = new CoursesRepository(
      coursesDB,
      CoursesDatabaseCollections.Courses
    )
    event.returnValue = repository.findAll()
  })
  ipcMain.handle('content:courses:create', async (event, newItem: Course) : Promise<string> => {
    return new Promise((resolve, reject) => {
      // openCoursesDB(newWebsite.path)
      const repository = new CoursesRepository(
        coursesDB,
        CoursesDatabaseCollections.Courses
      )
      if (!repository.create(newItem)) {
        reject(`Error - Course creation failed: ${newItem.id}`)
        return
      }
      resolve(`Success - Course creation completed: ${newItem.title}`)
    })
  })
  ipcMain.handle('content:courses:update', async (event, item: Course) : Promise<string> => {
    return new Promise((resolve, reject) => {
      // openCoursesDB(newWebsite.path)
      const repository = new CoursesRepository(
        coursesDB,
        CoursesDatabaseCollections.Courses
      )
      if (!repository.update(item.id, item)) {
        reject(`Error - Course update failed: ${item.id}`)
        return
      }
      resolve(`Success - Course update completed: ${item.title}`)
    })
  })
  ipcMain.handle('content:courses:delete', async (event, item: Course) : Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      // openCoursesDB(newWebsite.path)
      const repository = new CoursesRepository(
        coursesDB,
        CoursesDatabaseCollections.Courses
      )
      if (!repository.delete(item.id)) {
        reject(`Error - Course deletion failed: ${item.id}`)
        return
      }
      resolve(`Success - Course deletion completed: ${item.title}`)
    })
  })
}
