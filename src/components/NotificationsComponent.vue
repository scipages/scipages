<template>
  <q-dialog
    v-model="show"
    position="bottom"
    no-esc-dismiss
    no-backdrop-dismiss
    no-route-dismiss
  >
    <q-card>
      <q-card-section>
        <NotificationComponent
          v-for="(notification) in notifications" :key="notification.id"
          v-bind:notification="notification"
        >
        </NotificationComponent>
      </q-card-section>
      <q-card-actions align="right" v-if="countNotifications > 1">
        <q-btn flat label="Dismiss All" color="primary" v-on:click="clearNotifications" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import NotificationComponent from './NotificationComponent.vue'
import useNotifications from 'src/use/useNotifications'

export default defineComponent({
  components: {
    NotificationComponent
  },
  setup () {
    const { notifications, countNotifications, clearNotifications } = useNotifications()

    const show = computed<boolean>(() => {
      return countNotifications.value > 0
    })

    return {
      notifications,
      countNotifications,
      clearNotifications,
      show
    }
  }
})
</script>
