<template>
  <div>
    <p>
      <button v-on:click="appRelaunch()">
        Relaunch
      </button>
    </p>
    <p>
      {{ electronData.userDataPath }}<br />
      {{ electronData.userDataWebsitesPath }}<br />
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
      <button v-on:click="tempCurrentWebsite = 'website-a'">
        testLowDb website a
      </button>
      <button v-on:click="tempCurrentWebsite = 'website-b'">
        testLowDb website b
      </button>
      <button v-on:click="tempCurrentWebsite = 'website-c'">
        testLowDb website c
      </button>
    </p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'
import useMainElectronData from 'src/use/useMainElectronData'
import useMainWindow from 'src/use/useMainWindow'

import { v4 as uuidv4 } from 'uuid'
import { Course } from 'src/db/entities/Course'
// import { coursesDB, openCoursesDB, CoursesDatabaseCollections, CoursesRepository } from 'src/db/repositories/CoursesRepository'
import { coursesDB, CoursesDatabaseCollections, CoursesRepository } from 'src/db/repositories/CoursesRepository'

export default defineComponent({
  name: 'ExampleDbComponent',
  setup () {
    const { appRelaunch } = useMainWindow()

    const { electronData } = useMainElectronData()

    const tempCurrentWebsite = ref('website-a')
    function testLowDbCreate () {
      // openCoursesDB(path.join(electronData.userDataWebsitesPath, tempCurrentWebsite.value))
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
      // openCoursesDB(path.join(electronData.userDataWebsitesPath, tempCurrentWebsite.value))
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
      // console.log(coursesDB)
    }

    return {
      appRelaunch,
      electronData,
      testLowDbCreate,
      testLowDbFindOne,
      testLowDbShow,
      tempCurrentWebsite
    }
  }
})
</script>
