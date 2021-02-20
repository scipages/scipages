import { ipcRenderer } from 'electron'
import { reactive, readonly } from 'vue'
import path from 'path'
import fs from 'fs'

import {
  openConfigurationDB, ConfigurationDB, ConfigurationSimpleRepository
} from 'src/db/repositories/ConfigurationRepository'
import { openPagesDB } from 'src/db/repositories/PagesRepository'
import { openCoursesDB } from 'src/db/repositories/CoursesRepository'

export interface ElectronData {
  electronVersion: string,
  userDataPath: string,
  userDataProjectsPath: string,
  userDataConfigurationPath: string
}

export interface ProjectPathItem {
  filename: string | null,
  path: string | null,
  title: string | null,
  uuid: string | null
}
export interface ProjectPathList {
  items: Array<ProjectPathItem>
}

const allProjects: ProjectPathList = reactive({ items: [] })
const currentProject: ProjectPathItem = reactive({
  filename: null,
  path: null,
  title: null,
  uuid: null
})

export default function useProjectManager () {
  const electronData: ElectronData = reactive({
    electronVersion: '',
    userDataPath: '',
    userDataProjectsPath: '',
    userDataConfigurationPath: ''
  })

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

      initProjectPathList()
    })
  }
  function initProjectPathList () {
    allProjects.items = []
    fs.readdirSync(electronData.userDataProjectsPath).forEach(file => {
      if (fs.lstatSync(path.resolve(electronData.userDataProjectsPath, file)).isDirectory() && file.startsWith('project-')) {
        openConfigurationDB(path.join(electronData.userDataProjectsPath, file))
        const repository = new ConfigurationSimpleRepository(
          ConfigurationDB
        )
        // @ts-ignore
        const title: string = repository.getValue('title')

        allProjects.items.push({
          filename: file,
          path: path.join(electronData.userDataProjectsPath, file),
          title: title,
          uuid: file.substring('project-'.length)
        })
      }
    })
    // for (let i = 0; i < allProjects.items.length; i++) {
    //   console.log(`Project ${i}: ` + allProjects.items[i].filename)
    // }
  }
  function openProject (item: ProjectPathItem) {
    currentProject.filename = item.filename
    currentProject.path = item.path
    currentProject.title = item.title
    currentProject.uuid = item.uuid
    if (item.path !== null && item.filename !== null && item.title !== null && item.uuid !== null) {
      const projectPath = path.join(item.path)
      openConfigurationDB(projectPath)
      openPagesDB(projectPath)
      openCoursesDB(projectPath)
    }
  }
  function closeProject () {
    currentProject.filename = null
    currentProject.path = null
    currentProject.title = null
    currentProject.uuid = null
  }
  // function createProject () {
  //   // TODO
  // }
  // function deleteProject () {
  //   // TODO
  // }

  return {
    electronData,
    initPaths,
    allProjects: readonly(allProjects),
    currentProject: readonly(currentProject),
    openProject,
    closeProject
  }
}
