import { packageInfo } from '../../../src-common/packageInfo'
import { getDB } from '../db'
import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { Course } from '@scipages/gen/lib/entities/Course'

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

export function openCoursesDB (websitePath: string) {
  coursesDB = getDB<CoursesDatabaseSchema>(
    websitePath,
    coursesRepositoryFilename,
    coursesDatabaseDefault
  )
  return coursesDB
}

export class CoursesRepository extends BaseCollectionRepository<Course, CoursesDatabaseSchema> {
}

export class CoursesSimpleRepository extends BaseSimpleRepository<CoursesDatabaseSchema> {
}
