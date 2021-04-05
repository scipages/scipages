<template>
  <!--<div class="q-pa-md q-gutter-y-sm">-->
    <q-toolbar class="bg-grey-3" v-if="show">
      <q-btn icon="remove_red_eye" label="Preview" flat stack stretch no-caps push padding="sm" class="custom-toolbar-item"></q-btn>
      <q-btn icon="cloud_upload" label="Publish" flat stack stretch no-caps push padding="sm" class="custom-toolbar-item"></q-btn>
      <!--
      <q-btn flat round dense style="color: #7A7D84; font-weight: 400;">
        <q-icon name="menu"></q-icon>
      </q-btn>
      -->

      <q-space></q-space>

      <q-btn icon="settings" label="Configuration" flat stack stretch no-caps push padding="sm" class="custom-toolbar-item"></q-btn>
      <q-btn icon="fas fa-palette" label="Themes" flat stack stretch no-caps push padding="sm" class="custom-toolbar-item"></q-btn>
      <q-btn icon="help_outline" label="Help ▼" flat stack stretch no-caps push padding="sm" class="custom-toolbar-item">
        <q-menu anchor="bottom right" self="top right" square class="bg-grey-3 non-selectable">
          <!--<q-item-label header>Header</q-item-label>-->
          <q-item clickable v-close-popup tabindex="0">
            <q-item-section>
              <q-item-label>Documentation</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="fas fa-book" color="grey-6" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup tabindex="0">
            <q-item-section>
              <q-item-label>Report Issue</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="bug_report" color="grey-6" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup tabindex="0">
            <q-item-section>
              <q-item-label>Check for Updates</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="update" color="grey-6" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup tabindex="0">
            <q-item-section>
              <q-item-label>About</q-item-label>
              <q-item-label caption>{{ productName }} v{{ version }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="grey-6" />
            </q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
      <q-separator inset spaced />
      <q-btn icon="swap_horiz" label="Switch Website" flat stack stretch no-caps push padding="sm" class="custom-toolbar-item" :to="{name: 'intro_index'}"></q-btn>
    </q-toolbar>
  <!--</div>-->
</template>

<script lang="ts">
import {
  defineComponent, ref, watch
} from 'vue'
import { useRouter } from 'vue-router'
import usePackageInfo from 'src/use/usePackageInfo'

export default defineComponent({
  name: 'MainToolBar',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:show'],
  setup (props, { emit }) {
    const router = useRouter()

    const { productName, version } = usePackageInfo()

    const show = ref(props.show)
    watch(show, (newValue) => {
      emit('update:show', newValue)
    })

    function closeWebsite () {
      void router.push({ name: 'index' })
    }

    return {
      closeWebsite,
      productName,
      version
    }
  }
})
</script>

<style scoped lang="scss">
.custom-toolbar-item {
  color: #7A7D84;
  font-weight: 400;
  // min-width: 70px !important;
}
</style>
