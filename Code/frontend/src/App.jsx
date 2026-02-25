import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/auth/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import { authStore } from "./store/authStore";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentsPage from "./pages/admin/StudentsPage";

function ProtectedRoute({ children, allowedRoles }) {
  const user = authStore.getUser();
  const token = authStore.getToken();
  if (!token || !user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/login" replace />;
  return children;
}

function RoleRedirect() {
  const user = authStore.getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (user.role === "teacher")
    return <Navigate to="/teacher/dashboard" replace />;
  return <Navigate to="/student/dashboard" replace />;
}

// Placeholder page
const ComingSoon = ({ title }) => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <p className="text-2xl font-display font-bold text-slate-700">{title}</p>
      <p className="text-slate-400 mt-2">Coming soon...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RoleRedirect />} />

        {/* Student */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <DashboardLayout>
                <Routes>
                  <Route
                    path="dashboard"
                    element={<ComingSoon title="Student Dashboard" />}
                  />
                  <Route
                    path="courses"
                    element={<ComingSoon title="My Courses" />}
                  />
                  <Route
                    path="attendance"
                    element={<ComingSoon title="Attendance" />}
                  />
                  <Route
                    path="assignments"
                    element={<ComingSoon title="Assignments" />}
                  />
                  <Route
                    path="quizzes"
                    element={<ComingSoon title="Quizzes" />}
                  />
                  <Route
                    path="results"
                    element={<ComingSoon title="Results" />}
                  />
                  <Route path="fee" element={<ComingSoon title="Fee" />} />
                  <Route
                    path="announcements"
                    element={<ComingSoon title="Announcements" />}
                  />
                  <Route path="chat" element={<ComingSoon title="Chat" />} />
                  <Route
                    path="ai"
                    element={<ComingSoon title="AI Assistant" />}
                  />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Teacher */}
        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <DashboardLayout>
                <Routes>
                  <Route
                    path="dashboard"
                    element={<ComingSoon title="Teacher Dashboard" />}
                  />
                  <Route
                    path="courses"
                    element={<ComingSoon title="My Courses" />}
                  />
                  <Route
                    path="attendance"
                    element={<ComingSoon title="Mark Attendance" />}
                  />
                  <Route
                    path="assignments"
                    element={<ComingSoon title="Assignments" />}
                  />
                  <Route
                    path="quizzes"
                    element={<ComingSoon title="Quizzes" />}
                  />
                  <Route
                    path="results"
                    element={<ComingSoon title="Results" />}
                  />
                  <Route
                    path="announcements"
                    element={<ComingSoon title="Announcements" />}
                  />
                  <Route path="chat" element={<ComingSoon title="Chat" />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="students" element={<StudentsPage />} />
                  <Route
                    path="teachers"
                    element={<ComingSoon title="Teachers" />}
                  />
                  <Route
                    path="departments"
                    element={<ComingSoon title="Departments" />}
                  />
                  <Route
                    path="semesters"
                    element={<ComingSoon title="Semesters" />}
                  />
                  <Route
                    path="courses"
                    element={<ComingSoon title="Courses" />}
                  />
                  <Route
                    path="fee"
                    element={<ComingSoon title="Fee Management" />}
                  />
                  <Route
                    path="announcements"
                    element={<ComingSoon title="Announcements" />}
                  />
                  <Route
                    path="gates"
                    element={<ComingSoon title="Campus Gates" />}
                  />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
