export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return

  const { isAuthenticated } = useAuth()

  // Pages ที่ไม่ต้อง login
  const publicPages = ['/login', '/register']

  // ถ้าต้อง login และยังไม่ login
  if (!publicPages.includes(to.path) && !isAuthenticated.value) {
    return navigateTo('/login')
  }

  // ถ้า login แล้วและเข้า public pages
  if (publicPages.includes(to.path) && isAuthenticated.value) {
    return navigateTo('/')
  }
})
