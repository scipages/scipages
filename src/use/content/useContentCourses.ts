import type { Ref } from 'vue'
import { readonly, ref } from 'vue'
import { WebsitePathItem } from 'app/src-common/types/WebsitePathItem'
import { Course } from '@scipages/gen/lib/entities/Course'
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

  function createItem (website: WebsitePathItem, item: Course) {
    return window.myContentAPI.createCourse(_.cloneDeep(website), _.cloneDeep(item))
  }

  function updateItem (website: WebsitePathItem, item: Course) {
    return window.myContentAPI.updateCourse(_.cloneDeep(website), _.cloneDeep(item))
  }

  function deleteItem (website: WebsitePathItem, item: Course) {
    return window.myContentAPI.deleteCourse(_.cloneDeep(website), _.cloneDeep(item))
  }

  return {
    allItems: readonly(allItems),
    getItems,
    createItem,
    updateItem,
    deleteItem
  }
}
