import {
  ref
} from 'vue'
import { WindowMaxUnmaxParam } from 'app/src-common/types/WindowMaxUnmaxParam'

export default function useMainWindow () {
  const maximized = ref(false)
  function receiveMaxUnmax () {
    // if (process.env.MODE === 'electron') {
    window.myWindowAPI.receiveMaxUnmax((data: WindowMaxUnmaxParam) => {
      maximized.value = data.max
    })
    // }
  }

  function minimizeWindow () {
    window.myWindowAPI.minimize()
  }
  function toggleMaximizeWindow () {
    window.myWindowAPI.toggleMaximize()
  }
  function closeWindow () {
    window.myWindowAPI.close()
  }

  function appRelaunch () {
    window.myWindowAPI.appRelaunch()
  }

  function showModal (url: string) {
    window.myWindowAPI.showModal(url)
  }

  function openURL (url: string) {
    window.myWindowAPI.openURL(url)
  }

  return {
    maximized,
    receiveMaxUnmax,
    minimizeWindow,
    toggleMaximizeWindow,
    closeWindow,
    appRelaunch,
    showModal,
    openURL
    // farWindowRestore,
  }
}
