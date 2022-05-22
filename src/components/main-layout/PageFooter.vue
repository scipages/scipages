<template>
  <div class="q-px-md row items-center text-black shadow-2 non-selectable text-caption">
    <span class="col-9 text-left">
      <span v-if="currentWebsite.title !== null">
        {{ currentWebsite.title }}
      </span>
      <span v-if="currentWebsite.uuid !== null">
        • {{ currentWebsite.uuid }}
        • {{ currentRouteMetaTitle }}
      </span>
    </span>
    <span class="col-3 text-right">
      {{ productName }} v{{ version }}
      <!--<span> / Quasar v{{ $q.version }}</span>-->
    </span>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent
} from 'vue'
// import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useStore } from 'src/store'
import useWebsitesManager from 'src/use/useWebsitesManager'

export default defineComponent({
  name: 'PageFooter',
  setup () {
    const { currentWebsite } = useWebsitesManager()
    const currentRouteMetaTitle = computed(() => {
      return useRoute().meta.title
    })

    const store = useStore()
    const productName = computed(() => store.state.packageInfo.productName)
    const version = computed(() => store.state.packageInfo.version)

    return {
      currentWebsite,
      currentRouteMetaTitle,
      productName,
      version
    }
  }
})
</script>
