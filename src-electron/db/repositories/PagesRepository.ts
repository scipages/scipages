import { packageInfo } from '../../../src-common/packageInfo'
import { getDB } from '../db'
import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { Page } from '@scipages/gen/lib/entities/Page'

import lowdb from 'lowdb'

export enum PagesDatabaseCollections {
  Pages = 'pages'
}
export interface PagesDatabaseSchema {
  version: string;
  pages: Array<Page>;
}

export let pagesDB: lowdb.LowdbSync<PagesDatabaseSchema>
const pagesRepositoryFilename = 'pages.json'
const pagesDatabaseDefault = {
  version: packageInfo.version,
  pages: []
}

export function openPagesDB (websitePath: string) {
  pagesDB = getDB<PagesDatabaseSchema>(
    websitePath,
    pagesRepositoryFilename,
    pagesDatabaseDefault
  )
  return pagesDB
}

export class PagesRepository extends BaseCollectionRepository<Page, PagesDatabaseSchema> {
}

export class PagesSimpleRepository extends BaseSimpleRepository<PagesDatabaseSchema> {
}
