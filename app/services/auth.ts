import type { AuthResponse, LoginPayload } from "~/types/auth.interface"


export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { $api } = useNuxtApp()
    const response = await $api.post<AuthResponse>('/auth/login', payload)
    return response.data
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const { $api } = useNuxtApp()
    const response = await $api.post<AuthResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    })
    return response.data
  },
}
