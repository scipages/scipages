import {
  computed
} from 'vue'
// import { useStore } from 'vuex'
import { useStore } from 'src/store'
import { packageInfo } from 'src/helpers/packageInfo'

export default function usePackageInfo () {
  const store = useStore()

  function setPackageInfo () {
    void store.dispatch('packageInfo/setName', packageInfo.name, { root: true })
    void store.dispatch('packageInfo/setProductName', packageInfo.productName, { root: true })
    void store.dispatch('packageInfo/setDescription', packageInfo.description, { root: true })
    void store.dispatch('packageInfo/setVersion', packageInfo.version, { root: true })
  }

  const name2 = computed(() => store.state.packageInfo.name)
  const productName2 = computed(() => store.state.packageInfo.productName)
  const description2 = computed(() => store.state.packageInfo.description)
  const version2 = computed(() => store.state.packageInfo.version)

  return {
    setPackageInfo,
    name: name2,
    productName: productName2,
    description: description2,
    version: version2
  }
}
