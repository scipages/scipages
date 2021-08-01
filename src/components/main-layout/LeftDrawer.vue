<template>
  <CheckForUpdates
    v-if="checkForUpdatesShow"
    v-bind:show="checkForUpdatesShow"
    v-on:close="checkForUpdatesShow=false"
  ></CheckForUpdates>

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

        <q-item
          v-for="link in links2"
          :key="link.text"
          v-ripple
          clickable
          :to="{ name: link.route_name, params: { uuid: currentWebsite.uuid } }"
          :class="{ 'q-router-link--exact-active q-router-link--active': isParentActive(link.parent_route_url) }"
        >
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

        <q-item
          v-for="link in links3"
          :key="link.text"
          v-ripple
          clickable
          :to="{name: link.route_name, params: { uuid: currentWebsite.uuid }}"
          :class="{ 'q-router-link--exact-active q-router-link--active': isParentActive(link.parent_route_url) }"
        >
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
          Help
        </q-item-label>

        <q-item v-for="link in links4" :key="link.text" v-ripple clickable v-on:click="link.action">
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
            <q-item-label caption v-if="link.hasOwnProperty('caption')">{{ link.caption }}</q-item-label>
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
import { useRouter, useRoute } from 'vue-router'
import {
  farNewspaper,
  fasGraduationCap,
  fasLaptopCode,
  fasServer,
  fabGitAlt,
  fasPalette,
  fasImages,
  fasAddressCard
} from '@quasar/extras/fontawesome-v5'
import useWebsitesManager from 'src/use/useWebsitesManager'

import useWindow from 'src/use/useWindow'

import CheckForUpdates from 'components/CheckForUpdates.vue'

export default defineComponent({
  name: 'LeftDrawer',
  components: {
    CheckForUpdates
  },
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:show'],
  setup (props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const { currentWebsite } = useWebsitesManager()

    const show = ref(props.show)
    watch(show, (newValue) => {
      emit('update:show', newValue)
    })

    function closeWebsite () {
      void router.push({ name: 'index' })
    }

    const { openURL, showAboutDialog } = useWindow()

    function getParentUrl (parent: string) : string | null {
      if (currentWebsite.uuid === null) {
        return ''
      }
      return `/main/${currentWebsite.uuid}/${parent}`
    }
    function isParentActive (parentRouteUrl: string | null) {
      if (typeof parentRouteUrl === 'undefined' || parentRouteUrl === null || parentRouteUrl === '') {
        return false
      }
      // Current path starts with the path of the parent?
      return route.path.indexOf(parentRouteUrl) === 0
    }

    const checkForUpdatesShow = ref<boolean>(false)

    return {
      currentWebsite,
      closeWebsite,
      links1: [
        { icon: 'web', text: 'Pages' }
      ],
      isParentActive: isParentActive,
      links2: [
        { icon: fasAddressCard, text: 'Basic Info', caption: 'Title, Bio, Intro Text etc.', route_name: 'main_basic_info' },
        { icon: 'list_alt', text: 'Publications', route_name: 'main_publications' },
        { icon: 'handyman', text: 'Projects', route_name: 'main_projects' },
        { icon: farNewspaper, text: 'News/Highlights', route_name: 'main_news' },
        { icon: 'people', text: 'People', route_name: 'main_people' },
        { icon: fasGraduationCap, text: 'Teaching/Courses', route_name: 'main_courses_index', parent_route_url: getParentUrl('courses') },
        { icon: fasLaptopCode, text: 'Software/Code', route_name: 'main_software' },
        { icon: 'tag', text: 'Social Media', route_name: 'main_social_media' },
        { icon: fasImages, text: 'Static Files', route_name: 'main_static_files' }
      ],
      links3: [
        { icon: 'settings', text: 'Site Settings', route_name: 'main_site_settings' },
        { icon: fasPalette, text: 'Theme', route_name: 'main_theme' },
        { icon: fasServer, text: 'Server/Host', route_name: 'main_server' },
        { icon: fabGitAlt, text: 'Git Synchronization', route_name: 'main_git' }
      ],
      links4: [
        { icon: 'fas fa-book', text: 'Documentation', action: () => { openURL('https://scipages.github.io/') } },
        { icon: 'fab fa-github', text: 'GitHub', action: () => { openURL('https://github.com/scipages/scipages') } },
        { icon: 'bug_report', text: 'Report Issue', action: () => { openURL('https://github.com/scipages/scipages/issues') } },
        { icon: 'update', text: 'Check for Updates', action: () => { checkForUpdatesShow.value = true } },
        { icon: 'info', text: 'About', action: () => { showAboutDialog() } }
      ],
      checkForUpdatesShow
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
