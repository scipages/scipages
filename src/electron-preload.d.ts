import { ElectronData } from 'src/types/ElectronData'
import { WebsitePathItem } from 'src/types/WebsitePathItem'
import { WindowMaxUnmaxParam } from 'src/types/WindowMaxUnmaxParam'

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deleteWebsite: (item: WebsitePathItem) => Promise<any>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      exportWebsite: (item: WebsitePathItem) => Promise<any>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      importWebsite: () => Promise<any>
    },
    'myDatabaseAPI': {
      // getAdapter: <TSchema>(websitePath: string, filename: string, databaseDefault: TSchema) => AdapterSync<TSchema>
    }
  }
}
