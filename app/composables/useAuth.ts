import type { AuthResponse } from "~/types/auth.interface"

export const useAuth = () => {
  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')
  const user = useState<AuthResponse['data']['user'] | null>('auth.user', () => null)
  const isAuthenticated = computed(() => !!accessToken.value)

  // บันทึก auth data
  const setAuth = (response: AuthResponse) => {
    accessToken.value = response.data.access_token
    refreshToken.value = response.data.refresh_token
    user.value = response.data.user
  }

  // ลบ auth data
  const clearAuth = () => {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
  }

  return {
    accessToken,
    refreshToken,
    user,
    isAuthenticated,
    setAuth,
    clearAuth,
  }
}
