import { IEntity } from './interfaces/IEntity'
import { Link } from './common/Link'

export interface Person extends IEntity {
  id: string // eg. 'f02ed1fc-a1a3-4a2c-b993-169a1c8989dd'
  fullName: string // eg. 'Dr. John Doe'
  role: string // eg. 'Research Associate'
  description: string // (free text) eg. 'Tel: +30 1234 56789...', 'Research Interests:...'
  bio: string // eg. 'Dr. John Doe is a research associate in the Department of...'
  links: Array<Link>
  enabled: boolean
  enabledFrontpage: boolean
  dateCreated: Date
  dateUpdated: Date
}
