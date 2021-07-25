import { reactive, readonly } from 'vue'
import { ElectronData } from 'app/src-common/types/ElectronData'

const electronData: ElectronData = reactive({
  debugging: false,
  electronVersion: '',
  userDataPath: '',
  userDataWebsitesPath: '',
  userDataConfigurationPath: ''
})

export default function useMainElectronData () {
  function retrieveElectronData () {
    // if (process.env.MODE === 'electron') {
    window.myElectronDataAPI.retrieveElectronData((data: ElectronData) => {
      electronData.debugging = data.debugging
      electronData.electronVersion = data.electronVersion
      electronData.userDataPath = data.userDataPath
      electronData.userDataWebsitesPath = data.userDataWebsitesPath
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
