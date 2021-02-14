import lowdb from 'lowdb'
// import * as _ from 'lodash'

export abstract class BaseSimpleRepository<DBSchema> {
  public readonly db: lowdb.LowdbSync<DBSchema>

  constructor (db: lowdb.LowdbSync<DBSchema>) {
    this.db = db
  }

  hasKey (key: string): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.db.has(key).value()
  }

  getValue (key: string): boolean | string | number | Date {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.db.get(key).value()
  }

  setValue (key: string, value: boolean | string | number | Date) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    void this.db.set(key, value).write()
  }
}
