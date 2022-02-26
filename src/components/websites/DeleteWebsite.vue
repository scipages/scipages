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
    <q-card>
      <q-card-section>
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div v-if="itemCopy!=null">
          <q-avatar class="float-left on-left" icon="far fa-trash-alt" color="negative" text-color="white" />
          <span>
            You are about to delete the website
            <strong>{{ itemCopy.title }}</strong>.
            Do you really want to delete this website?
            This action cannot be undone.
          </span>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-on:click="close" v-bind:disabled=isLoading />
        <q-btn flat label="Permanently Delete" color="negative" v-on:click.prevent="deleteItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { WebsitePathItem } from 'app/src-common/types/WebsitePathItem'
import useWebsitesManager from 'src/use/useWebsitesManager'
import useNotifications from 'src/use/useNotifications'
import useLoading from 'src/use/useLoading'
import LoadingComponent from 'src/components/LoadingComponent.vue'
import { Errors } from 'src/helpers/errors'
import _ from 'lodash'

export default defineComponent({
  components: {
    LoadingComponent
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object as PropType<WebsitePathItem>,
      required: true
    }
  },
  emits: [
    'close',
    'success'
  ],
  setup (props, { emit }) {
    const { deleteWebsite } = useWebsitesManager()
    const { addNotification, notificationFactory } = useNotifications()
    const { isLoading, startLoading, endLoading } = useLoading()

    const showCopy = ref(props.show)
    const itemCopy = ref(_.cloneDeep(props.item))

    const errors = ref(new Errors())

    function deleteItem () {
      errors.value.clear()
      startLoading()
      deleteWebsite(itemCopy.value)
        .then(response => {
          console.log(response)
          close()
          emit('success')
        })
        .catch(error => {
          console.log(error)
          // errors.value.record(error)
          close()
          addNotification(
            notificationFactory('error', error as string)
          )
        })
        .finally(() => { endLoading() })
    }

    function close () {
      showCopy.value = false
      emit('close')
    }

    return {
      showCopy,
      itemCopy,
      isLoading,
      errors,
      deleteItem,
      close
    }
  }
})
</script>
