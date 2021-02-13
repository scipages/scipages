import {
  computed
} from 'vue'
import { useStore } from 'vuex'
import { name, productName, description, version } from '../../package.json'

export default function usePackageInfo () {
  const store = useStore()

  function setPackageInfo () {
    const name1: string = name
    const productName1: string = productName
    const description1: string = description
    const version1: string = version
    void store.dispatch('packageInfo/setName', name1, { root: true })
    void store.dispatch('packageInfo/setProductName', productName1, { root: true })
    void store.dispatch('packageInfo/setDescription', description1, { root: true })
    void store.dispatch('packageInfo/setVersion', version1, { root: true })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  const name2 = computed(() => store.state.packageInfo.name)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  const productName2 = computed(() => store.state.packageInfo.productName)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  const description2 = computed(() => store.state.packageInfo.description)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  const version2 = computed(() => store.state.packageInfo.version)

  return {
    setPackageInfo,
    name: name2,
    productName: productName2,
    description: description2,
    version: version2
  }
}
