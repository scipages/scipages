<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { name, productName, description, version } from '../package.json'

export default defineComponent({
  name: 'App',
  setup () {
    const store = useStore()

    const name1: string = name
    const productName1: string = productName
    const description1: string = description
    const version1: string = version

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    void store.dispatch('packageInfo/setName', name1, { root: true })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    void store.dispatch('packageInfo/setProductName', productName1, { root: true })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    void store.dispatch('packageInfo/setDescription', description1, { root: true })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    void store.dispatch('packageInfo/setVersion', version1, { root: true })
  }
})
</script>
