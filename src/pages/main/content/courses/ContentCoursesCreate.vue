<template>
  <div class="q-pa-md">
    <q-btn
      size="xs"
      icon="fas fa-edit"
      color="green-5"
      text-color="white"
      class="q-mx-xs"
      label="Save"
      :to="{name: 'main_courses_index', params: { uuid: uuid }}"
    />
    <q-btn
      size="xs"
      icon="fas fa-check"
      text-color="green-4"
      class="q-mx-xs"
      label="Save & Close"
      :to="{name: 'main_courses_index', params: { uuid: uuid }}"
    />
    <q-btn
      size="xs"
      icon="fas fa-times-circle"
      text-color="red-4"
      class="q-mx-xs"
      label="Cancel"
      :to="{name: 'main_courses_index', params: { uuid: uuid }}"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  setup () {
    return {
    }
  }
})
</script>

<style scoped lang="scss">
</style>
