import { IEntity } from './interfaces/IEntity'
import { Link } from './common/Link'

export interface Highlight extends IEntity {
  id: string // eg. 'f02ed1fc-a1a3-4a2c-b993-169a1c8989dd'
  date: Date
  content: string // eg. '...'
  links: Array<Link>
  enabled: boolean
  enabledFrontpage: boolean
  dateCreated: Date
  dateUpdated: Date
}
