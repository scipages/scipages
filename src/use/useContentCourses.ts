import { readonly, ref, Ref } from 'vue'
import { WebsitePathItem } from 'src/types/WebsitePathItem'
import { Course } from 'src/db/entities/Course'
import _ from 'lodash'

const allItems: Ref<Array<Course>> = ref([])

export default function useContentCourses () {
  function getItems (website: WebsitePathItem) {
    // Get the courses list
    allItems.value = window.myContentAPI.getCoursesListSync(_.cloneDeep(website))
    // for (let i = 0; i < allItems.value.length; i++) {
    //   console.log(allItems.value[i])
    // }
  }

  // function createItem (website: WebsitePathItem, title: string, role: string, ...) {
  //   return window.myContentAPI.createCourse(title, role, ...)
  // }
  //
  // function updateItem (website: WebsitePathItem, item: Course) {
  //   return window.myContentAPI.updateCourse(_.cloneDeep(website), _.cloneDeep(item))
  // }
  //
  // function deleteItem (website: WebsitePathItem, item: Course) {
  //   return window.myContentAPI.deleteCourse(_.cloneDeep(website), _.cloneDeep(item))
  // }

  return {
    allItems: readonly(allItems),
    getItems
  }
}