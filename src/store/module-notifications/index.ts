import type { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { NotificationsStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const notificationsModule: Module<NotificationsStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default notificationsModule
