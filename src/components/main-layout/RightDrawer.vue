<template>
  <q-drawer
    :model-value="show"
    side="right"
    bordered
    content-class="bg-grey-2"
    :width="240"
    behavior="desktop"
  >
    <q-scroll-area class="fit bg-grey-2">
      <q-list padding style="max-width: 240px" class="non-selectable">
        <q-item>
          <q-item-section>
            <q-item-label top class="text-weight-bold text-grey text-uppercase">
              <q-icon color="grey" name="web" size="sm" /> Pages
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item>
          <q-btn align="between" class="full-width" label="Add Page" icon="fas fa-plus" text-color="green-8"></q-btn>
        </q-item>

        <br /><br /><br /><br /><br /><br /><br /><br /><br />

        <q-separator class="q-my-md" />

        <q-item v-for="link in links1" :key="link.text" v-ripple clickable :to="{name: 'main_index', params: { uuid: link.uuid }}">
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item v-ripple clickable :to="{name: 'main_test', params: { uuid: 'a_fake_uuid' }}">
          <q-item-section avatar>
            <q-icon color="grey" :name="'science'" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Test Page</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch
} from 'vue'

export default defineComponent({
  name: 'RightDrawer',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:show'],
  setup (props, { emit }) {
    const show = ref(props.show)
    watch(show, (newValue) => {
      emit('update:show', newValue)
    })

    return {
      links1: [
        { icon: 'science', text: 'My website\'s title goes here', uuid: 'a_fake_uuid' }
      ]
    }
  }
})
</script>
