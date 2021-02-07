import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { PackageInfoStateInterface } from './state'

export type Getters = {
  // someAction(state: PackageInfoStateInterface): number
}

const getters: GetterTree<PackageInfoStateInterface, StateInterface> & Getters = {
  // someAction (/* state */) {
  //   // your code that returns a number
  // }
}

export default getters
