import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { PackageInfoStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const packageInfoModule: Module<PackageInfoStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default packageInfoModule
