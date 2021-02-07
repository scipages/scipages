import { ActionContext, ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { PackageInfoStateInterface } from './state'
import { Mutations, PackageInfoMutationTypes } from './mutations'

export enum PackageInfoActionTypes {
  // eslint-disable-next-line no-unused-vars
  SET_NAME = 'setName',
  // eslint-disable-next-line no-unused-vars
  SET_PRODUCT_NAME = 'setProductName',
  // eslint-disable-next-line no-unused-vars
  SET_DESCRIPTION = 'setDescription',
  // eslint-disable-next-line no-unused-vars
  SET_VERSION = 'setVersion'
}

type ActionAugments = Omit<ActionContext<PackageInfoStateInterface, PackageInfoStateInterface>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export interface Actions {
  [PackageInfoActionTypes.SET_NAME](context: ActionAugments): void,
  [PackageInfoActionTypes.SET_PRODUCT_NAME](context: ActionAugments): void,
  [PackageInfoActionTypes.SET_DESCRIPTION](context: ActionAugments): void,
  [PackageInfoActionTypes.SET_VERSION](context: ActionAugments): void
}

const actions: ActionTree<PackageInfoStateInterface, StateInterface> = {
  [PackageInfoActionTypes.SET_NAME] ({ commit }, name: string) {
    commit(PackageInfoMutationTypes.SET_NAME, name)
  },
  [PackageInfoActionTypes.SET_PRODUCT_NAME] ({ commit }, productName: string) {
    commit(PackageInfoMutationTypes.SET_PRODUCT_NAME, productName)
  },
  [PackageInfoActionTypes.SET_DESCRIPTION] ({ commit }, description: string) {
    commit(PackageInfoMutationTypes.SET_DESCRIPTION, description)
  },
  [PackageInfoActionTypes.SET_VERSION] ({ commit }, version: string) {
    commit(PackageInfoMutationTypes.SET_VERSION, version)
  }
}

export default actions
