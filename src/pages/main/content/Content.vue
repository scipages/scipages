<template>
  <div class="fit relative-position">
    <div class="q-pa-md">
      <PageTop :uuid="uuid" />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTop from 'components/main-layout/PageTop.vue'

export default defineComponent({
  components: {
    PageTop
  },
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  setup () {
    return {
    }
  }
})
</script>

<style scoped lang="scss">
</style>
