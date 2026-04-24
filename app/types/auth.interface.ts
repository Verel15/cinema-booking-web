export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  data: {
    access_token: string
    refresh_token: string
    expires_in: number
    user: {
      id: string
      username: string
      email: string
      role: string
      status: string
      provider: string
      avatar_url: string
    }
  }
  success: boolean
  httpStatus: number
}