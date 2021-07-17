import { packageInfo } from '../../../src-common/packageInfo'
import { getDB } from '../db'
// import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
// import { Link } from '../../../src-common/entities/common/Link'

import lowdb from 'lowdb'

export enum BasicInfoDatabaseCollections {
  // ...
}
export interface BasicInfoDatabaseSchema {
  version: string;
  title: string;
  subTitle: string;
  bio: string;
  photo: string;
  email: string; // It will be hardcoded into an image
  address: string;
}

export let basicInfoDB: lowdb.LowdbSync<BasicInfoDatabaseSchema>
const basicInfoRepositoryFilename = 'basicInfo.json'
const basicInfoDatabaseDefault = {
  version: packageInfo.version,
  title: '',
  subTitle: '',
  bio: '',
  photo: '',
  email: '',
  address: ''
}

export function openBasicInfoDB (websitePath: string) {
  basicInfoDB = getDB<BasicInfoDatabaseSchema>(
    websitePath,
    basicInfoRepositoryFilename,
    basicInfoDatabaseDefault
  )
  return basicInfoDB
}

// export class BasicInfoRepository extends BaseCollectionRepository<Link, BasicInfoDatabaseSchema> {
// }

export class BasicInfoSimpleRepository extends BaseSimpleRepository<BasicInfoDatabaseSchema> {
}
