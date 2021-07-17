<template>
  <div>
    <div class="q-pa-md row items-center">
      <span class="col-6 text-left text-grey">
        {{  currentWebsite.title }}
      </span>
      <span class="col-6 text-right text-grey">
        {{ uuid }}
      </span>
    </div>

    <q-separator class="q-mx-md" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useRoute } from 'vue-router'
import useWebsitesManager from 'src/use/useWebsitesManager'

export default defineComponent({
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  setup () {
    const { currentWebsite } = useWebsitesManager()
    // const currentRouteMetaTitle = computed(() => {
    //   return useRoute().meta.title
    // })

    return {
      currentWebsite
      // currentRouteMetaTitle,
    }
  }
})
</script>
