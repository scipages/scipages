import { ipcMain } from 'electron'
// import path from 'path'
// import fs from 'fs'

import { v4 as uuidv4 } from 'uuid'

// import { electronData } from '../electron-data'
import { WebsitePathItem } from '../../types/WebsitePathItem'
import { PostRequestResult } from '../../types/PostRequestResult'
import {
  openCoursesDB, coursesDB, CoursesRepository, CoursesDatabaseCollections
} from '../../db/repositories/CoursesRepository'
import { Course } from '../../../src-common/entities/Course'

export default function initContentCoursesHandlers () {
  ipcMain.on('content:courses:list-sync', (
    event,
    website: WebsitePathItem
  ) => {
    // @ts-ignore
    openCoursesDB(website.path)
    const repository = new CoursesRepository(
      coursesDB,
      CoursesDatabaseCollections.Courses
    )
    // const returnValue : GetRequestResult = {
    //   status: true,
    //   message: '',
    //   data: repository.findAll()
    // }
    event.returnValue = repository.findAll()
  })
  ipcMain.handle('content:courses:create', async (
    event,
    website: WebsitePathItem,
    newItem: Course
  ) : Promise<PostRequestResult> => {
    const id = uuidv4()
    newItem.id = id
    newItem.dateCreated = new Date()
    newItem.dateUpdated = new Date()

    const validation = {
      title: newItem.title !== '',
      // role: newItem.role !== '',
      // @ts-ignore
      semester: newItem.semester !== '' && !isNaN(newItem.semester),
      semesterTaught: newItem.semesterTaught !== '',
      organization: newItem.organization !== ''
      // department: newItem.department !== ''
    }
    const validationFailures = {}
    for (const key in validation) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const val = validation[key]
      if (!val) {
        // @ts-ignore
        validationFailures[key] = ['']
      }
    }

    return new Promise((resolve) => {
      const validationFailuresLength = Object.keys(validationFailures).length
      if (validationFailuresLength > 0) {
        resolve({
          status: false,
          message: `Error - Invalid input in ${validationFailuresLength} fields`,
          affectedId: newItem.id,
          validationErrors: validationFailures
        })
        return
      }
      // openCoursesDB(newWebsite.path)
      const repository = new CoursesRepository(
        coursesDB,
        CoursesDatabaseCollections.Courses
      )
      if (!repository.create(newItem)) {
        resolve({
          status: false,
          message: `Error - Course creation failed: ${newItem.title}`,
          affectedId: newItem.id
        })
        return
      }
      resolve({
        status: true,
        message: `Success - Course creation completed: ${newItem.title}`,
        affectedId: newItem.id
      })
    })
  })
  ipcMain.handle('content:courses:update', async (
    event,
    website: WebsitePathItem,
    item: Course
  ) : Promise<string> => {
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
  ipcMain.handle('content:courses:delete', async (
    event,
    website: WebsitePathItem,
    item: Course
  ) : Promise<string> => {
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
