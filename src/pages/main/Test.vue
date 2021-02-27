<template>
  <div class="fit relative-position">
    <div class="q-pa-md text-center">
      <ExampleComponent
        title="Example component"
        active
        :todos="todos"
        :meta="meta"
      ></ExampleComponent>
    </div>

    <hr />

    <ExampleVuexComponent></ExampleVuexComponent>

    <hr />

    <div class="text-center">
      text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />
      text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />
      text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />
      text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />
      text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />text<br />
      end of text
    </div>
  </div>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models'
import ExampleComponent from 'components/ExampleComponent.vue'
import ExampleVuexComponent from 'components/ExampleVuexComponent.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageMainTest',
  components: {
    ExampleComponent,
    ExampleVuexComponent
  },
  setup () {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ])
    const meta = ref<Meta>({
      totalCount: 1200
    })

    return {
      todos,
      meta
    }
  }
})
</script>
