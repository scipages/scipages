<template>
  <div>
    <p>
      <button v-on:click="minimizeWindow()">
        Minimize
      </button>
      <button v-on:click="maximizeUnmaximizeWindow()">
        <span  v-if="maximized == false">Maximize</span>
        <span  v-else>Unmaximize</span>
      </button>
      <button v-on:click="closeWindow()">
        Close
      </button>
      <button v-on:click="showElectronModal()">
        Show Electron Modal
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
  Ref,
  onMounted
} from 'vue'
import { Todo, Meta } from './models'
import { ipcRenderer } from 'electron'

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
    const maximized = ref(false)

    onMounted(() => {
      // ipcRenderer.on('window-maximized',  (event, message) => {
      ipcRenderer.on('window-maximized', () => {
        maximized.value = true
      })
      // ipcRenderer.on('window-unmaximized',  (event, message) => {
      ipcRenderer.on('window-unmaximized', () => {
        maximized.value = false
      })
    })
    function minimizeWindow () {
      void ipcRenderer.invoke('window-controls-channel', { minimize: true })
    }
    function maximizeUnmaximizeWindow () {
      void ipcRenderer.invoke('window-controls-channel', { maximize: true })
    }
    function closeWindow () {
      void ipcRenderer.invoke('window-controls-channel', { close: true })
    }
    function showElectronModal () {
      void ipcRenderer.invoke('window-controls-channel', { showModal: true })

      void ipcRenderer.invoke('get-data-channel', { version: true }).then((result: string) => {
        console.log('Version #1: ' + result)
      })
    }
    return {
      ...useClickCount(),
      ...useDisplayTodo(toRef(props, 'todos')),
      maximized,
      minimizeWindow,
      maximizeUnmaximizeWindow,
      closeWindow,
      showElectronModal
    }
  }
})
</script>
