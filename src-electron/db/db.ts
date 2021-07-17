import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import lowdb, { AdapterSync } from 'lowdb'
import _ from 'lodash'

// const adapter = new FileSync('db.json')
// const db = new Low(adapter)

export function getDB<TSchema> (websitePath: string, filename: string, databaseDefault: TSchema): lowdb.LowdbSync<TSchema> {
  const adapter: AdapterSync<TSchema> = new FileSync<TSchema>(path.join(websitePath, filename))
  const db = lowdb(adapter)
  void db.defaults(_.cloneDeep(databaseDefault)).write()
  return db
}
