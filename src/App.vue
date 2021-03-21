<template>
  <NotificationsComponent></NotificationsComponent>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import usePackageInfo from 'src/use/usePackageInfo'
import useMainElectronData from 'src/use/useMainElectronData'
import NotificationsComponent from 'src/components/NotificationsComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    NotificationsComponent
  },
  setup () {
    const { setPackageInfo } = usePackageInfo()
    const { retrieveElectronData } = useMainElectronData()

    onMounted(() => {
      setPackageInfo()
      retrieveElectronData()
    })
  }
})
</script>
