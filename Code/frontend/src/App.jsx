import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/auth/LoginPage'
import { authStore } from './store/authStore'

// Protected Route
function ProtectedRoute({ children, allowedRoles }) {
  const user = authStore.getUser()
  const token = authStore.getToken()

  if (!token || !user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/login" replace />

  return children
}

// Role based redirect after login
function RoleRedirect() {
  const user = authStore.getUser()
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'admin')   return <Navigate to="/admin/dashboard" replace />
  if (user.role === 'teacher') return <Navigate to="/teacher/dashboard" replace />
  return <Navigate to="/student/dashboard" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RoleRedirect />} />

        {/* Placeholder routes — baad mein add honge */}
        <Route path="/student/*" element={
          <ProtectedRoute allowedRoles={['student']}>
            <div className="p-8 text-2xl">Student Dashboard — Coming Soon</div>
          </ProtectedRoute>
        }/>
        <Route path="/teacher/*" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <div className="p-8 text-2xl">Teacher Dashboard — Coming Soon</div>
          </ProtectedRoute>
        }/>
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="p-8 text-2xl">Admin Dashboard — Coming Soon</div>
          </ProtectedRoute>
        }/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}