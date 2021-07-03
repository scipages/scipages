<template>
  <div class="fit relative-position">
    <div class="q-pa-md">
      <div class="q-pa-md row items-center">
        <span class="col-6 text-left text-grey">
          {{  currentWebsite.title }}
        </span>
        <span class="col-6 text-right text-grey">
          {{ uuid }}
        </span>
      </div>

      <q-separator class="q-mx-md" />

      <div class="q-pa-md">
        {{ currentRouteMetaTitle }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import useWebsitesManager from 'src/use/useWebsitesManager'

export default defineComponent({
  name: 'PageMainConfigurationGit',
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  setup () {
    const currentRouteMetaTitle = computed(() => {
      return useRoute().meta.title
    })
    const { currentWebsite } = useWebsitesManager()

    return {
      currentRouteMetaTitle,
      currentWebsite
    }
  }
})
</script>

<style scoped lang="scss">
</style>
