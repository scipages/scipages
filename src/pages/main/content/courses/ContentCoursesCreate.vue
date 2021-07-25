<template>
  <LoadingComponent v-if="isLoading"></LoadingComponent>

  <div class="q-pa-md">
    <q-card class="q-pa-md" style="min-width: 350px">
      <q-btn
        size="sm"
        icon="fas fa-edit"
        color="green-5"
        text-color="white"
        class="q-ma-xs"
        label="Save"
        v-on:click="onCreateClick(false)"
      />
      <q-btn
        size="sm"
        icon="fas fa-check"
        text-color="green-4"
        class="q-ma-xs"
        label="Save & Close"
        v-on:click="onCreateClick(true)"
      />
      <q-btn
        size="sm"
        icon="fas fa-times-circle"
        text-color="red-4"
        class="q-ma-xs"
        label="Cancel"
        :to="{name: 'main_courses_index', params: { uuid: uuid }}"
      />
    </q-card>

    <q-card class="q-mt-lg" style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create New Course</div>
      </q-card-section>

      <q-card-section class="q-pt-none">

        <div class="row">
          <div class="col-12 col-md-8">

            <q-input
              class="q-ma-sm"
              outlined
              filled
              v-model="newItem.title"
              autofocus
              stack-label
              label="Title*"
              placeholder="eg. 'Introduction to Computer Science'"
              :error-message="errors.has('title') ? errors.get('title') : ''"
              :error="errors.has('title')"
              v-on:keydown="errors.clear('title')"
            />
            <q-input
              class="q-ma-sm"
              outlined
              filled
              v-model="newItem.role"
              stack-label
              label="Role"
              placeholder="eg. 'Teaching Assistant'"
              :error-message="errors.has('role') ? errors.get('role') : ''"
              :error="errors.has('role')"
              v-on:keydown="errors.clear('role')"
            />
            <div class="row">
              <div class="col-4">
                <q-input
                  class="q-ma-sm"
                  outlined
                  filled
                  v-model="newItem.semester"
                  stack-label
                  label="Semester*"
                  :error-message="errors.has('semester') ? errors.get('semester') : ''"
                  :error="errors.has('semester')"
                  v-on:keydown="errors.clear('semester')"
                  type="number"
                  :rules="[
                    val => val !== null && val !== '' || 'Please type a valid semester',
                    val => val >= 0 && val < 100 || 'Please type a valid semester'
                  ]"
                  min="0"
                  max="100"
                />
              </div>
              <div class="col-8">
                <q-input
                  class="q-ma-sm"
                  outlined
                  filled
                  v-model="newItem.semesterTaught"
                  stack-label
                  label="Semester(s) Taught*"
                  placeholder="eg. 'Spring 2018, Fall 2019'"
                  :error-message="errors.has('semesterTaught') ? errors.get('semesterTaught') : ''"
                  :error="errors.has('semesterTaught')"
                  v-on:keydown="errors.clear('semesterTaught')"
                />
              </div>
            </div>
            <q-input
              class="q-ma-sm"
              outlined
              filled
              v-model="newItem.organization"
              stack-label
              label="Organization*"
              placeholder="eg. 'University of Peloponnese'"
              :error-message="errors.has('organization') ? errors.get('organization') : ''"
              :error="errors.has('organization')"
              v-on:keydown="errors.clear('organization')"
            />
            <q-input
              class="q-ma-sm"
              outlined
              filled
              v-model="newItem.department"
              stack-label
              label="Department"
              placeholder="eg. 'Department of Computer Science'"
              :error-message="errors.has('department') ? errors.get('department') : ''"
              :error="errors.has('department')"
              v-on:keydown="errors.clear('department')"
            />
          </div>
          <div class="col-12 col-md-4">
            <div class="q-pa-md q-gutter-y-sm column">
              <q-toggle
                class="q-ma-sm"
                v-model="newItem.enabled"
                :label="'Status: ' + (newItem.enabled ? 'Published' : 'Unpublished')"
              />
              <q-toggle
                class="q-ma-sm"
                v-model="newItem.enabledFrontpage"
                :label="'Featured in the Frontpage: ' + (newItem.enabledFrontpage ? 'Yes' : 'No')"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, reactive, ref } from 'vue'
import useWebsitesManager from 'src/use/useWebsitesManager'
import useContentCourses from 'src/use/content/useContentCourses'
import { Course } from 'app/src-common/entities/Course'
import { PostRequestResult } from 'app/src-common/types/PostRequestResult'
import useNotifications from 'src/use/useNotifications'
import useLoading from 'src/use/useLoading'
import LoadingComponent from 'src/components/LoadingComponent.vue'
import { Errors } from 'src/helpers/errors'

export default defineComponent({
  components: {
    LoadingComponent
  },
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const router = useRouter()
    const { currentWebsite } = useWebsitesManager()
    const { createItem } = useContentCourses()
    const { notificationFactory, addNotification } = useNotifications()
    const { startLoading, endLoading, isLoading } = useLoading()

    const errors = ref(new Errors())

    const newItem = reactive<Course>({
      id: '',
      title: '',
      role: '',
      semester: 0,
      semesterTaught: '',
      organization: '',
      department: '',
      links: [],
      enabled: true,
      enabledFrontpage: true,
      dateCreated: new Date(),
      dateUpdated: new Date()
    })

    function onCreateClick (close = false) {
      errors.value.clear()
      startLoading()
      createItem(currentWebsite, newItem)
        .then((response: PostRequestResult) => {
          if (!response.status) {
            if (
              Object.prototype.hasOwnProperty.call(response, 'validationErrors') &&
              typeof response.validationErrors !== 'undefined'
            ) {
              errors.value.record(response.validationErrors)
            } else {
              addNotification(
                notificationFactory('error', response.message)
              )
            }
            return
          }
          if (close) {
            void router.push({
              name: 'main_courses_index',
              params: {
                uuid: props.uuid
              }
            })
            // return
          }
          // void router.push({
          //   name: 'main_courses_update',
          //   params: {
          //     uuid: props.uuid,
          //     id: response.affectedId
          //   }
          // })
        })
        // .catch(error => {
        //   console.log(error)
        //   addNotification(
        //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        //     notificationFactory('error', error)
        //   )
        // })
        .finally(() => {
          endLoading()
        })
    }

    return {
      newItem,
      onCreateClick,
      isLoading,
      errors
    }
  }
})
</script>

<style scoped lang="scss">
</style>
