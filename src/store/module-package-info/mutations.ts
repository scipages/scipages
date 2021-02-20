import { MutationTree } from 'vuex'
import { PackageInfoStateInterface } from './state'

export enum PackageInfoMutationTypes {
  SET_NAME = 'SET_NAME',
  SET_PRODUCT_NAME = 'SET_PRODUCT_NAME',
  SET_DESCRIPTION = 'SET_DESCRIPTION',
  SET_VERSION = 'SET_VERSION'
}

export type Mutations<S = PackageInfoStateInterface> = {
  [PackageInfoMutationTypes.SET_NAME] (state: S, payload: string): void,
  [PackageInfoMutationTypes.SET_PRODUCT_NAME] (state: S, payload: string): void,
  [PackageInfoMutationTypes.SET_DESCRIPTION] (state: S, payload: string): void,
  [PackageInfoMutationTypes.SET_VERSION] (state: S, payload: string): void
}

const mutations: MutationTree<PackageInfoStateInterface> = {
  [PackageInfoMutationTypes.SET_NAME] (state: PackageInfoStateInterface, name: string) {
    state.name = name
  },
  [PackageInfoMutationTypes.SET_PRODUCT_NAME] (state: PackageInfoStateInterface, productName: string) {
    state.productName = productName
  },
  [PackageInfoMutationTypes.SET_DESCRIPTION] (state: PackageInfoStateInterface, description: string) {
    state.description = description
  },
  [PackageInfoMutationTypes.SET_VERSION] (state: PackageInfoStateInterface, version: string) {
    state.version = version
  }
}

export default mutations
