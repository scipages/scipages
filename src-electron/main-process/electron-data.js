import { app } from 'electron'
import path from 'path'

const electronData = {
  version: app.getVersion(),
  userDataPath: app.getPath('userData'),
  userDataProjectsPath: path.join(app.getPath('userData'), 'scipages-projects'),
  userDataConfigurationPath: path.join(app.getPath('userData'), 'scipages-configuration')
}

export default electronData
