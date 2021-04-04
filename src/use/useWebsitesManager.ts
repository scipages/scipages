import { reactive, readonly } from 'vue'
import { WebsitePathItem } from 'src/types/WebsitePathItem'
import { WebsitePathList } from 'src/types/WebsitePathList'

const allWebsites: WebsitePathList = reactive({ items: [] })
const currentWebsite: WebsitePathItem = reactive({
  filename: null,
  path: null,
  title: null,
  uuid: null
})

export default function useWebsitesManager () {
  function initPathsSync () {
    // Create the websites and configuration directories
    window.myWebsitesManagerAPI.initPathsSync()

    // Initialize the websites list
    allWebsites.items = window.myWebsitesManagerAPI.getWebsitePathListSync()
    // for (let i = 0; i < allWebsites.items.length; i++) {
    //   console.log(`Website ${i}: ` + String(allWebsites.items[i].filename))
    //   console.log(`Website ${i}: ` + String(allWebsites.items[i].path))
    //   console.log(`Website ${i}: ` + String(allWebsites.items[i].title))
    //   console.log(`Website ${i}: ` + String(allWebsites.items[i].uuid))
    // }
  }

  function copyItem (item: WebsitePathItem) {
    const itemCopy: WebsitePathItem = {
      filename: item.filename,
      path: item.path,
      title: item.title,
      uuid: item.uuid
    }
    return itemCopy
  }

  function openWebsite (item: WebsitePathItem) {
    currentWebsite.filename = item.filename
    currentWebsite.path = item.path
    currentWebsite.title = item.title
    currentWebsite.uuid = item.uuid
    if (item.path !== null && item.filename !== null && item.title !== null && item.uuid !== null) {
      const itemCopy: WebsitePathItem = copyItem(item)
      window.myWebsitesManagerAPI.openWebsiteSync(itemCopy)
    }
  }
  function closeWebsite () {
    currentWebsite.filename = null
    currentWebsite.path = null
    currentWebsite.title = null
    currentWebsite.uuid = null
  }
  // function createWebsite () {
  //   // TODO
  // }
  function deleteWebsite (item: WebsitePathItem) {
    const itemCopy: WebsitePathItem = copyItem(item)
    return window.myWebsitesManagerAPI.deleteWebsite(itemCopy)
  }
  function exportWebsite (item: WebsitePathItem) {
    const itemCopy: WebsitePathItem = copyItem(item)
    return window.myWebsitesManagerAPI.exportWebsite(itemCopy)
  }

  return {
    initPathsSync,
    allWebsites: readonly(allWebsites),
    currentWebsite: readonly(currentWebsite),
    openWebsite,
    closeWebsite,
    deleteWebsite,
    exportWebsite
  }
}
