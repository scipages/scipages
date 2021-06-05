import { LowSync } from 'lowdb'
import * as _ from 'lodash'

export abstract class BaseSimpleRepository<DBSchema> {
  public readonly db: LowSync<DBSchema>

  constructor (db: LowSync<DBSchema>) {
    this.db = db
    // @ts-ignore
    this.db.chain = _.chain(db.data)
  }

  hasKey (key: string): boolean {
    // return (this.db.data === null) ? false : Object.prototype.hasOwnProperty.call(this.db.data, key)

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return this.db.chain.has(key).value()
  }

  getValue (key: string): boolean | string | number | Date {
    // // @ts-ignore
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    // return (this.db.data === null) ? null : this.db.data[key]

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return this.db.chain.get(key).value()
  }

  setValue (key: string, value: boolean | string | number | Date) {
    // if (this.db.data !== null) {
    //   // @ts-ignore
    //   this.db.data[key] = value
    // }

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    void this.db.chain.set(key, value).write()
  }
}
