import api from './axios'

export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  getProfile: () =>
    api.get('/auth/profile'),

  updateProfile: (data) =>
    api.put('/auth/profile', data),

  uploadProfilePicture: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/auth/profile/upload-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  changePassword: (data) =>
    api.post('/auth/change-password', data),

  refreshToken: (refresh_token) =>
    api.post('/auth/refresh-token', { refresh_token }),
}