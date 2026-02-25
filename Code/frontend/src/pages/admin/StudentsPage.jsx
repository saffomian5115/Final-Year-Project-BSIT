import { useState, useEffect, useCallback } from 'react'
import { adminAPI } from '../../api/admin.api'
import toast from 'react-hot-toast'
import {
  Search, Plus, Eye, ToggleLeft, ToggleRight,
  Loader2, X, User, Mail, Phone, MapPin,
  Hash, ChevronLeft, ChevronRight, Filter
} from 'lucide-react'

// ── Modal — Student Detail ─────────────────────────
function StudentDetailModal({ studentId, onClose }) {
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminAPI.getStudent(studentId).then(res => {
      setStudent(res.data.data)
    }).catch(() => toast.error('Failed to load student'))
      .finally(() => setLoading(false))
  }, [studentId])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-800">Student Details</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        ) : student ? (
          <div className="p-6 space-y-4">
            {/* Avatar + Name */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700 font-display font-bold text-xl">
                {student.profile?.full_name?.[0] || '?'}
              </div>
              <div>
                <p className="font-display font-bold text-slate-800 text-lg">
                  {student.profile?.full_name}
                </p>
                <p className="text-slate-400 text-sm font-mono">{student.roll_number}</p>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  student.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {student.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Mail,  label: 'Email',  value: student.email },
                { icon: Phone, label: 'Phone',  value: student.profile?.phone },
                { icon: User,  label: 'Gender', value: student.profile?.gender },
                { icon: MapPin,label: 'City',   value: student.profile?.city },
                { icon: Hash,  label: 'CNIC',   value: student.profile?.cnic },
                { icon: User,  label: 'Father', value: student.profile?.father_name },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={13} className="text-slate-400" />
                    <p className="text-slate-400 text-xs">{label}</p>
                  </div>
                  <p className="text-slate-700 text-sm font-medium truncate">{value || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-slate-400">Student not found</div>
        )}

        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Modal — Create Student ─────────────────────────
function CreateStudentModal({ programs, semesters, onClose, onSuccess }) {
  const [form, setForm] = useState({
    email: '', password: 'Student@123', full_name: '', father_name: '',
    gender: 'male', phone: '', city: '', program_id: '', batch_year: 2025,
    enrollment_semester_id: semesters?.[0]?.id || '',
  })
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async () => {
    if (!form.email || !form.full_name || !form.program_id) {
      toast.error('Email, name aur program required hain')
      return
    }
    setLoading(true)
    try {
      await adminAPI.createStudent(form)
      toast.success('Student created successfully!')
      onSuccess()
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create student')
    } finally {
      setLoading(false)
    }
  }

  const Field = ({ label, children }) => (
    <div>
      <label className="block text-slate-500 text-xs font-medium mb-1.5">{label}</label>
      {children}
    </div>
  )

  const inputCls = "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-800">Create New Student</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name *">
              <input className={inputCls} value={form.full_name}
                onChange={e => set('full_name', e.target.value)} placeholder="Ali Hassan" />
            </Field>
            <Field label="Father Name">
              <input className={inputCls} value={form.father_name}
                onChange={e => set('father_name', e.target.value)} placeholder="Hassan Sahib" />
            </Field>
            <Field label="Email *">
              <input className={inputCls} type="email" value={form.email}
                onChange={e => set('email', e.target.value)} placeholder="ali@student.bzu.edu.pk" />
            </Field>
            <Field label="Phone">
              <input className={inputCls} value={form.phone}
                onChange={e => set('phone', e.target.value)} placeholder="0311-1234567" />
            </Field>
            <Field label="Gender">
              <select className={inputCls} value={form.gender} onChange={e => set('gender', e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </Field>
            <Field label="City">
              <input className={inputCls} value={form.city}
                onChange={e => set('city', e.target.value)} placeholder="Multan" />
            </Field>
            <Field label="Program *">
              <select className={inputCls} value={form.program_id}
                onChange={e => set('program_id', parseInt(e.target.value))}>
                <option value="">Select Program</option>
                {programs?.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                ))}
              </select>
            </Field>
            <Field label="Batch Year">
              <input className={inputCls} type="number" value={form.batch_year}
                onChange={e => set('batch_year', parseInt(e.target.value))} />
            </Field>
            <Field label="Enrollment Semester">
              <select className={inputCls} value={form.enrollment_semester_id}
                onChange={e => set('enrollment_semester_id', parseInt(e.target.value))}>
                {semesters?.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Default Password">
              <input className={inputCls} value={form.password}
                onChange={e => set('password', e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Creating...</> : 'Create Student'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Students Page ─────────────────────────────
export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [pagination, setPagination] = useState({ total: 0, page: 1, per_page: 10, total_pages: 1 })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [programs, setPrograms] = useState([])
  const [semesters, setSemesters] = useState([])

  // Modals
  const [detailId, setDetailId] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [togglingId, setTogglingId] = useState(null)

  const fetchStudents = useCallback(async (page = 1, q = search) => {
    setLoading(true)
    try {
      const res = await adminAPI.getStudents(page, 10, q)
      setStudents(res.data.data.students)
      setPagination(res.data.data.pagination)
    } catch {
      toast.error('Failed to load students')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchStudents()
    // Programs + Semesters for create form
    adminAPI.getPrograms().then(r => setPrograms(r.data.data?.programs || []))
    adminAPI.getSemesters().then(r => setSemesters(r.data.data?.semesters || []))
  }, [])

  // Search with debounce
  useEffect(() => {
    const t = setTimeout(() => fetchStudents(1, search), 400)
    return () => clearTimeout(t)
  }, [search])

  const handleToggleStatus = async (student) => {
    setTogglingId(student.user_id)
    try {
      await adminAPI.toggleStudentStatus(student.user_id, !student.is_active)
      toast.success(`Student ${student.is_active ? 'deactivated' : 'activated'}`)
      fetchStudents(pagination.page)
    } catch {
      toast.error('Failed to update status')
    } finally {
      setTogglingId(null)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800">Students</h1>
          <p className="text-slate-400 text-sm mt-0.5">{pagination.total} total students</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-600/20"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, roll number..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors text-sm">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Student', 'Roll Number', 'Email', 'Phone', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-400">
                    No students found
                  </td>
                </tr>
              ) : students.map(s => (
                <tr key={s.user_id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                        {s.full_name?.[0]}
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{s.full_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-slate-500 text-sm font-mono">{s.roll_number}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-slate-400 text-sm">{s.email}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-slate-500 text-sm">{s.phone}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      s.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {s.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDetailId(s.user_id)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(s)}
                        disabled={togglingId === s.user_id}
                        className={`p-1.5 rounded-lg transition-colors ${
                          s.is_active
                            ? 'hover:bg-red-50 text-slate-400 hover:text-red-500'
                            : 'hover:bg-emerald-50 text-slate-400 hover:text-emerald-600'
                        }`}
                        title={s.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {togglingId === s.user_id
                          ? <Loader2 size={16} className="animate-spin" />
                          : s.is_active
                            ? <ToggleRight size={16} />
                            : <ToggleLeft size={16} />
                        }
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.total_pages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-slate-400 text-sm">
              Showing {((pagination.page - 1) * pagination.per_page) + 1}–{Math.min(pagination.page * pagination.per_page, pagination.total)} of {pagination.total}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchStudents(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="p-2 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ChevronLeft size={16} className="text-slate-600" />
              </button>
              {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => fetchStudents(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    p === pagination.page
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => fetchStudents(pagination.page + 1)}
                disabled={pagination.page === pagination.total_pages}
                className="p-2 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ChevronRight size={16} className="text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {detailId && (
        <StudentDetailModal studentId={detailId} onClose={() => setDetailId(null)} />
      )}
      {showCreate && (
        <CreateStudentModal
          programs={programs}
          semesters={semesters}
          onClose={() => setShowCreate(false)}
          onSuccess={() => fetchStudents(1)}
        />
      )}
    </div>
  )
}