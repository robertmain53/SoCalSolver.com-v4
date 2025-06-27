export function useQuerySync<T extends Record<string, any>>(state: T) {
  const route = useRoute()
  const router = useRouter()

  // Initialize from query
  for (const key in state) {
    if (route.query[key] !== undefined) {
      const val = route.query[key]
      if (typeof state[key] === 'number') {
        state[key] = parseFloat(val as string)
      } else {
        state[key] = val
      }
    }
  }

  // Sync back to URL
  watch(
    () => ({ ...state }),
    (newState) => {
      const newQuery = { ...route.query }
      for (const key in newState) {
        newQuery[key] = newState[key]
      }
      router.replace({ query: newQuery })
    },
    { deep: true }
  )
}