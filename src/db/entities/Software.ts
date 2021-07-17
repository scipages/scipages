import { IEntity } from './interfaces/IEntity'
import { Link } from './common/Link'

export interface Software extends IEntity {
  id: string // eg. 'f02ed1fc-a1a3-4a2c-b993-169a1c8989dd'
  title: string // eg. 'Vue.js'
  shortDescription: string // eg. 'A JavaScript framework.'
  longDescription: string // eg. 'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web...'
  links: Array<Link>
  enabled: boolean
  enabledFrontpage: boolean
  dateCreated: Date
  dateUpdated: Date
}
