import { reactive, readonly } from 'vue'
import { ElectronData } from 'src/types/ElectronData'

const electronData: ElectronData = reactive({
  electronVersion: '',
  userDataPath: '',
  userDataProjectsPath: '',
  userDataConfigurationPath: ''
})

export default function useMainElectronData () {
  function retrieveElectronData () {
    // if (process.env.MODE === 'electron') {
    window.myElectronDataAPI.retrieveElectronData((data: ElectronData) => {
      electronData.electronVersion = data.electronVersion
      electronData.userDataPath = data.userDataPath
      electronData.userDataProjectsPath = data.userDataProjectsPath
      electronData.userDataConfigurationPath = data.userDataConfigurationPath
    })
    // }
  }

  function retrieveElectronDataSync (): ElectronData {
    return window.myElectronDataAPI.retrieveElectronDataSync()
  }

  return {
    electronData: readonly(electronData),
    retrieveElectronData,
    retrieveElectronDataSync
  }
}
