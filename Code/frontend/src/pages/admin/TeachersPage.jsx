import { useState, useEffect, useCallback } from 'react'
import { adminAPI } from '../../api/admin.api'
import { formatDate, getInitials, avatarColor } from '../../utils/helpers'
import toast from 'react-hot-toast'
import {
  Search, Plus, Eye, ToggleLeft, ToggleRight,
  Loader2, X, Mail, Phone, Briefcase,
  GraduationCap, Calendar, Hash, ChevronLeft,
  ChevronRight, User
} from 'lucide-react'

// ── Detail Modal ───────────────────────────────────
function TeacherDetailModal({ teacherId, onClose }) {
  const [teacher, setTeacher] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminAPI.getTeacher(teacherId)
      .then(r => setTeacher(r.data.data))
      .catch(() => toast.error('Failed to load teacher'))
      .finally(() => setLoading(false))
  }, [teacherId])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-800">Teacher Details</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        ) : teacher ? (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${avatarColor(teacher.profile?.full_name || '')} rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl`}>
                {getInitials(teacher.profile?.full_name || '')}
              </div>
              <div>
                <p className="font-display font-bold text-slate-800 text-lg">{teacher.profile?.full_name}</p>
                <p className="text-slate-400 text-sm">{teacher.profile?.designation || 'Lecturer'}</p>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  teacher.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {teacher.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Mail,         label: 'Email',           value: teacher.email },
                { icon: Hash,         label: 'Employee ID',     value: teacher.profile?.employee_id },
                { icon: Phone,        label: 'Phone',           value: teacher.profile?.phone },
                { icon: GraduationCap,label: 'Qualification',   value: teacher.profile?.qualification },
                { icon: Briefcase,    label: 'Specialization',  value: teacher.profile?.specialization },
                { icon: Calendar,     label: 'Joining Date',    value: formatDate(teacher.profile?.joining_date) },
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
          <div className="p-6 text-center text-slate-400">Teacher not found</div>
        )}
        <div className="p-6 pt-0">
          <button onClick={onClose} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Create Modal ───────────────────────────────────
function CreateTeacherModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    email: '', full_name: '', employee_id: '',
    designation: '', qualification: '', specialization: '',
    phone: '', cnic: '', joining_date: '',
  })
  const [loading, setLoading] = useState(false)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async () => {
    if (!form.email || !form.full_name || !form.employee_id) {
      toast.error('Email, name and employee ID are required')
      return
    }
    setLoading(true)
    try {
      const res = await adminAPI.createTeacher(form)
      const temp = res.data.data?.temp_password
      toast.success(`Teacher created! Temp password: ${temp}`)
      onSuccess()
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create teacher')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
  const Field = ({ label, children }) => (
    <div>
      <label className="block text-slate-500 text-xs font-medium mb-1.5">{label}</label>
      {children}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-800">Add New Teacher</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name *">
              <input className={inputCls} value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Dr. Kamran Ahmed" />
            </Field>
            <Field label="Employee ID *">
              <input className={inputCls} value={form.employee_id} onChange={e => set('employee_id', e.target.value)} placeholder="BZU-EMP-001" />
            </Field>
            <Field label="Email *">
              <input className={inputCls} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="dr.kamran@bzu.edu.pk" />
            </Field>
            <Field label="Phone">
              <input className={inputCls} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="03001234567" />
            </Field>
            <Field label="Designation">
              <select className={inputCls} value={form.designation} onChange={e => set('designation', e.target.value)}>
                <option value="">Select designation</option>
                <option>Lecturer</option>
                <option>Assistant Professor</option>
                <option>Associate Professor</option>
                <option>Professor</option>
              </select>
            </Field>
            <Field label="Qualification">
              <input className={inputCls} value={form.qualification} onChange={e => set('qualification', e.target.value)} placeholder="PhD Computer Science" />
            </Field>
            <Field label="Specialization">
              <input className={inputCls} value={form.specialization} onChange={e => set('specialization', e.target.value)} placeholder="AI, Web Development" />
            </Field>
            <Field label="Joining Date">
              <input className={inputCls} type="date" value={form.joining_date} onChange={e => set('joining_date', e.target.value)} />
            </Field>
            <Field label="CNIC">
              <input className={inputCls} value={form.cnic} onChange={e => set('cnic', e.target.value)} placeholder="3610212345678" />
            </Field>
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Adding...</> : 'Add Teacher'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────
export default function TeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [pagination, setPagination] = useState({ total: 0, page: 1, per_page: 20, total_pages: 1 })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [detailId, setDetailId] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [togglingId, setTogglingId] = useState(null)

  const fetchTeachers = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const res = await adminAPI.getTeachers(page, 20, search)
      setTeachers(res.data.data.teachers || [])
      setPagination(res.data.data.pagination || { total: 0, page: 1, per_page: 20, total_pages: 1 })
    } catch { toast.error('Failed to load teachers') }
    finally { setLoading(false) }
  }, [search])

  useEffect(() => { fetchTeachers() }, [])
  useEffect(() => {
    const t = setTimeout(() => fetchTeachers(1), 400)
    return () => clearTimeout(t)
  }, [search])

  const handleToggle = async (t) => {
    setTogglingId(t.user_id)
    try {
      await adminAPI.toggleTeacherStatus(t.user_id)
      toast.success(`Teacher ${t.is_active ? 'deactivated' : 'activated'}`)
      fetchTeachers(pagination.page)
    } catch { toast.error('Failed to update status') }
    finally { setTogglingId(null) }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800">Teachers</h1>
          <p className="text-slate-400 text-sm mt-0.5">{pagination.total} faculty members</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-purple-600/20">
          <Plus size={16} /> Add Teacher
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200">
        {/* Search */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search teachers..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:bg-slate-100 transition-colors"
            />
          </div>
          <span className="text-xs text-slate-400 bg-slate-50 px-3 py-2 rounded-xl">{pagination.total} total</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Teacher', 'Employee ID', 'Designation', 'Specialization', 'Phone', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-slate-100 rounded-lg" /></td>
                    ))}
                  </tr>
                ))
              ) : teachers.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-16 text-slate-400">No teachers found</td></tr>
              ) : (
                teachers.map(t => (
                  <tr key={t.user_id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${avatarColor(t.full_name || '')} rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {getInitials(t.full_name || '')}
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">{t.full_name}</p>
                          <p className="text-xs text-slate-400">{t.email || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{t.employee_id || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">{t.designation || '—'}</td>
                    <td className="px-4 py-3 text-slate-500 max-w-[160px] truncate">{t.specialization || '—'}</td>
                    <td className="px-4 py-3 text-slate-500">{t.phone || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        t.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>{t.is_active ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setDetailId(t.user_id)}
                          className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors" title="View details">
                          <Eye size={15} />
                        </button>
                        <button onClick={() => handleToggle(t)} disabled={togglingId === t.user_id}
                          className={`p-1.5 rounded-lg transition-colors ${
                            t.is_active ? 'hover:bg-red-50 text-slate-400 hover:text-red-500' : 'hover:bg-emerald-50 text-slate-400 hover:text-emerald-600'
                          }`}>
                          {togglingId === t.user_id ? <Loader2 size={15} className="animate-spin" /> : t.is_active ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.total_pages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-slate-400 text-sm">
              Showing {((pagination.page - 1) * pagination.per_page) + 1}–{Math.min(pagination.page * pagination.per_page, pagination.total)} of {pagination.total}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => fetchTeachers(pagination.page - 1)} disabled={pagination.page === 1}
                className="p-2 hover:bg-slate-100 disabled:opacity-40 rounded-lg transition-colors">
                <ChevronLeft size={16} className="text-slate-600" />
              </button>
              {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => fetchTeachers(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === pagination.page ? 'bg-purple-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => fetchTeachers(pagination.page + 1)} disabled={pagination.page === pagination.total_pages}
                className="p-2 hover:bg-slate-100 disabled:opacity-40 rounded-lg transition-colors">
                <ChevronRight size={16} className="text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {detailId && <TeacherDetailModal teacherId={detailId} onClose={() => setDetailId(null)} />}
      {showCreate && <CreateTeacherModal onClose={() => setShowCreate(false)} onSuccess={() => fetchTeachers(1)} />}
    </div>
  )
}
