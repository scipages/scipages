import { ElectronData } from 'app/src-common/types/ElectronData'
import { WebsitePathItem } from 'app/src-common/types/WebsitePathItem'
import { WindowMaxUnmaxParam } from 'app/src-common/types/WindowMaxUnmaxParam'
import { Course } from '@scipages/gen/lib/entities/Course'
import { ConfigurationThemeEnum } from '@scipages/gen/lib/entities/Configuration'
import { NewWebsiteTypeEnum } from 'app/src-common/enums/NewWebsiteTypeEnum'
import { PostRequestResult } from 'app/src-common/types/PostRequestResult'

declare global {
  interface Window {
    'myWindowAPI': {
      receiveMaxUnmax: (func: (data: WindowMaxUnmaxParam) => void) => void,
      minimize: () => void,
      toggleMaximize: () => void,
      close: () => void,
      appRelaunch: () => void,
      openURL: (url: string) => void,
      getCurrentURLSync: () => string,
      showModal: (url: string) => void,
      showAboutDialog: () => void
    },
    'myElectronDataAPI': {
      retrieveElectronData: (func: (data: ElectronData) => void) => void,
      retrieveElectronDataSync: () => ElectronData
    },
    'myWebsitesManagerAPI': {
      initPathsSync: () => void,
      getWebsitePathListSync: () => Array<WebsitePathItem>,
      openWebsiteSync: (item: WebsitePathItem) => void,
      createWebsite: (
        title: string,
        theme: ConfigurationThemeEnum,
        websiteType: NewWebsiteTypeEnum,
        websiteSinglePage: boolean
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => Promise<any>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deleteWebsite: (item: WebsitePathItem) => Promise<any>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      exportWebsite: (item: WebsitePathItem) => Promise<any>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      importWebsite: () => Promise<any>
    },
    'myContentAPI': {
      getCoursesListSync: (website: WebsitePathItem) => Array<Course>,
      createCourse: (website: WebsitePathItem, item: Course) => Promise<PostRequestResult>
      updateCourse: (website: WebsitePathItem, item: Course) => Promise<string>
      deleteCourse: (website: WebsitePathItem, item: Course) => Promise<string>
    }
  }
}
