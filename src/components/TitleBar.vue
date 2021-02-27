<template>
  <q-bar class="q-electron-drag">
    <q-icon name="science" />
    <div class="non-selectable">
      {{ productName }}
      <span v-if="currentProject.title !== null">
        - {{ currentProject.title }}
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
import { useStore } from 'vuex'
// import {
//   farWindowRestore
// } from '@quasar/extras/fontawesome-v5'
import useProjectManager from 'src/use/useProjectManager'
import useMainWindow from 'src/use/useMainWindow'

export default defineComponent({
  name: 'TitleBar',
  setup () {
    const store = useStore()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const productName = computed(() => store.state.packageInfo.productName)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const version = computed(() => store.state.packageInfo.version)

    const { currentProject } = useProjectManager()

    const {
      maximized,
      receiveMaxUnmax,
      minimizeWindow,
      toggleMaximizeWindow,
      closeWindow
    } = useMainWindow()

    onMounted(() => {
      receiveMaxUnmax()
    })

    return {
      productName,
      version,
      currentProject,
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
