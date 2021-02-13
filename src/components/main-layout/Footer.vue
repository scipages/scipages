<template>
  <div class="q-px-md row items-center text-black shadow-2 non-selectable text-caption">
    <span class="col-9 text-left">
      Project: The open project's name goes here | followed by breadcrumbs items
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
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Footer',
  setup () {
    const store = useStore()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const productName = computed(() => store.state.packageInfo.productName)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const version = computed(() => store.state.packageInfo.version)

    return {
      productName,
      version
    }
  }
})
</script>
