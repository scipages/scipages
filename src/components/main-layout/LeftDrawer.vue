<template>
  <q-drawer
    :model-value="show"
    side="left"
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
              <q-icon color="grey" name="folder" size="sm" /> Projects
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              round
              size="sm"
              color="primary"
              icon="add"
              aria-label="Create Project"
            >
              <CreateProjectMenu></CreateProjectMenu>
            </q-btn>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item v-for="link in links1" :key="link.text" v-ripple clickable :to="{name: 'project_index', params: { uuid: link.uuid }}">
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item v-ripple clickable :to="{name: 'index'}">
          <q-item-section avatar>
            <q-icon color="grey" :name="'science'" />
          </q-item-section>
          <q-item-section>
            <q-item-label>(Test) Index</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable :to="{name: 'test'}">
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
  ref
  // watch
} from 'vue'
import CreateProjectMenu from 'components/projects/CreateProjectMenu.vue'

export default defineComponent({
  name: 'LeftDrawer',
  components: {
    CreateProjectMenu
  },
  // props: {
  //   show: {
  //     type: Boolean,
  //     default: true
  //   }
  // },
  // emits: ['update:show'],
  // setup (props, { emit }) {
  setup () {
    const show = ref(true)
    // watch(show, (newValue, oldValue) => {
    //   emit('update:show', newValue)
    // })

    return {
      show,
      links1: [
        { icon: 'science', text: 'My projects title goes here', uuid: 'a_fake_uuid' }
      ]
    }
  }
})
</script>
