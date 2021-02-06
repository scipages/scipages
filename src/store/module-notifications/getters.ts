import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { NotificationsStateInterface } from './state'

const getters: GetterTree<NotificationsStateInterface, StateInterface> = {
  count (context) {
    return context.notifications.length
  }
}

export default getters
