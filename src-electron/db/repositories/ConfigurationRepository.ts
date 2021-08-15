import { packageInfo } from '../../../src-common/packageInfo'
import { getDB } from '../db'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { Configuration, ConfigurationThemeEnum } from '@scipages/gen/lib/entities/Configuration'

import lowdb from 'lowdb'

export enum ConfigurationDatabaseCollections {
}
export interface ConfigurationDatabaseSchema extends Configuration {
  version: string
}

export let configurationDB: lowdb.LowdbSync<ConfigurationDatabaseSchema>
const ConfigurationRepositoryFilename = 'configuration.json'
const ConfigurationDatabaseDefault = {
  version: packageInfo.version,
  title: '',
  theme: ConfigurationThemeEnum.AlFolio,
  customTheme: '',
  urlPrefix: '',
  scssCodeInternal: '',
  scssCodeExternal: ''
}

export function openConfigurationDB (websitePath: string) {
  configurationDB = getDB<ConfigurationDatabaseSchema>(
    websitePath,
    ConfigurationRepositoryFilename,
    ConfigurationDatabaseDefault
  )
  return configurationDB
}

export class ConfigurationSimpleRepository extends BaseSimpleRepository<ConfigurationDatabaseSchema> {
}
