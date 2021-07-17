import { IEntity } from './interfaces/IEntity'

export enum MenuItemTypeEnum {
  Page = 'PAGE',
  PageSection = 'PAGE_SECTION',
  External = 'External'
}

export interface MenuItem extends IEntity {
  id: string
  title: string
  pathOrUrl: string
  targetId: string
  order: number
  type: MenuItemTypeEnum
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}

export interface IPageSection {
  title: string
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}

export enum ContentPageSectionTypeEnum {
  Publications = 'PUBLICATIONS',
  Projects = 'PROJECTS',
  News = 'NEWS',
  People = 'PEOPLE',
  Teaching = 'TEACHING',
  Software = 'SOFTWARE',
  SocialMedia = 'SOCIAL_MEDIA'
}

export interface ContentPageSection extends IEntity, IPageSection {
  id: string
  title: string
  type: ContentPageSectionTypeEnum
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}

export interface CustomPageSection extends IEntity, IPageSection {
  id: string
  title: string
  content: string
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}

export enum PageTypeEnum {
  Home = 'HOME',
  Other = 'OTHER'
}

export interface Page extends IEntity {
  id: string
  title: string
  type: PageTypeEnum
  menuItem: MenuItem
  meta: {
    description: string
    keywords: string
    author: string
  }
  sections: Array<IPageSection>
  enabled: boolean
  dateCreated: Date
  dateUpdated: Date
}
