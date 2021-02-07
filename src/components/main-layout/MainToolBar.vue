<template>
  <q-toolbar>
    <q-toolbar-title>
      ToolBar
    </q-toolbar-title>

    <q-space />

    <div>Quasar v{{ $q.version }}</div>
  </q-toolbar>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'MainToolBar'
})
</script>
