export function useUserProfile() {
  const profile = ref(null)

  async function fetchProfile() {
    const { data } = await useFetch('/api/user/profile')
    profile.value = data.value || null
  }

  return { profile, fetchProfile }
}
