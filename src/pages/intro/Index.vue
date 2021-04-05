<template>

  <LoadingComponent v-if="isLoading"></LoadingComponent>

  <WebsiteDelete
    v-if="deleteWebsiteShow"
    v-bind:show="deleteWebsiteShow"
    v-bind:item="deleteWebsiteItem"
    v-on:close="deleteWebsiteShow=false"
    v-on:success="onDeleteWebsiteSuccess"
  ></WebsiteDelete>

  <div class="fit websites-list-page-wrapper">
    <div class="row q-pr-xl q-pt-xl ">
      <div class="col-6 text-weight-bolder">Websites</div>
      <div class="col-6 text-right">
        <q-btn round flat size="7px" padding="5px" text-color="grey-8" icon="fas fa-redo-alt" v-on:click="closeWebsiteInitPaths" />
      </div>
    </div>

    <div class="q-pr-xl">
      <q-separator />
    </div>

    <div class="q-pr-xl q-py-md text-weight-bolder text-right">
      <q-btn label="New Website" icon="fas fa-plus" text-color="green-8">
        <NewWebsiteMenu
          v-on:import-website-clicked="onImportWebsiteClick"
        ></NewWebsiteMenu>
      </q-btn>
    </div>
    <div class="q-pr-xl q-pb-xl row row-flex-1">
      <div class="full-width q-pa-md row-flex-1-border-box">
        <q-scroll-area class="full-width full-height q-pa-md">

          <div
            v-if="allWebsites.items.length === 0"
            class="text-center"
          >
            ...
          </div>

          <q-list
            v-else
            class="non-selectable"
          >
            <transition-group name="list" type="transition">
              <div
                v-for="(website) in allWebsites.items" :key="website.uuid"
              >

                <q-item>
                  <q-item-section>
                    <q-item-label class="text-weight-bold text-primary">
                      {{ website.title }}
                    </q-item-label>
                    <q-item-label caption lines="2">{{ website.uuid }}</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-btn-group push>
                      <q-btn size="xs" label="Open" icon="fas fa-folder-open" v-on:click="openWebsiteAndNavigate(website)" />
                      <q-separator vertical />
                      <q-btn-dropdown size="xs">
                        <q-list>
                          <q-item dense clickable label="Permanently Delete" v-close-popup v-on:click="deleteWebsite(website)">
                            <q-item-section>
                              <q-item-label>Permanently Delete</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-icon size="xs" name="far fa-trash-alt" color="red-4" />
                            </q-item-section>
                          </q-item>
                          <q-item dense clickable label="Export ZIP File" v-close-popup v-on:click="onExportWebsiteClick(website)">
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

              </div>
            </transition-group>
          </q-list>

        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
// import { useRouter, useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import useWebsitesManager from 'src/use/useWebsitesManager'
import useNotifications from 'src/use/useNotifications'
import useLoading from 'src/use/useLoading'
import { WebsitePathItem } from 'src/types/WebsitePathItem'
import NewWebsiteMenu from 'components/websites/NewWebsiteMenu.vue'
import WebsiteDelete from 'components/websites/WebsiteDelete.vue'
import LoadingComponent from 'src/components/LoadingComponent.vue'

export default defineComponent({
  name: 'PageIntroIndex',
  components: {
    NewWebsiteMenu,
    WebsiteDelete,
    LoadingComponent
  },
  setup () {
    const router = useRouter()
    // const route = useRoute()
    const { allWebsites, openWebsite, closeWebsite, initPathsSync, exportWebsite, importWebsite } = useWebsitesManager()
    const { notificationFactory, addNotification } = useNotifications()
    const { startLoading, endLoading, isLoading } = useLoading()

    onMounted(() => {
      closeWebsiteInitPaths()
    })

    function closeWebsiteInitPaths () {
      closeWebsite()
      initPathsSync()
    }

    function openWebsiteAndNavigate (website: WebsitePathItem) {
      openWebsite(website)

      if (website.filename === null || website.path === null || website.title === null || website.uuid === null) {
        return
      }

      void router.push({
        name: 'main_index',
        params: {
          uuid: website.uuid
        }
      })
    }

    const deleteWebsiteShow = ref<boolean>(false)
    const deleteWebsiteItem = ref<WebsitePathItem|null>(null)
    function deleteWebsite (website: WebsitePathItem) {
      deleteWebsiteShow.value = true
      deleteWebsiteItem.value = website
    }
    function onDeleteWebsiteSuccess () {
      closeWebsiteInitPaths()
    }

    function onExportWebsiteClick (website: WebsitePathItem) {
      startLoading()
      exportWebsite(website)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          addNotification(
            notificationFactory('error', error)
          )
        })
        .finally(() => { endLoading() })
    }

    function onImportWebsiteClick () {
      startLoading()
      importWebsite()
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          addNotification(
            notificationFactory('error', error)
          )
        })
        .finally(() => {
          initPathsSync()
          endLoading()
        })
    }

    return {
      allWebsites,
      openWebsiteAndNavigate,
      closeWebsiteInitPaths,
      deleteWebsiteShow,
      deleteWebsiteItem,
      deleteWebsite,
      onDeleteWebsiteSuccess,
      onExportWebsiteClick,
      onImportWebsiteClick,
      isLoading
    }
  }
})
</script>

<style scoped lang="scss">
.websites-list-page-wrapper {
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

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  // transform: translateY(30px);
  transform: scale(0.1, 0.1);
}
</style>
