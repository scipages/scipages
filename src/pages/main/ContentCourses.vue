<template>
  <div class="fit relative-position">
    <div class="q-pa-md">
      <div class="q-pa-md row items-center">
        <span class="col-6 text-left text-grey">
          {{  currentWebsite.title }}
        </span>
        <span class="col-6 text-right text-grey">
          {{ uuid }}
        </span>
      </div>

      <q-separator class="q-mx-md" />

      <div class="q-pa-md">
        <q-table
          :title="currentRouteMetaTitle"
          :rows="rows"
          :columns="columns"
          row-key="id"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          v-model:selected="selected"
          wrap-cells
          :pagination="initialPagination"
          hide-pagination
        >
          <template v-slot:top-right>
            <q-btn
              size="xs"
              icon="fas fa-plus-circle"
              color="green-5"
              text-color="white"
              class="q-mx-xs"
              label="New Course"
            />

            <!--<q-btn-dropdown-->
            <!--  size="xs"-->
            <!--  label="Actions"-->
            <!--  class="q-mx-xs"-->
            <!--  v-bind:disable-main-btn="selected.length === 0"-->
            <!--  v-bind:disable-dropdown="selected.length === 0"-->
            <!--&gt;-->
            <!--  <q-list>-->
            <!--    <q-item dense clickable label="Duplicate" v-close-popup>-->
            <!--      <q-item-section>-->
            <!--        <q-item-label>Duplicate</q-item-label>-->
            <!--      </q-item-section>-->
            <!--      <q-item-section side>-->
            <!--        <q-icon size="xs" name="fas fa-copy" color="grey-9" />-->
            <!--      </q-item-section>-->
            <!--    </q-item>-->
            <!--    <q-separator />-->
            <!--    <q-item dense clickable label="Publish" v-close-popup>-->
            <!--      <q-item-section>-->
            <!--        <q-item-label>Publish</q-item-label>-->
            <!--      </q-item-section>-->
            <!--      <q-item-section side>-->
            <!--        <q-icon size="xs" name="fas fa-check-circle" color="green-4" />-->
            <!--      </q-item-section>-->
            <!--    </q-item>-->
            <!--    <q-item dense clickable label="Unpublish" v-close-popup>-->
            <!--      <q-item-section>-->
            <!--        <q-item-label>Unpublish</q-item-label>-->
            <!--      </q-item-section>-->
            <!--      <q-item-section side>-->
            <!--        <q-icon size="xs" name="fas fa-minus-circle" color="red-4" />-->
            <!--      </q-item-section>-->
            <!--    </q-item>-->
            <!--    <q-separator />-->
            <!--    <q-item dense clickable label="Delete" v-close-popup>-->
            <!--      <q-item-section>-->
            <!--        <q-item-label>Delete</q-item-label>-->
            <!--      </q-item-section>-->
            <!--      <q-item-section side>-->
            <!--        <q-icon size="xs" name="far fa-trash-alt" color="red-4" />-->
            <!--      </q-item-section>-->
            <!--    </q-item>-->
            <!--  </q-list>-->
            <!--</q-btn-dropdown>-->

            <q-separator vertical class="q-mx-xs" />

            <q-btn-group
              push
              class="q-mx-xs"
            >
              <q-btn
                size="xs"
                icon="fas fa-check-circle"
                text-color="green-4"
                label="Publish"
                v-bind:disable="selected.length === 0"
              />
              <q-separator vertical />
              <q-btn
                size="xs"
                icon="fas fa-minus-circle"
                text-color="red-4"
                label="Unpublish"
                v-bind:disable="selected.length === 0"
              />
            </q-btn-group>

            <q-btn-group
              push
              class="q-mx-xs"
            >
              <q-btn
                size="xs"
                icon="fas fa-star"
                text-color="green-4"
                label="Display on Frontpage"
                v-bind:disable="selected.length === 0"
              />
              <q-separator vertical />
              <q-btn
                size="xs"
                icon="fas fa-star"
                text-color="grey"
                label="Hide from Frontpage"
                v-bind:disable="selected.length === 0"
              />
            </q-btn-group>

            <q-separator vertical class="q-mx-xs" />

            <q-btn-group
              push
              class="q-mx-xs"
            >
              <q-btn
                size="xs"
                icon="fas fa-copy"
                text-color="grey-9"
                label="Duplicate"
                v-bind:disable="selected.length === 0"
              />
              <q-separator vertical />
              <q-btn
                size="xs"
                icon="far fa-trash-alt"
                text-color="red-4"
                label="Delete"
                v-bind:disable="selected.length === 0"
              />
            </q-btn-group>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-checkbox v-model="props.selected"/>
              </q-td>
              <q-td key="enabled" :props="props">
                <q-icon v-if="props.row.enabled" size="xs" class="text-green-4" name="fas fa-check-circle" title="Published"/>
                <q-icon v-else size="xs" class="text-red-4" name="fas fa-minus-circle" title="Unpublished"/>
              </q-td>
              <q-td key="enabledFrontpage" :props="props">
                <q-icon v-if="props.row.enabledFrontpage" size="xs" class="text-green-4" name="fas fa-star" title="Displayed on Frontpage"/>
                <q-icon v-else size="xs" class="text-grey-4" name="fas fa-star" title="Hidden from Frontpage"/>
              </q-td>
              <q-td key="id" :props="props">
                {{ props.row.id.substring(0, 6) }}...
              </q-td>
              <q-td key="title" :props="props">
                <a class="custom_hyperlink">
                  {{ props.row.title }}
                </a>
              </q-td>
              <q-td key="role" :props="props">
                {{ props.row.role }}
              </q-td>
              <q-td key="semester" :props="props">
                {{ props.row.semester }}
              </q-td>
              <q-td key="semesterTaught" :props="props">
                {{ props.row.semesterTaught }}
              </q-td>
              <q-td key="organization" :props="props">
                {{ props.row.organization }}
              </q-td>
              <q-td key="department" :props="props">
                {{ props.row.department }}
              </q-td>
              <q-td key="dateCreated" :props="props">
                {{ getFormattedDate(props.row.dateCreated) }}
                <!--<br />-->
                <!--<span class="no_wrap">-->
                <!--  Last Modified: {{ getFormattedDate(props.row.dateCreated) }}-->
                <!--</span>-->
              </q-td>
              <q-td key="dateUpdated" :props="props">
                {{ getFormattedDate(props.row.dateUpdated) }}
              </q-td>
              <q-td auto-width>
                <q-btn-group push>
                  <q-btn
                    size="xs"
                    icon="fas fa-edit"
                  />
                  <q-separator vertical />
                  <q-btn
                    size="xs"
                    @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'"
                  />
                </q-btn-group>
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" key="id" :props="props">
              <q-td colspan="1">
              </q-td>
              <q-td colspan="100%">
                <div class="text-left">
                  Hyperlinks:
                  <span v-if="props.row.links.length > 0">
                    <q-btn
                      outline
                      no-caps
                      color="primary"
                      size="sm"
                      class="q-ma-xs"
                      v-for="(link) in props.row.links"
                      v-bind:key="link.id"
                      v-bind:label="link.title"
                      v-bind:icon="link.icon !== '' ? link.icon : 'fas fa-external-link-alt'"
                      v-on:click="openURL(link.url)"
                    >
                      <q-tooltip class="bg-primary">
                        {{ link.url }}
                      </q-tooltip>
                    </q-btn>
                  </span>
                  <span v-else>
                    None
                  </span>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div class="q-mt-md">
          Selected: {{ JSON.stringify(selected) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import useMainWindow from 'src/use/useMainWindow'
import useWebsitesManager from 'src/use/useWebsitesManager'
import useContentCourses from 'src/use/useContentCourses'
import { Course } from 'src/db/entities/Course'

const columns = [
  { name: 'enabled', align: 'center', label: 'Status', field: 'enabled', sortable: true },
  { name: 'enabledFrontpage', align: 'center', label: 'Frontpage', field: 'enabledFrontpage', sortable: true },
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    field: (row: Course) => row.id,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    format: (val: string) => `${val}`,
    sortable: true
  },
  { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
  { name: 'role', align: 'left', label: 'Role', field: 'role', sortable: true },
  { name: 'semester', align: 'center', label: 'Semester', field: 'semester', sortable: true },
  { name: 'semesterTaught', align: 'left', label: 'Semester Taught', field: 'semesterTaught', sortable: true },
  { name: 'organization', align: 'left', label: 'Organization', field: 'organization', sortable: true },
  { name: 'department', align: 'left', label: 'Department', field: 'department', sortable: true },
  { name: 'dateCreated', align: 'left', label: 'Created on', field: 'dateCreated', sortable: true },
  { name: 'dateUpdated', align: 'left', label: 'Updated on', field: 'dateUpdated', sortable: true },
  { name: 'controls', align: 'left', sortable: false }
]

const initialPagination = {
  sortBy: 'dateUpdated',
  descending: true,
  page: 1,
  rowsPerPage: 0
  // rowsNumber: xx if getting data from a server
}

export default defineComponent({
  name: 'PageMainCourses',
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  setup () {
    const { openURL } = useMainWindow()
    const currentRouteMetaTitle = computed(() => {
      return useRoute().meta.title
    })
    const { currentWebsite } = useWebsitesManager()
    const { allItems, getItems } = useContentCourses()
    getItems(currentWebsite)

    const selected = ref([])

    return {
      openURL,
      currentRouteMetaTitle,
      currentWebsite,

      initialPagination,

      selected,
      columns,
      rows: allItems,

      getFormattedDate (dateNum: number) {
        return new Date(dateNum).toLocaleString()
      },

      getSelectedString () {
        return selected.value.length === 0
          ? ''
          : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${allItems.value.length}`
      }
    }
  }
})
</script>

<style scoped lang="scss">
.no_wrap {
  white-space: nowrap;
}
.custom_hyperlink {
  text-decoration: underline;
  cursor: pointer;
}
.custom_hyperlink:hover {
  text-decoration: none;
}
</style>
