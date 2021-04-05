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
        <!--
        <q-item-label header top class="text-weight-bold text-grey back-to-index-label">
          <q-btn size="xs" icon="close" class="back-to-index-btn" v-on:click="closeWebsite" />
          My website's title goes here
        </q-item-label>
        -->

        <!--
        <q-item-label>
          <q-bar class="fit bg-grey-2">
            <div class="cursor-pointer q-py-sm">
              My website's title goes here
            </div>
            <q-space />
            <q-btn dense flat icon="close" v-on:click="closeWebsite" />
          </q-bar>
        </q-item-label>

        <q-separator class="q-my-md" />
        -->

        <q-item v-for="link in links1" :key="link.text" v-ripple clickable :to="{name: 'main_index', params: { uuid: currentWebsite.uuid }}">
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item-label header top class="text-weight-bold text-grey">
          Content
        </q-item-label>

        <q-item v-for="link in links2" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
            <q-item-label caption v-if="link.hasOwnProperty('caption')">{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item-label header top class="text-weight-bold text-grey">
          Configuration
        </q-item-label>

        <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
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
import { useRouter } from 'vue-router'
import {
  farNewspaper,
  fasGraduationCap,
  fasLaptopCode,
  fasUpload,
  fabGitAlt,
  fasPalette,
  fasImages,
  fasAddressCard
} from '@quasar/extras/fontawesome-v5'
import useWebsitesManager from 'src/use/useWebsitesManager'

export default defineComponent({
  name: 'LeftDrawer',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:show'],
  setup (props, { emit }) {
    const router = useRouter()
    const { currentWebsite } = useWebsitesManager()

    const show = ref(props.show)
    watch(show, (newValue) => {
      emit('update:show', newValue)
    })

    function closeWebsite () {
      void router.push({ name: 'index' })
    }

    return {
      currentWebsite,
      closeWebsite,
      links1: [
        { icon: 'web', text: 'Pages' }
      ],
      links2: [
        { icon: fasAddressCard, text: 'Basic Info', caption: 'Title, Bio, Intro Text etc.' },
        { icon: 'list_alt', text: 'Publications' },
        { icon: 'handyman', text: 'Projects' },
        { icon: farNewspaper, text: 'News' },
        { icon: 'people', text: 'People' },
        { icon: fasGraduationCap, text: 'Teaching/Courses' },
        { icon: fasLaptopCode, text: 'Software/Code' },
        { icon: 'tag', text: 'Social Media' },
        { icon: fasImages, text: 'Static Files' }
      ],
      links3: [
        { icon: 'settings', text: 'Site Settings' },
        { icon: fasPalette, text: 'Theme' },
        { icon: fabGitAlt, text: 'Git Synchronization' },
        { icon: fasUpload, text: 'Generate & Deploy' }
      ]
    }
  }
})
</script>

<style scoped lang="scss">
  //.back-to-index-label {
  //  line-height: 1.7em !important;
  //  .back-to-index-btn {
  //    padding: 0;
  //    margin-right: 5px;
  //    line-height: 1.7em;
  //    min-height: 1.7em;
  //  }
  //  .back-to-index-btn:hover {
  //    color: #1976D2;
  //  }
  //}
</style>
