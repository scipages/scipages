import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { NotificationsStateInterface, Notification } from './state'

const actions: ActionTree<NotificationsStateInterface, StateInterface> = {
  add ({ commit }, notification: Notification) {
    commit('PUSH', notification)
  },
  remove ({ commit }, notificationToRemove: Notification) {
    commit('DELETE', notificationToRemove)
  }
}

export default actions
