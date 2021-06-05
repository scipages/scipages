import { LowSync, JSONFileSync, SyncAdapter } from 'lowdb'
// import FileSync from 'lowdb/adapters/FileSync'
// import lowdb, { AdapterSync } from 'lowdb'
import path from 'path'
import _ from 'lodash'

// const adapter = new FileSync('db.json')
// const db = new Low(adapter)

export function getDB<TSchema> (websitePath: string, filename: string, databaseDefault: TSchema): LowSync<TSchema> {
  const adapter: SyncAdapter<TSchema> = new JSONFileSync<TSchema>(path.join(websitePath, filename))
  const db = new LowSync<TSchema>(adapter)
  db.data ||= _.cloneDeep(databaseDefault)
  db.write()
  // const adapter: AdapterSync<TSchema> = new FileSync<TSchema>(path.join(websitePath, filename))
  // const db = lowdb(adapter)
  // void db.defaults(_.cloneDeep(databaseDefault)).write()
  return db
}
