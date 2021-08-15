<template>
  <q-dialog
    v-model="showCopy"
    persistent
    transition-show="scale"
    transition-hide="scale"
    v-bind:no-esc-dismiss="isLoading"
    v-bind:no-backdrop-dismiss="isLoading"
    v-bind:no-route-dismiss="isLoading"
  >
    <q-card style="width: 400px">
      <q-card-section>
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="text-h6">{{ productName }} Update</div>
      </q-card-section>

      <q-card-section horizontal v-if="status === StatusEnum.NewerVersionExists">
        <q-card-section class="col-2">
          <q-avatar class="float-left on-left" icon="fas fa-download" color="positive" text-color="white"/>
        </q-card-section>
        <q-card-section>
          A new version of {{ productName }} is available.
          <br /><br />
          Current version: {{ currentVersion }}
          <br />
          Latest version: {{ latestVersion }}
          <br /><br />
          Do you want to download it?
        </q-card-section>
      </q-card-section>
      <q-card-section horizontal v-else-if="status === StatusEnum.NewerVersionDoesNotExist">
        <q-card-section class="col-2">
          <q-avatar class="float-left on-left" icon="fas fa-info" color="info" text-color="white"/>
        </q-card-section>
        <q-card-section>
          There are currently no updates available.
          <br />
          <a class="custom_hyperlink" v-on:click="openGithubReleases()">Go to the 'downloads' page</a>
          to manually check for new versions.
        </q-card-section>
      </q-card-section>
      <q-card-section horizontal v-else-if="status === StatusEnum.ErroredRequest && errors.has('fetchError')">
        <q-card-section class="col-2">
          <q-avatar class="float-left on-left" icon="fas fa-exclamation" color="negative" text-color="white" />
        </q-card-section>
        <q-card-section>
          {{ errors.get('fetchError') }}
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          flat
          label="Yes"
          color="positive"
          v-if="status === StatusEnum.NewerVersionExists"
          v-on:click.prevent="openGithubReleases()"
        />
        <q-btn
          flat
          :label="status === StatusEnum.NewerVersionExists ? 'No' : 'Cancel'"
          color="primary"
          v-on:click="close"
          v-bind:disabled=isLoading
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, ref, onMounted } from 'vue'
import usePackageInfo from 'src/use/usePackageInfo'
import useWindow from 'src/use/useWindow'
import useLoading from 'src/use/useLoading'
import LoadingComponent from 'src/components/LoadingComponent.vue'
import { Errors } from 'src/helpers/errors'
import semver from 'semver'

export default defineComponent({
  components: {
    LoadingComponent
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    'close',
    'success'
  ],
  setup (props, { emit }) {
    const { productName, version } = usePackageInfo()
    const { openURL } = useWindow()
    const { isLoading, startLoading, endLoading } = useLoading()

    const showCopy = ref(props.show)

    const errors = ref(new Errors())

    enum StatusEnum {
      Initial = 'INITIAL',
      Loading = 'LOADING',
      ErroredRequest = 'ERRORED_REQUEST',
      NewerVersionExists = 'NEWER_VERSION_EXISTS',
      NewerVersionDoesNotExist = 'NEWER_VERSION_DOES_NOT_EXIST'
    }
    const status: Ref<StatusEnum> = ref(StatusEnum.Initial)

    const currentVersion: Ref<string> = ref('v' + version.value)
    const latestVersion: Ref<string> = ref('')

    onMounted(() => {
      checkGithubReleasesForNewerVersion()
    })

    function checkGithubReleasesForNewerVersion () {
      status.value = StatusEnum.Loading
      errors.value.clear()
      startLoading()
      const url = 'https://github.com/scipages/scipages/releases/latest'
      fetch(url)
        .then((response) => {
          if (response.status === 200) {
            return Promise.resolve(response)
          } else {
            return Promise.reject(new Error(
              `Looks like there was a problem. Status Code: ${response.status}`
            ))
          }
        })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (!Object.prototype.hasOwnProperty.call(data, 'tag_name')) {
            return Promise.reject(new Error(
              'Did not receive proper response. \'tag_name\' member does not exist'
            ))
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          latestVersion.value = data.tag_name

          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          if (semver.gt(latestVersion.value, currentVersion.value)) {
            status.value = StatusEnum.NewerVersionExists
          } else {
            status.value = StatusEnum.NewerVersionDoesNotExist
          }
        })
        .catch((err) => {
          status.value = StatusEnum.ErroredRequest
          const validationErrors: Record<string, Array<string>> = {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            fetchError: [`Fetch Error: ${err}.`]
          }
          errors.value.record(validationErrors)
        })
        .finally(() => { endLoading() })
    }

    function openGithubReleases () {
      openURL('https://github.com/scipages/scipages/releases')
      close()
    }

    function close () {
      showCopy.value = false
      emit('close')
    }

    return {
      showCopy,
      isLoading,
      errors,
      close,
      openGithubReleases,
      status,
      StatusEnum,
      productName,
      currentVersion,
      latestVersion
    }
  }
})
</script>
