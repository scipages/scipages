import { packageInfo } from '../../../src-common/packageInfo'
import { getDB } from '../db'
import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { Publication } from '@scipages/gen/lib/entities/Publication'

import lowdb from 'lowdb'

export enum PublicationsDatabaseCollections {
  Publications = 'publications'
}
export interface PublicationsDatabaseSchema {
  version: string;
  publications: Array<Publication>;
}

export let publicationsDB: lowdb.LowdbSync<PublicationsDatabaseSchema>
const publicationsRepositoryFilename = 'publications.json'
const publicationsDatabaseDefault = {
  version: packageInfo.version,
  publications: []
}

export function openPublicationsDB (websitePath: string) {
  publicationsDB = getDB<PublicationsDatabaseSchema>(
    websitePath,
    publicationsRepositoryFilename,
    publicationsDatabaseDefault
  )
  return publicationsDB
}

export class PublicationsRepository extends BaseCollectionRepository<Publication, PublicationsDatabaseSchema> {
}

export class PublicationsSimpleRepository extends BaseSimpleRepository<PublicationsDatabaseSchema> {
}
