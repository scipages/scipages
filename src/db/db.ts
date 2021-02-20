import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import lowdb from 'lowdb'
import _ from 'lodash'

export function getDB<TSchema> (projectPath: string, filename: string, databaseDefault: TSchema) {
  const adapter = new FileSync<TSchema>(path.join(projectPath, filename))
  const db = lowdb(adapter)
  void db.defaults(_.cloneDeep(databaseDefault)).write()
  return db
}
