import { packageInfo } from '../../../src-common/packageInfo'
import { getDB } from '../db'
// import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
// import { Link } from '@scipages/gen/lib/entities/common/Link'

import lowdb from 'lowdb'
import { BasicInfo } from '@scipages/gen/lib/entities/BasicInfo'

export enum BasicInfoDatabaseCollections {
  // ...
}
export interface BasicInfoDatabaseSchema extends BasicInfo{
  version: string;
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
  address: '',
  favicon: {
    rel: '',
    href: '',
    type: ''
  }
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
