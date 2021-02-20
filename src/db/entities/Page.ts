import { IEntity } from './interfaces/IEntity'

export enum PageSectionTypeEnum {
  Publications = 'PUBLICATIONS',
  Projects = 'PROJECTS',
  News = 'NEWS',
  People = 'PEOPLE',
  Teaching = 'TEACHING',
  Software = 'SOFTWARE',
  SocialMedia = 'SOCIAL_MEDIA'
}

export interface PageSection extends IEntity {
  id: string
  title: string
  type: PageSectionTypeEnum
  dateCreated: Date
  dateUpdated: Date
}

export enum PageTypeEnum {
  Home = 'HOME',
  Publications = 'PUBLICATIONS',
  Projects = 'PROJECTS',
  News = 'NEWS',
  People = 'PEOPLE',
  Courses = 'COURSES',
  Software = 'SOFTWARE',
  SocialMedia = 'SOCIAL_MEDIA'
}

export interface Page extends IEntity {
  id: string
  title: string
  type: PageTypeEnum
  menu: {
    title: string
  }
  meta: {
    description: string
    keywords: string
    author: string
  }
  sections: Array<PageSection>
  dateCreated: Date
  dateUpdated: Date
}
