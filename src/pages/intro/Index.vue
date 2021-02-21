<template>
  <div class="fit projects-list-page-wrapper">
    <div class="q-pr-xl q-pt-xl text-weight-bolder">
      Projects
      <q-separator />
    </div>
    <div class="q-pr-xl q-py-md text-weight-bolder text-right">
      <q-btn label="New Project" icon="fas fa-plus" text-color="green-8">
        <NewProjectMenu></NewProjectMenu>
      </q-btn>
    </div>
    <div class="q-pr-xl q-pb-xl row row-flex-1">
      <div class="full-width q-pa-md row-flex-1-border-box">
        <q-scroll-area class="full-width full-height q-pa-md">

          <div
            v-if="allProjects.items.length == 0"
            class="text-center"
          >
            ...
          </div>

          <q-list
            v-else
            class="non-selectable"
          >
            <template
              v-for="(project) in allProjects.items" :key="project.filename"
            >

              <q-item>
                <q-item-section>
                  <q-item-label class="text-weight-bold text-primary">
                    {{ project.title }}
                  </q-item-label>
                  <q-item-label caption lines="2">{{ project.uuid }}</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>5 min ago</q-item-label>
                  <q-btn-group push>
                    <q-btn size="xs" label="Open" icon="fas fa-folder-open" v-on:click="openProjectAndNavigate(project)" />
                    <q-separator vertical />
                    <q-btn-dropdown size="xs">
                      <q-list>
                        <q-item dense clickable v-close-popup label="Permanently Delete" v-on:click="onItemClick">
                          <q-item-section>
                            <q-item-label>Permanently Delete</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-icon size="xs" name="far fa-trash-alt" color="red-4" />
                          </q-item-section>
                        </q-item>
                        <q-item dense clickable v-close-popup label="Export ZIP File" v-on:click="onItemClick">
                          <q-item-section>
                            <q-item-label>Export to Zip File</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-icon size="xs" name="far fa-file-archive" color="grey-9" />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </q-btn-group>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

            </template>
          </q-list>

          <br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br>
          text
        </q-scroll-area>
      </div>
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

<style scoped lang="scss">
.projects-list-page-wrapper {
  display: flex;
  flex-direction: column;

  .row-flex-1 {
    flex: 1;

    .row-flex-1-border-box {
      border-radius: 15px;
      border: 1px solid #cbcbcb;
    }
  }
}
</style>
