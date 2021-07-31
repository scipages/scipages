import { ref } from 'vue'

export default function useLoading () {
  const isLoading = ref(false)

  function startLoading () {
    isLoading.value = true
  }
  function endLoading () {
    isLoading.value = false
  }

  return {
    isLoading,
    startLoading,
    endLoading
  }
}
