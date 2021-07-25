import { ElectronData } from 'app/src-electron/types/ElectronData'
import { WebsitePathItem } from 'app/src-electron/types/WebsitePathItem'
import { WindowMaxUnmaxParam } from 'app/src-electron/types/WindowMaxUnmaxParam'
import { Course } from 'app/src-common/entities/Course'
import { ConfigurationThemeEnum } from 'app/src-common/enums/ConfigurationThemeEnum'
import { NewWebsiteTypeEnum } from 'app/src-common/enums/NewWebsiteTypeEnum'

declare global {
  interface Window {
    'myWindowAPI': {
      receiveMaxUnmax: (func: (data: WindowMaxUnmaxParam) => void) => void,
      minimize: () => void,
      toggleMaximize: () => void,
      close: () => void,
      appRelaunch: () => void,
      showModal: (url: string) => void,
      openURL: (url: string) => void,
      getCurrentURLSync: () => string
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
      createCourse: (website: WebsitePathItem, item: Course) => Promise<string>
      updateCourse: (website: WebsitePathItem, item: Course) => Promise<string>
      deleteCourse: (website: WebsitePathItem, item: Course) => Promise<string>
    }
  }
}
