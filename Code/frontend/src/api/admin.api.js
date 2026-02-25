import api from './axios'

export const adminAPI = {
  // Students
  getStudents: (page = 1, per_page = 10, search = '') =>
    api.get(`/students?page=${page}&per_page=${per_page}${search ? `&search=${search}` : ''}`),
  getStudent: (id) => api.get(`/students/${id}`),
  createStudent: (data) => api.post('/students', data),
  updateStudent: (id, data) => api.put(`/students/${id}`, data),
  toggleStudentStatus: (id, is_active) =>
    api.patch(`/students/${id}/status`, { is_active }),

  // Teachers
  getTeachers: (page = 1, per_page = 10) =>
    api.get(`/teachers?page=${page}&per_page=${per_page}`),
  getTeacher: (id) => api.get(`/teachers/${id}`),

  // Academic
  getDepartments: () => api.get('/departments'),
  getPrograms: () => api.get('/programs'),
  getActiveSemester: () => api.get('/semesters/active'),
  getSemesters: () => api.get('/semesters'),

  // Announcements
  getAnnouncements: (page = 1) => api.get(`/announcements?page=${page}`),

  // Analytics
  getAtRiskStudents: (semesterId) =>
    api.get(`/analytics/semester/${semesterId}/at-risk`),
}