import { MutationTree } from 'vuex'
import { PackageInfoStateInterface } from './state'

const mutation: MutationTree<PackageInfoStateInterface> = {
  SET_NAME (state: PackageInfoStateInterface, name: string) {
    state.name = name
  },
  SET_PRODUCT_NAME (state: PackageInfoStateInterface, productName: string) {
    state.productName = productName
  },
  SET_DESCRIPTION (state: PackageInfoStateInterface, description: string) {
    state.description = description
  },
  SET_VERSION (state: PackageInfoStateInterface, version: string) {
    state.version = version
  }
}

export default mutation
