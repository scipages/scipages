import { IEntity } from './../interfaces/IEntity'

export interface Link extends IEntity {
  id: string // eg. 'f02ed1fc-a1a3-4a2c-b993-169a1c8989dd'
  title: string
  icon: string
  url: string
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}
