<template>
  <NotificationsComponent></NotificationsComponent>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import usePackageInfo from 'src/use/usePackageInfo'
import useElectronData from 'src/use/useElectronData'
import NotificationsComponent from 'src/components/NotificationsComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    NotificationsComponent
  },
  setup () {
    const { setPackageInfo } = usePackageInfo()
    const { retrieveElectronData } = useElectronData()

    onMounted(() => {
      setPackageInfo()
      retrieveElectronData()
    })
  }
})
</script>
