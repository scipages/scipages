<template>
  <div>
    <p>
      <button v-on:click="showElectronModal()">
        Show Electron Modal
      </button>
      <button v-on:click="openExternalURL()">
        Open External URL
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
    function showElectronModal () {
      void ipcRenderer.invoke('window-controls-channel', { showModal: true })

      void ipcRenderer.invoke('get-data-channel', { version: true }).then((result: string) => {
        console.log('Version: ' + result)
      })
    }
    function openExternalURL () {
      openURL('https://www.google.com')
    }
    return {
      ...useClickCount(),
      ...useDisplayTodo(toRef(props, 'todos')),
      showElectronModal,
      openExternalURL
    }
  }
})
</script>
