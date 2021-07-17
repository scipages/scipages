import { packageInfo } from '../../../src-common/packageInfo'
import { getDB } from '../db'
import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { Project } from '../entities/Project'

import lowdb from 'lowdb'

export enum ProjectsDatabaseCollections {
  Projects = 'projects'
}
export interface ProjectsDatabaseSchema {
  version: string;
  projects: Array<Project>;
}

export let projectsDB: lowdb.LowdbSync<ProjectsDatabaseSchema>
const projectsRepositoryFilename = 'projects.json'
const projectsDatabaseDefault = {
  version: packageInfo.version,
  projects: []
}

export function openProjectsDB (websitePath: string) {
  projectsDB = getDB<ProjectsDatabaseSchema>(
    websitePath,
    projectsRepositoryFilename,
    projectsDatabaseDefault
  )
  return projectsDB
}

export class ProjectsRepository extends BaseCollectionRepository<Project, ProjectsDatabaseSchema> {
}

export class ProjectsSimpleRepository extends BaseSimpleRepository<ProjectsDatabaseSchema> {
}
