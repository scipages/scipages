import { IEntity } from './interfaces/IEntity'
import { Link } from './common/Link'

export interface Course extends IEntity {
  id: string // eg. 'f02ed1fc-a1a3-4a2c-b993-169a1c8989dd'
  title: string // eg. 'Introduction to Computer Science'
  role: string // eg. 'Teaching Assistant'
  semester: number // eg. 1
  semesterTaught: string // eg. 'Spring 2018, Fall 2019'
  organization: string // eg. 'University of Peloponnese'
  department: string // eg. 'Department of Computer Science'
  links: Array<Link>
  enabled: boolean
  enabledFrontpage: boolean
  dateCreated: Date
  dateUpdated: Date
}
