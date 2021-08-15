import { packageInfo } from '../../../src-common/packageInfo'
import { getDB } from '../db'
import { BaseCollectionRepository } from './base/BaseCollectionRepository'
import { BaseSimpleRepository } from './base/BaseSimpleRepository'
import { MenuItem } from '@scipages/gen/lib/entities/MenuItem'

import lowdb from 'lowdb'

export enum MenuItemsDatabaseCollections {
  MenuItems = 'menuItems'
}
export interface MenuItemsDatabaseSchema {
  version: string;
  menuItems: Array<MenuItem>;
}

export let menuItemsDB: lowdb.LowdbSync<MenuItemsDatabaseSchema>
const menuItemsRepositoryFilename = 'menuItems.json'
const menuItemsDatabaseDefault = {
  version: packageInfo.version,
  menuItems: []
}

export function openMenuItemsDB (websitePath: string) {
  menuItemsDB = getDB<MenuItemsDatabaseSchema>(
    websitePath,
    menuItemsRepositoryFilename,
    menuItemsDatabaseDefault
  )
  return menuItemsDB
}

export class MenuItemsRepository extends BaseCollectionRepository<MenuItem, MenuItemsDatabaseSchema> {
}

export class MenuItemsSimpleRepository extends BaseSimpleRepository<MenuItemsDatabaseSchema> {
}
