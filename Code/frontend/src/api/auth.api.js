import api from './axios'

export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  me: () =>
    api.get('/auth/me'),

  changePassword: (current_password, new_password) =>
    api.post('/auth/change-password', { current_password, new_password }),
}