import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { PackageInfoStateInterface } from './state'

const actions: ActionTree<PackageInfoStateInterface, StateInterface> = {
  setName ({ commit }, name: string) {
    commit('SET_NAME', name)
  },
  setProductName ({ commit }, productName: string) {
    commit('SET_PRODUCT_NAME', productName)
  },
  setDescription ({ commit }, description: string) {
    commit('SET_DESCRIPTION', description)
  },
  setVersion ({ commit }, version: string) {
    commit('SET_VERSION', version)
  }
}

export default actions
