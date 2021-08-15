<template>
  <q-banner inline-actions rounded class="q-mb-md text-white" v-bind:class="notificationTypeClass">
    {{notification.message}}

    <template v-slot:action>
      <q-btn flat label="Dismiss" v-on:click="removeNotification(notification)" />
    </template>
  </q-banner>
</template>

<script lang="ts">
import type { PropType, ComputedRef } from 'vue'
import { defineComponent, ref, onBeforeUnmount, computed } from 'vue'
import useNotifications from 'src/use/useNotifications'
import { Notification } from 'src/store/module-notifications/state'

export default defineComponent({
  props: {
    notification: {
      type: Object as PropType<Notification>,
      required: true
    }
  },
  setup (props) {
    const { removeNotification } = useNotifications()

    const notificationTypeClass: ComputedRef<string> = computed(() => {
      const variant: string = (props.notification.type === 'error') ? 'negative' : props.notification.type
      return 'bg-' + variant
    })

    const timeout = ref(setTimeout(() => removeNotification(props.notification), 5000))

    // onMounted(() => {
    //   timeout.value = setTimeout(() => removeNotification(props.notification), 5000)
    // })
    onBeforeUnmount(() => {
      if (timeout.value !== null) {
        clearTimeout(timeout.value)
      }
    })

    return {
      notificationTypeClass,
      removeNotification
    }
  }
})
</script>
