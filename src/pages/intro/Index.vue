<template>
  <div class="fit relative-position">
    <div class="q-pa-md">
      <p class="q-pa-md text-weight-bolder">
        Projects
        <q-separator />
      </p>

      <div class="q-px-md q-pb-xl text-weight-bolder text-right">
        <q-btn label="New Project" icon="fas fa-plus" text-color="green-8">
          <NewProjectMenu></NewProjectMenu>
        </q-btn>
      </div>

      <q-list class="non-selectable">

        <template
          v-for="(project) in allProjects.items" :key="project.filename"
        >

          <q-item>
            <q-item-section>
              <q-item-label>{{ project.title }}</q-item-label>
              <q-item-label caption lines="2">{{ project.uuid }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-btn-group push>
                <q-btn size="xs" label="Open" icon="fas fa-folder-open" v-on:click="openProjectAndNavigate(project)" />
                <q-separator vertical />
                <q-btn size="xs" label="Delete" icon="far fa-trash-alt" text-color="red-4" />
              </q-btn-group>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

        </template>

      </q-list>

      <br><br><br><br><br><br><br><br><br>
      <br><br><br><br><br><br><br><br><br>
      text
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
// import { useRouter, useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import useProjectManager, { ProjectPathItem } from 'src/use/useProjectManager'
import NewProjectMenu from 'components/projects/NewProjectMenu.vue'

export default defineComponent({
  name: 'PageIntroIndex',
  components: {
    NewProjectMenu
  },
  setup () {
    const router = useRouter()
    // const route = useRoute()
    const { allProjects, openProject, closeProject, initPaths } = useProjectManager()

    onMounted(() => {
      closeProject()
      initPaths()
    })

    function openProjectAndNavigate (project: ProjectPathItem) {
      openProject(project)

      if (project.filename === null || project.path === null || project.title === null || project.uuid === null) {
        return
      }

      void router.push({
        name: 'main_index',
        params: {
          uuid: project.uuid
        }
      })
    }

    return {
      allProjects,
      openProjectAndNavigate
    }
  }
})
</script>
