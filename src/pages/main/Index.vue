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
            <q-item-label>Home</q-item-label>
            <q-item-label caption lines="2">Some more information about the page.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-btn size="xs" label="Edit" icon="fas fa-edit" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section avatar top>
            <q-toggle
              size="xs"
              v-model="testPageStatusValue"
              true-value="1"
              false-value="0"
              color="green"
              checked-icon="check"
              unchecked-icon="clear"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>Another page</q-item-label>
            <q-item-label caption lines="2">Some more information about the other page.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-btn-group push>
              <q-btn size="xs" label="Edit" icon="fas fa-edit" />
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageMainIndex',
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  setup () {
    const testPageStatusValue = ref('1')

    return {
      testPageStatusValue
    }
  }
})
</script>
