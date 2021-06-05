import { packageInfo } from '../../helpers/packageInfo'
import { getDB } from '../db'
import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { Page } from '../entities/Page'

import { LowSync } from 'lowdb'

export enum PagesDatabaseCollections {
  Pages = 'pages'
}
export interface PagesDatabaseSchema {
  version: string;
  pages: Array<Page>;
}

export let pagesDB: LowSync<PagesDatabaseSchema>
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
