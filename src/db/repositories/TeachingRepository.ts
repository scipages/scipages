import { packageInfo } from 'src/helpers/packageInfo'
import { BaseRepository } from './base/BaseRepository'
import { TeachingItem } from 'src/db/entities/TeachingItem'

import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import lowdb from 'lowdb'

export interface TeachingDatabaseSchema {
  version: string;
  teachingItems: Array<TeachingItem>;
}

export const TeachingDataBaseDefault = {
  version: packageInfo.version,
  teachingItems: []
}

// export function TeachingDatabaseFactory (projectPath: string): lowdb.LowdbSync<TeachingDatabaseSchema> {
//   const adapter = new FileSync<TeachingDatabaseSchema>(path.join(projectPath, 'teaching_items.json'))
//   const db: lowdb.LowdbSync<TeachingDatabaseSchema> = lowdb(adapter)
//   void db.defaults(TeachingDataBaseDefault).write()
//   return db
// }
export class TeachingDatabaseSingleton {
  private static instance: Map<string, lowdb.LowdbSync<TeachingDatabaseSchema>>

  // eslint-disable-next-line @typescript-eslint/no-empty-function,no-useless-constructor
  private constructor () {
  }

  public static getInstance (projectPath: string): lowdb.LowdbSync<TeachingDatabaseSchema> {
    if (!TeachingDatabaseSingleton.instance) {
      TeachingDatabaseSingleton.instance = new Map<string, lowdb.LowdbSync<TeachingDatabaseSchema>>()
    }
    if (!TeachingDatabaseSingleton.instance.has(projectPath)) {
      const adapter = new FileSync<TeachingDatabaseSchema>(path.join(projectPath, 'teaching.json'))
      const db: lowdb.LowdbSync<TeachingDatabaseSchema> = lowdb(adapter)
      void db.defaults(TeachingDataBaseDefault).write()
      TeachingDatabaseSingleton.instance.set(projectPath, db)
    }
    // @ts-ignore
    return TeachingDatabaseSingleton.instance.get(projectPath)
  }
}

export class TeachingRepository extends BaseRepository<TeachingItem, TeachingDatabaseSchema> {

}

export default TeachingRepository
