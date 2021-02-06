import { MutationTree } from 'vuex'
import { NotificationsStateInterface, Notification } from './state'

let nextId = 1

const mutation: MutationTree<NotificationsStateInterface> = {
  PUSH (state: NotificationsStateInterface, notification: Notification) {
    notification.id = nextId++
    state.notifications.push(notification)
  },
  DELETE (state: NotificationsStateInterface, notificationToRemove: Notification) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    )
  }
}

export default mutation
