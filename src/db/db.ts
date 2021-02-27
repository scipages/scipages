import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import lowdb, { AdapterSync } from 'lowdb'
import _ from 'lodash'

export function getDB<TSchema> (projectPath: string, filename: string, databaseDefault: TSchema): lowdb.LowdbSync<TSchema> {
  const adapter: AdapterSync<TSchema> = new FileSync<TSchema>(path.join(projectPath, filename))
  const db = lowdb(adapter)
  void db.defaults(_.cloneDeep(databaseDefault)).write()
  return db
}
