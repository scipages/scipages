import { reactive, readonly } from 'vue'
import { WebsitePathItem } from 'app/src-common/types/WebsitePathItem'
import { WebsitePathList } from 'app/src-common/types/WebsitePathList'
import { ConfigurationThemeEnum } from '@scipages/gen/lib/entities/Configuration'
import { NewWebsiteTypeEnum } from 'app/src-common/enums/NewWebsiteTypeEnum'

const allWebsites: WebsitePathList = reactive({ items: [] })
const currentWebsite: WebsitePathItem = reactive({
  filename: null,
  path: null,
  title: null,
  uuid: null,
  dateModified: null
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
      uuid: item.uuid,
      dateModified: item.dateModified
    }
    return itemCopy
  }

  function openWebsite (item: WebsitePathItem) {
    currentWebsite.filename = item.filename
    currentWebsite.path = item.path
    currentWebsite.title = item.title
    currentWebsite.uuid = item.uuid
    currentWebsite.dateModified = item.dateModified
    if (item.path !== null && item.filename !== null && item.title !== null && item.uuid !== null && item.dateModified !== null) {
      const itemCopy: WebsitePathItem = copyItem(item)
      window.myWebsitesManagerAPI.openWebsiteSync(itemCopy)
    }
  }
  function closeWebsite () {
    currentWebsite.filename = null
    currentWebsite.path = null
    currentWebsite.title = null
    currentWebsite.uuid = null
    currentWebsite.dateModified = null
  }
  function createWebsite (
    title: string,
    theme: ConfigurationThemeEnum,
    websiteType: NewWebsiteTypeEnum,
    websiteSinglePage: boolean
  ) {
    return window.myWebsitesManagerAPI.createWebsite(
      title,
      theme,
      websiteType,
      websiteSinglePage
    )
  }
  function deleteWebsite (item: WebsitePathItem) {
    const itemCopy: WebsitePathItem = copyItem(item)
    return window.myWebsitesManagerAPI.deleteWebsite(itemCopy)
  }
  function exportWebsite (item: WebsitePathItem) {
    const itemCopy: WebsitePathItem = copyItem(item)
    return window.myWebsitesManagerAPI.exportWebsite(itemCopy)
  }
  function importWebsite () {
    return window.myWebsitesManagerAPI.importWebsite()
  }

  return {
    initPathsSync,
    allWebsites: readonly(allWebsites),
    currentWebsite: readonly(currentWebsite),
    openWebsite,
    closeWebsite,
    createWebsite,
    deleteWebsite,
    exportWebsite,
    importWebsite
  }
}
