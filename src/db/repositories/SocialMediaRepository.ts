import { packageInfo } from '../../helpers/packageInfo'
import { getDB } from '../db'
import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { Link } from '../entities/common/Link'

import lowdb from 'lowdb'

export enum SocialMediaDatabaseCollections {
  SocialMedia = 'socialMedia'
}
export interface SocialMediaDatabaseSchema {
  version: string;
  socialMedia: Array<Link>;
}

export let socialMediaDB: lowdb.LowdbSync<SocialMediaDatabaseSchema>
const socialMediaRepositoryFilename = 'socialMedia.json'
const socialMediaDatabaseDefault = {
  version: packageInfo.version,
  socialMedia: []
}

export function openSocialMediaDB (websitePath: string) {
  socialMediaDB = getDB<SocialMediaDatabaseSchema>(
    websitePath,
    socialMediaRepositoryFilename,
    socialMediaDatabaseDefault
  )
  return socialMediaDB
}

export class SocialMediaRepository extends BaseCollectionRepository<Link, SocialMediaDatabaseSchema> {
}

export class SocialMediaSimpleRepository extends BaseSimpleRepository<SocialMediaDatabaseSchema> {
}
