import {
  computed,
  ComputedRef
} from 'vue'
import { Notification } from 'src/store/module-notifications/state'
// import { useStore } from 'vuex'
import { useStore } from 'src/store'

export default function useNotifications () {
  const store = useStore()

  const notifications: ComputedRef<Array<Notification>> = computed(() => store.state.notifications.notifications)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  const countNotifications: ComputedRef<number> = computed(() => store.getters['notifications/count'])

  function notificationFactory (type: string, message: string): Notification {
    return {
      id: 0,
      type: type,
      message: message
    }
  }
  function addNotification (notification: Notification) {
    void store.dispatch('notifications/add', notification, { root: true })
  }
  function removeNotification (notification: Notification) {
    void store.dispatch('notifications/remove', notification, { root: true })
  }
  function clearNotifications () {
    for (const notification of notifications.value) {
      void store.dispatch('notifications/remove', notification, { root: true })
    }
  }

  return {
    notifications,
    countNotifications,
    notificationFactory,
    addNotification,
    removeNotification,
    clearNotifications
  }
}
