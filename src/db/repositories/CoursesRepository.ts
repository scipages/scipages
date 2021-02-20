import { packageInfo } from 'src/helpers/packageInfo'
import { getDB } from 'src/db/db'
import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { Course } from 'src/db/entities/Course'

import lowdb from 'lowdb'

export enum CoursesDatabaseCollections {
  Courses = 'courses'
}
export interface CoursesDatabaseSchema {
  version: string;
  courses: Array<Course>;
}

export let coursesDB: lowdb.LowdbSync<CoursesDatabaseSchema>
const coursesRepositoryFilename = 'courses.json'
const coursesDatabaseDefault = {
  version: packageInfo.version,
  courses: []
}

export function openCoursesDB (projectPath: string) {
  coursesDB = getDB<CoursesDatabaseSchema>(
    projectPath,
    coursesRepositoryFilename,
    coursesDatabaseDefault
  )
  return coursesDB
}

export class CoursesRepository extends BaseCollectionRepository<Course, CoursesDatabaseSchema> {
}

export class CoursesSimpleRepository extends BaseSimpleRepository<CoursesDatabaseSchema> {
}
