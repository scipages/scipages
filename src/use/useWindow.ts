import {
  ref
} from 'vue'
import { WindowMaxUnmaxParam } from 'app/src-common/types/WindowMaxUnmaxParam'

export default function useWindow () {
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

  function openURL (url: string) {
    window.myWindowAPI.openURL(url)
  }

  function showModal (url: string) {
    window.myWindowAPI.showModal(url)
  }

  function showAboutDialog () {
    window.myWindowAPI.showAboutDialog()
  }

  return {
    maximized,
    receiveMaxUnmax,
    minimizeWindow,
    toggleMaximizeWindow,
    closeWindow,
    appRelaunch,
    openURL,
    showModal,
    showAboutDialog
    // farWindowRestore,
  }
}
