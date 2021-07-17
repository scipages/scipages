import { IEntity } from './interfaces/IEntity'
import { Link } from './common/Link'

/**
 * Matches an author name with a hyperlink
 */
export interface AuthorLink extends IEntity {
  id: string // eg. 'f02ed1fc-a1a3-4a2c-b993-169a1c8989dd'
  fullName: string // eg. 'John Doe'
  link: Link
  dateCreated: Date
  dateUpdated: Date
}

export enum PublicationTypeEnum {
  JournalArticle = 'JOURNAL_ARTICLE',
  ConferencePaper = 'CONFERENCE_PAPER',
  WorkshopPaper = 'WORKSHOP_PAPER',
  Book = 'BOOK',
  BookSection = 'BOOK_SECTION',
  Thesis = 'THESIS',
  Other = 'OTHER'
}

export interface Publication extends IEntity {
  id: string // eg. 'f02ed1fc-a1a3-4a2c-b993-169a1c8989dd'
  title: string // eg. 'On the translation of languages from left to right'
  author: string // eg. 'Donald Knuth; John Doe'
  publication: string // Equivalent to BibTex `booktitle` or `journal` title, ex. 'Information and Control'
  volume: string // eg. '8'
  number: string // eg. '6'
  pages: string // eg. '607-639'
  year: number // eg. '1965'
  publisher: string // Equivalent to BibTex `organization` or `publisher` eg. 'Elsevier'
  eventLocation: string // eg. 'Barcelona, Spain'
  eventDate: string // eg. 'March 12-18, 2016'
  doi: string // eg. 'https://doi.org/10.1016/S0019-9958(65)90426-2'
  abstract: string // eg. 'There has been much recent interest in languages whose grammar is sufficiently...'
  abbreviationLink: Link // Link to the Conference or Journal website with its initials as title
  comment1: string // eg. 'Poster Abstract'
  comment2: string // eg. '* PDF provided through ACM Author-izer'
  links: Array<Link>
  type: PublicationTypeEnum
  inLab: boolean // In case of a research lab website, was the paper produced in the lab?
  enabled: boolean
  enabledFrontpage: boolean
  dateCreated: Date
  dateUpdated: Date
}
