<template>
  <q-bar class="q-electron-drag">
    <q-icon name="science" />
    <div class="non-selectable">
      {{ productName }}
      <span v-if="currentWebsite.title !== null">
        - {{ currentWebsite.title }}
      </span>
    </div>

    <q-space />

    <q-btn dense flat icon="minimize" v-on:click="minimizeWindow()" />
    <q-btn dense flat icon="crop_square" v-if="maximized === false" v-on:click="toggleMaximizeWindow()" />
    <q-btn dense flat icon="crop_square" v-else v-on:click="toggleMaximizeWindow()" />
    <q-btn dense flat icon="close" class="close" v-on:click="closeWindow()" />
  </q-bar>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed
} from 'vue'
// import { useStore } from 'vuex'
import { useStore } from 'src/store'
// import {
//   farWindowRestore
// } from '@quasar/extras/fontawesome-v5'
import useWebsitesManager from 'src/use/useWebsitesManager'
import useWindow from 'src/use/useWindow'

export default defineComponent({
  name: 'TitleBar',
  setup () {
    const store = useStore()
    const productName = computed(() => store.state.packageInfo.productName)
    const version = computed(() => store.state.packageInfo.version)

    const { currentWebsite } = useWebsitesManager()

    const {
      maximized,
      receiveMaxUnmax,
      minimizeWindow,
      toggleMaximizeWindow,
      closeWindow
    } = useWindow()

    onMounted(() => {
      receiveMaxUnmax()
    })

    return {
      productName,
      version,
      currentWebsite,
      maximized,
      minimizeWindow,
      toggleMaximizeWindow,
      closeWindow
    }
  }
})
</script>

<style scoped lang="scss">
.close:hover {
  background-color: #F04747;
}
</style>
