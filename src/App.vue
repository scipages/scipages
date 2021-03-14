<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import usePackageInfo from 'src/use/usePackageInfo'
import useMainElectronData from 'src/use/useMainElectronData'

export default defineComponent({
  name: 'App',
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
