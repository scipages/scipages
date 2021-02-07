import { MutationTree } from 'vuex'
import { NotificationsStateInterface, Notification } from './state'

export enum NotificationsMutationTypes {
  // eslint-disable-next-line no-unused-vars
  PUSH = 'PUSH',
  // eslint-disable-next-line no-unused-vars
  DELETE = 'DELETE'
}

export type Mutations<S = NotificationsStateInterface> = {
  [NotificationsMutationTypes.PUSH] (state: S, payload: Notification): void,
  [NotificationsMutationTypes.DELETE] (state: S, payload: Notification): void
}

let nextId = 1

const mutations: MutationTree<NotificationsStateInterface> & Mutations = {
  [NotificationsMutationTypes.PUSH] (state: NotificationsStateInterface, notification: Notification) {
    notification.id = nextId++
    state.notifications.push(notification)
  },
  [NotificationsMutationTypes.DELETE] (state: NotificationsStateInterface, notificationToRemove: Notification) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    )
  }
}

export default mutations
