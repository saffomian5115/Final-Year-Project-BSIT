export const authStore = {
  setAuth: (token, refreshToken, user) => {
    localStorage.setItem('access_token', token)
    localStorage.setItem('refresh_token', refreshToken)
    localStorage.setItem('user', JSON.stringify(user))
  },

  getToken: () => localStorage.getItem('access_token'),

  getUser: () => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  },

  clear: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
  },

  isLoggedIn: () => !!localStorage.getItem('access_token'),
}