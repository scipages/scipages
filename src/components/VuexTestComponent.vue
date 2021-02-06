<template>
  <div class="text-center">
    <p>
      <button v-on:click="showNotification('test', 'test')">
        Add Notification
      </button>
    </p>
    <p>Count: {{ countNotifications }}</p>
    <p
      v-for="(notification) in notifications" :key="notification.id"
    >
      {{ notification.type }} - {{ notification.message }}
    </p>
    <p>
      -------------------
    </p>
    <p>
      {{ name }} - {{ productName }} - {{ description }} - {{ version }}
    </p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed
} from 'vue'
import { Notification } from './../store/module-notifications/state'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'VuexTestComponent',
  setup () {
    const store = useStore()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const notifications = computed(() => store.state.notifications.notifications)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const countNotifications = computed(() => store.getters['notifications/count'])

    function showNotification (type: string, message: string) {
      const notification: Notification = {
        id: 0,
        type: type,
        message: message
      }
      void store.dispatch('notifications/add', notification, { root: true })
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const name = computed(() => store.state.packageInfo.name)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const productName = computed(() => store.state.packageInfo.productName)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const description = computed(() => store.state.packageInfo.description)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const version = computed(() => store.state.packageInfo.version)

    return {
      notifications,
      countNotifications,
      showNotification,
      name,
      productName,
      description,
      version
    }
  }
})
</script>
