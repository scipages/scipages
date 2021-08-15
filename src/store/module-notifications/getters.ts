import type { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { NotificationsStateInterface } from './state'

export type Getters = {
  count(state: NotificationsStateInterface): number
}

const getters: GetterTree<NotificationsStateInterface, StateInterface> & Getters = {
  count (state) {
    return state.notifications.length
  }
}

export default getters
