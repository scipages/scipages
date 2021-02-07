<template>
  <div class="fit relative-position">
    <div class="q-pa-md">
      <p class="q-pa-md text-weight-bolder">
        Pages<br />
        ( {{ uuid }} )
        <q-separator />
      </p>

      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>A page</q-item-label>
            <q-item-label caption lines="2">Some more information about the page.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-btn size="xs" label="Open" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Another page</q-item-label>
            <q-item-label caption lines="2">Some more information about the other page.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-btn size="xs" label="Open" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageProjectIndex',
  props: {
    uuid: {
      type: String,
      default: ''
    }
  }
})
</script>
