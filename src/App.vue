<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import usePackageInfo from 'src/use/usePackageInfo'

export default defineComponent({
  name: 'App',
  setup () {
    const { setPackageInfo } = usePackageInfo()

    onMounted(() => {
      setPackageInfo()
    })
  }
})
</script>
