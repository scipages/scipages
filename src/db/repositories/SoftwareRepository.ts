import { packageInfo } from '../../../src-common/packageInfo'
import { getDB } from '../db'
import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { Software } from '../entities/Software'

import lowdb from 'lowdb'

export enum SoftwareDatabaseCollections {
  Software = 'software'
}
export interface SoftwareDatabaseSchema {
  version: string;
  software: Array<Software>;
}

export let softwareDB: lowdb.LowdbSync<SoftwareDatabaseSchema>
const softwareRepositoryFilename = 'software.json'
const softwareDatabaseDefault = {
  version: packageInfo.version,
  software: []
}

export function openSoftwareDB (websitePath: string) {
  softwareDB = getDB<SoftwareDatabaseSchema>(
    websitePath,
    softwareRepositoryFilename,
    softwareDatabaseDefault
  )
  return softwareDB
}

export class SoftwareRepository extends BaseCollectionRepository<Software, SoftwareDatabaseSchema> {
}

export class SoftwareSimpleRepository extends BaseSimpleRepository<SoftwareDatabaseSchema> {
}
