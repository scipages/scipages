import { ipcRenderer } from 'electron'
import { reactive } from 'vue'
import path from 'path'
import fs from 'fs'

export interface ElectronData {
  electronVersion: string,
  userDataPath: string,
  userDataProjectsPath: string,
  userDataConfigurationPath: string
}

export interface ProjectPathItem {
  filename: string,
  path: string
}
export interface ProjectPathList {
  items: Array<ProjectPathItem>
}

export default function useData () {
  const electronData: ElectronData = reactive({
    electronVersion: '',
    userDataPath: '',
    userDataProjectsPath: '',
    userDataConfigurationPath: ''
  })

  initPaths()

  function initPaths () {
    void ipcRenderer.invoke('get-data-channel', { }).then((result: ElectronData) => {
      electronData.electronVersion = result.electronVersion
      electronData.userDataPath = result.userDataPath
      electronData.userDataProjectsPath = result.userDataProjectsPath
      electronData.userDataConfigurationPath = result.userDataConfigurationPath

      // Create the projects directory
      if (!fs.existsSync(electronData.userDataProjectsPath)) {
        fs.mkdirSync(electronData.userDataProjectsPath)
      }
      // Create the configuration directory
      if (!fs.existsSync(electronData.userDataConfigurationPath)) {
        fs.mkdirSync(electronData.userDataConfigurationPath)
      }
    })
  }
  function listProjects () {
    const paths: ProjectPathList = {
      items: []
    }
    fs.readdirSync(electronData.userDataProjectsPath).forEach(file => {
      if (fs.lstatSync(path.resolve(electronData.userDataProjectsPath, file)).isDirectory() && file.startsWith('project-')) {
        paths.items.push({
          filename: file,
          path: path.join(electronData.userDataProjectsPath, file)
        })
      }
    })
    for (let i = 0; i < paths.items.length; i++) {
      console.log(`Project ${i}: ` + paths.items[i].filename)
    }
  }

  return {
    electronData,
    initPaths,
    listProjects
  }
}
