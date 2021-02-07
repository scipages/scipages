<template>
  <div class="text-center">
    <p>
      <button v-on:click="addNotification(notificationFactory('test', 'test'))">
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
  defineComponent
} from 'vue'
import useNotifications from 'src/use/useNotifications'
import usePackageInfo from 'src/use/usePackageInfo'

export default defineComponent({
  name: 'VuexTestComponent',
  setup () {
    const { notifications, countNotifications, notificationFactory, addNotification, removeNotification } = useNotifications()
    const { name, productName, description, version } = usePackageInfo()
    return {
      notifications,
      countNotifications,
      notificationFactory,
      addNotification,
      removeNotification,
      name,
      productName,
      description,
      version
    }
  }
})
</script>
