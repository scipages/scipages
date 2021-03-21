import { ActionContext, ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { NotificationsStateInterface, Notification } from './state'
import { Mutations, NotificationsMutationTypes } from './mutations'

export enum NotificationsActionTypes {
  ADD = 'add',
  REMOVE = 'remove'
}

type ActionAugments = Omit<ActionContext<NotificationsStateInterface, NotificationsStateInterface>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export interface Actions {
  [NotificationsActionTypes.ADD](context: ActionAugments): void,
  [NotificationsActionTypes.REMOVE](context: ActionAugments): void
}

const actions: ActionTree<NotificationsStateInterface, StateInterface> = {
  [NotificationsActionTypes.ADD] ({ commit }, notification: Notification) {
    commit(NotificationsMutationTypes.PUSH, notification)
  },
  [NotificationsActionTypes.REMOVE] ({ commit }, notificationToRemove: Notification) {
    commit(NotificationsMutationTypes.DELETE, notificationToRemove)
  }
}

export default actions
