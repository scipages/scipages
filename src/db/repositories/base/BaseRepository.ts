import lowdb from 'lowdb'
// import * as _ from 'lodash'

import { IWrite } from '../interfaces/IWrite'
import { IRead } from '../interfaces/IRead'

export abstract class BaseRepository<T, DBSchema> implements IWrite<T>, IRead<T> {
  public readonly db: lowdb.LowdbSync<DBSchema>
  // public readonly table/collection: _.LoDashExplicitArrayWrapper<T>
  // public readonly table/collection: _.LoDashExplicitWrapper<Array<T>>
  public readonly collectionName: string

  constructor (db: lowdb.LowdbSync<DBSchema>, collectionName: string) {
    this.db = db
    this.collectionName = collectionName
  }

  create (item: T): boolean {
    // @ts-ignore
    const itemExists: T = this.findOne(item.id)
    if (typeof itemExists !== 'undefined') {
      return false
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const newItem: ArrayLike<T> = this.db.get(this.collectionName)
      // @ts-ignore
      .push(item)
      .write()
    return newItem.length > 0
  }

  update (id: string, item: T): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const updatedItem: ArrayLike<T> = this.db.get(this.collectionName)
      // @ts-ignore
      .find({ id: id })
      .assign(item)
      .write()
    return updatedItem.length > 0
  }

  delete (id: string): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const removedItem: ArrayLike<T> = this.db.get(this.collectionName)
      // @ts-ignore
      .remove({ id: id })
      .write()
    return removedItem.length > 0
  }

  findAll (): T[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const items: Array<T> = this.db.get(this.collectionName)
      .value()
    return items
  }

  find (item: T): T[] {
    return []
  }

  findOne (id: string): T {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const item: T = this.db.get(this.collectionName)
      // @ts-ignore
      .find({ id: id })
      .value()
    return item
  }
}
