import { packageInfo } from '../../../src-common/packageInfo'
import { getDB } from '../db'
import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { Person } from '../../../src-common/entities/Person'

import lowdb from 'lowdb'

export enum PersonsDatabaseCollections {
  Persons = 'persons'
}
export interface PersonsDatabaseSchema {
  version: string;
  persons: Array<Person>;
}

export let personsDB: lowdb.LowdbSync<PersonsDatabaseSchema>
const personsRepositoryFilename = 'persons.json'
const personsDatabaseDefault = {
  version: packageInfo.version,
  persons: []
}

export function openPersonsDB (websitePath: string) {
  personsDB = getDB<PersonsDatabaseSchema>(
    websitePath,
    personsRepositoryFilename,
    personsDatabaseDefault
  )
  return personsDB
}

export class PersonsRepository extends BaseCollectionRepository<Person, PersonsDatabaseSchema> {
}

export class PersonsSimpleRepository extends BaseSimpleRepository<PersonsDatabaseSchema> {
}
