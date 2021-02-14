import { ipcRenderer } from 'electron'
import { reactive } from 'vue'
import path from 'path'
import fs from 'fs'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

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

interface User {
  email: string;
  password: string;
}

interface Database {
  title: string;
  users: Array<User>;
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
      console.log('userDataProjectsPath: ' + electronData.userDataProjectsPath)
      console.log('userDataConfigurationPath: ' + electronData.userDataConfigurationPath)
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
  function openConfiguration () {
    const adapter = new FileSync<Database>(path.join(electronData.userDataConfigurationPath, 'main.json'))
    const db: lowdb.LowdbSync<Database> = lowdb(adapter)
    void db.defaults({
      title: '',
      users: []
    }).write()
    void db.get('users')
      .push({
        email: 'anexampleemail@example.com',
        password: 'password'
      })
      .write()
    const bla = db.get('users')
      .find({ email: 'anexampleemail@example.com' })
      .value()
    console.log(bla)
  }

  return {
    electronData,
    initPaths,
    listProjects,
    openConfiguration
  }
}
