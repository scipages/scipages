export enum NewWebsiteTypeEnum {
  Empty = 'EMPTY',
  Personal = 'PERSONAL',
  Lab = 'LAB',
  Course = 'COURSE',
  Conference = 'CONFERENCE'
}

export const newWebsiteTypeStrings: { [key in NewWebsiteTypeEnum]: string } = {
  [NewWebsiteTypeEnum.Empty]: 'Empty',
  [NewWebsiteTypeEnum.Personal]: 'Personal',
  [NewWebsiteTypeEnum.Lab]: 'Research Lab',
  [NewWebsiteTypeEnum.Course]: 'Course',
  [NewWebsiteTypeEnum.Conference]: 'Conference/Workshop'
}

// With the above definition, all keys in the enum must be included.
// To not have to include all keys use:
// export const newWebsiteTypes: { [key in NewWebsiteTypeEnum]?: string } = {
