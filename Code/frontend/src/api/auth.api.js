import api from './axios'

export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  getMe: () =>
    api.get('/auth/me'),

  changePassword: (data) =>
    api.post('/auth/change-password', data),

  refreshToken: (refresh_token) =>
    api.post('/auth/refresh-token', { refresh_token }),
}
