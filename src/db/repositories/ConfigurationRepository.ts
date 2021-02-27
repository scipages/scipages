import { packageInfo } from '../../helpers/packageInfo'
import { getDB } from '../db'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'

import lowdb from 'lowdb'

export enum ConfigurationThemeEnum {
  AlFolio = 'AL_FOLIO',
  MonoResearcher = 'MONO_RESEARCHER'
}

export enum ConfigurationDatabaseCollections {
}
export interface ConfigurationDatabaseSchema {
  version: string;
  title: string;
  theme: string;
}

export let ConfigurationDB: lowdb.LowdbSync<ConfigurationDatabaseSchema>
const ConfigurationRepositoryFilename = 'configuration.json'
const ConfigurationDatabaseDefault = {
  version: packageInfo.version,
  title: '',
  theme: ConfigurationThemeEnum.AlFolio
}

export function openConfigurationDB (projectPath: string) {
  ConfigurationDB = getDB<ConfigurationDatabaseSchema>(
    projectPath,
    ConfigurationRepositoryFilename,
    ConfigurationDatabaseDefault
  )
  return ConfigurationDB
}

export class ConfigurationSimpleRepository extends BaseSimpleRepository<ConfigurationDatabaseSchema> {
}
