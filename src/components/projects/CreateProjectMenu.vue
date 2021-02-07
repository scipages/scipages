<template>
  <q-menu>
    <q-list style="min-width: 100px">
      <q-item clickable v-close-popup v-on:click="showPrompt = true">
        <q-item-section>New Empty Website</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section>New Personal Website</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section>New Research Lab Website</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section>New Course Website</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section>New Conference/Workshop Website</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section>Import from Git Repository</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
  <q-dialog v-model="showPrompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create New Website</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="title" autofocus v-on:keyup.enter="showPrompt = false" label="Title" />
      </q-card-section>

      <!--
      <q-card-section class="q-pt-none">
        <q-input dense v-model="id" autofocus label="ID (auto-generated)" disable />
      </q-card-section>
      -->

      <!-- TODO: Git options will be added here (Credentials, Repository selection)  -->

      <q-card-section class="q-pt-none">
        <q-select v-model="themeValue" :options="themeOptions" label="Theme" hint="* Can be changed later">
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Ok" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'

export default defineComponent({
  name: 'CreateProjectMenu',
  setup () {
    const showPrompt = ref(false)
    const title = ref('')
    const themeValue = ref('')
    const themeOptions = ref([
      {
        label: 'Al-Folio',
        value: 'alfolio',
        description: 'Based on https://github.com/alshedivat/al-folio'
      },
      {
        label: 'Mono-Researcher',
        value: 'monoresearcher',
        description: 'Based on https://github.com/ojroques/hugo-researcher'
      }
    ])

    return {
      showPrompt,
      title,
      themeValue,
      themeOptions
    }
  }
})
</script>
