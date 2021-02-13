<template>
  <q-bar class="q-electron-drag">
    <q-icon name="science" />
    <div class="non-selectable">{{ productName }}</div>

    <q-space />

    <q-btn dense flat icon="minimize" v-on:click="minimizeWindow()" />
    <q-btn dense flat icon="crop_square" v-if="maximized == false" v-on:click="maximizeUnmaximizeWindow()" />
    <q-btn dense flat icon="crop_square" v-else v-on:click="maximizeUnmaximizeWindow()" />
    <q-btn dense flat icon="close" class="close" v-on:click="closeWindow()" />
  </q-bar>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  computed
} from 'vue'
import { ipcRenderer } from 'electron'
import { useStore } from 'vuex'
// import {
//   farWindowRestore
// } from '@quasar/extras/fontawesome-v5'

export default defineComponent({
  name: 'TitleBar',
  setup () {
    const maximized = ref(false)

    const store = useStore()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const productName = computed(() => store.state.packageInfo.productName)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const version = computed(() => store.state.packageInfo.version)

    onMounted(() => {
      // ipcRenderer.on('window-maximized',  (event, message) => {
      ipcRenderer.on('window-maximized', () => {
        maximized.value = true
      })
      // ipcRenderer.on('window-unmaximized',  (event, message) => {
      ipcRenderer.on('window-unmaximized', () => {
        maximized.value = false
      })
    })
    function minimizeWindow () {
      void ipcRenderer.invoke('window-controls-channel', { minimize: true })
    }
    function maximizeUnmaximizeWindow () {
      void ipcRenderer.invoke('window-controls-channel', { maximize: true })
    }
    function closeWindow () {
      void ipcRenderer.invoke('window-controls-channel', { close: true })
    }
    return {
      maximized,
      productName,
      version,
      minimizeWindow,
      maximizeUnmaximizeWindow,
      closeWindow
      // farWindowRestore
    }
  }
})
</script>

<style scoped lang="scss">
.close:hover {
  background-color: #F04747;
}
</style>
