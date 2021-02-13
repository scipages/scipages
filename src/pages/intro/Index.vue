<template>
  <div class="fit relative-position">
    <div class="q-pa-md">
      <p class="q-pa-md text-weight-bolder">
        Projects
        <q-separator />
      </p>

      <q-list class="non-selectable">
        <q-item>
          <q-item-section>
            <q-item-label>My project title goes here</q-item-label>
            <q-item-label caption lines="2">Some more information about the project.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-btn icon="keyboard_arrow_down" color="grey" padding="none xs">
              <q-menu anchor="bottom right" self="top right">
                <q-list>
                  <q-item clickable>
                    <q-item-section>Permanently Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>My project title goes here</q-item-label>
            <q-item-label caption lines="2">Some more information about the project.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-btn-group push>
              <q-btn size="xs" label="Open" icon="fas fa-folder-open" :to="{name: 'main_index', params: { uuid: 'a_fake_uuid' }}" />
              <q-separator vertical />
              <q-btn size="xs" label="Delete" icon="far fa-trash-alt" text-color="red-4" />
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIntroIndex'
})
</script>
