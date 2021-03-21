import { reactive, readonly } from 'vue'
import { ProjectPathItem } from 'src/types/ProjectPathItem'
import { ProjectPathList } from 'src/types/ProjectPathList'

const allProjects: ProjectPathList = reactive({ items: [] })
const currentProject: ProjectPathItem = reactive({
  filename: null,
  path: null,
  title: null,
  uuid: null
})

export default function useProjectManager () {
  function initPathsSync () {
    // Create the projects and configuration directories
    window.myProjectManagerAPI.initPathsSync()

    // Initialize the projects list
    allProjects.items = window.myProjectManagerAPI.getProjectPathListSync()
    // for (let i = 0; i < allProjects.items.length; i++) {
    //   console.log(`Project ${i}: ` + String(allProjects.items[i].filename))
    //   console.log(`Project ${i}: ` + String(allProjects.items[i].path))
    //   console.log(`Project ${i}: ` + String(allProjects.items[i].title))
    //   console.log(`Project ${i}: ` + String(allProjects.items[i].uuid))
    // }
  }

  function copyItem (item: ProjectPathItem) {
    const itemCopy: ProjectPathItem = {
      filename: item.filename,
      path: item.path,
      title: item.title,
      uuid: item.uuid
    }
    return itemCopy
  }

  function openProject (item: ProjectPathItem) {
    currentProject.filename = item.filename
    currentProject.path = item.path
    currentProject.title = item.title
    currentProject.uuid = item.uuid
    if (item.path !== null && item.filename !== null && item.title !== null && item.uuid !== null) {
      const itemCopy: ProjectPathItem = copyItem(item)
      window.myProjectManagerAPI.openProjectSync(itemCopy)
    }
  }
  function closeProject () {
    currentProject.filename = null
    currentProject.path = null
    currentProject.title = null
    currentProject.uuid = null
  }
  // function createProject () {
  //   // TODO
  // }
  function deleteProject (item: ProjectPathItem) {
    const itemCopy: ProjectPathItem = copyItem(item)
    return window.myProjectManagerAPI.deleteProject(itemCopy)
  }

  return {
    initPathsSync,
    allProjects: readonly(allProjects),
    currentProject: readonly(currentProject),
    openProject,
    closeProject,
    deleteProject
  }
}
