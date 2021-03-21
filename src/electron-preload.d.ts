import { ElectronData } from 'src/types/ElectronData'
import { ProjectPathItem } from 'src/types/ProjectPathItem'
import { WindowMaxUnmaxParam } from 'src/types/WindowMaxUnmaxParam'
// import { AdapterSync } from 'lowdb'

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
    'myProjectManagerAPI': {
      initPathsSync: () => void,
      getProjectPathListSync: () => Array<ProjectPathItem>,
      openProjectSync: (item: ProjectPathItem) => void,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deleteProject: (item: ProjectPathItem) => Promise<any>
    },
    'myDatabaseAPI': {
      // getAdapter: <TSchema>(projectPath: string, filename: string, databaseDefault: TSchema) => AdapterSync<TSchema>
    }
  }
}
