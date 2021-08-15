import { packageInfo } from '../../../src-common/packageInfo'
import { getDB } from '../db'
import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { Highlight } from '@scipages/gen/lib/entities/Highlight'

import lowdb from 'lowdb'

export enum HighlightsDatabaseCollections {
  Highlights = 'highlights'
}
export interface HighlightsDatabaseSchema {
  version: string;
  highlights: Array<Highlight>;
}

export let highlightsDB: lowdb.LowdbSync<HighlightsDatabaseSchema>
const highlightsRepositoryFilename = 'highlights.json'
const highlightsDatabaseDefault = {
  version: packageInfo.version,
  highlights: []
}

export function openHighlightsDB (websitePath: string) {
  highlightsDB = getDB<HighlightsDatabaseSchema>(
    websitePath,
    highlightsRepositoryFilename,
    highlightsDatabaseDefault
  )
  return highlightsDB
}

export class HighlightsRepository extends BaseCollectionRepository<Highlight, HighlightsDatabaseSchema> {
}

export class HighlightsSimpleRepository extends BaseSimpleRepository<HighlightsDatabaseSchema> {
}
