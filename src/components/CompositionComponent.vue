<template>
  <div>
    <p>
      <button v-on:click="appRelaunch()">
        Relaunch
      </button>
      <button v-on:click="showElectronModal()">
        Show Electron Modal
      </button>
      <button v-on:click="openExternalURL()">
        Open External URL
      </button>
    </p>
    <p>
      {{ electronData.userDataPath }}<br />
      {{ electronData.userDataProjectsPath }}<br />
      {{ electronData.userDataConfigurationPath }}
    </p>
    <p>
      <button v-on:click="testLowDbCreate()">
        testLowDbCreate
      </button>
      <button v-on:click="testLowDbFindOne('7ef3e874-8b45-4800-a887-5c3d4bff3315')">
        testLowDbFindOne
      </button>
      <br />
      <button v-on:click="testLowDbShow()">
        testLowDb SHOW db instance
      </button>
      <br />
      <button v-on:click="tempCurrentProject = 'project-a'">
        testLowDb project a
      </button>
      <button v-on:click="tempCurrentProject = 'project-b'">
        testLowDb project b
      </button>
      <button v-on:click="tempCurrentProject = 'project-c'">
        testLowDb project c
      </button>
    </p>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  toRef,
  Ref
} from 'vue'
import { Todo, Meta } from './models'
import { ipcRenderer } from 'electron'
import { openURL } from 'quasar'
import useProjectManager, { ElectronData } from 'src/use/useProjectManager'
import path from 'path'

import { v4 as uuidv4 } from 'uuid'
import { Course } from 'src/db/entities/Course'
import { coursesDB, openCoursesDB, CoursesDatabaseCollections, CoursesRepository } from 'src/db/repositories/CoursesRepository'

function useClickCount () {
  const clickCount = ref(0)
  function increment () {
    clickCount.value += 1
    return clickCount.value
  }

  return { clickCount, increment }
}

function useDisplayTodo (todos: Ref<Todo[]>) {
  const todoCount = computed(() => todos.value.length)
  return { todoCount }
}

export default defineComponent({
  name: 'CompositionComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    todos: {
      type: Array as PropType<Todo[]>,
      default: () => []
    },
    meta: {
      type: Object as PropType<Meta>,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup (props) {
    const { electronData } = useProjectManager()
    function appRelaunch () {
      void ipcRenderer.invoke('window-controls-channel', { appRelaunch: true })
    }
    function showElectronModal () {
      void ipcRenderer.invoke('window-controls-channel', { showModal: true })

      void ipcRenderer.invoke('get-data-channel', {}).then((result: ElectronData) => {
        console.log('Version: ' + result.electronVersion)
      })
    }
    function openExternalURL () {
      openURL('https://www.google.com')
    }

    const tempCurrentProject = ref('project-a')
    function testLowDbCreate () {
      openCoursesDB(path.join(electronData.userDataProjectsPath, tempCurrentProject.value))
      const repository = new CoursesRepository(
        coursesDB,
        CoursesDatabaseCollections.Courses
      )
      const id = uuidv4()
      const newItem = {
        id: id,
        title: '123',
        role: '123',
        semester: 123,
        semesterTaught: '123',
        organization: '123',
        department: '123',
        links: [],
        dateCreated: new Date(),
        dateUpdated: new Date()
      }
      const item: Course = repository.findOne(id)
      console.log(item)
      repository.create(newItem)
      const item2: Course = repository.findOne(id)
      console.log(item2)
    }
    function testLowDbFindOne (id: string) {
      openCoursesDB(path.join(electronData.userDataProjectsPath, tempCurrentProject.value))
      const repository = new CoursesRepository(
        coursesDB,
        CoursesDatabaseCollections.Courses
      )
      const item: Course = repository.findOne(
        id
      )
      console.log(item)
    }
    function testLowDbShow () {
      // dffg
      // console.log(coursesDB)
    }

    return {
      ...useClickCount(),
      ...useDisplayTodo(toRef(props, 'todos')),
      appRelaunch,
      showElectronModal,
      openExternalURL,
      electronData,
      testLowDbCreate,
      testLowDbFindOne,
      testLowDbShow,
      tempCurrentProject
    }
  }
})
</script>
