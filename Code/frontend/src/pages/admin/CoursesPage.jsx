import { useState, useEffect, useCallback } from 'react'
import { adminAPI } from '../../api/admin.api'
import toast from 'react-hot-toast'
import {
  Plus, Pencil, Trash2, BookOpen, Loader2, X,
  ChevronLeft, ChevronRight, Search, Eye, List
} from 'lucide-react'

// ── CLO Manager Modal ──────────────────────────────
function CLOModal({ course, onClose }) {
  const [clos, setCLOs] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ clo_number: '', description: '', bloom_level: '' })
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  useEffect(() => {
    adminAPI.getCourseCLOs(course.id)
      .then(r => setCLOs(r.data.data?.clos || []))
      .catch(() => toast.error('Failed to load CLOs'))
      .finally(() => setLoading(false))
  }, [course.id])

  const handleAdd = async () => {
    if (!form.clo_number || !form.description) { toast.error('CLO number and description required'); return }
    setAdding(true)
    try {
      const res = await adminAPI.createCLO(course.id, form)
      setCLOs(p => [...p, res.data.data])
      setForm({ clo_number: '', description: '', bloom_level: '' })
      toast.success('CLO added')
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to add CLO') }
    finally { setAdding(false) }
  }

  const BLOOM = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create']

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-800">Course Learning Outcomes</h3>
            <p className="text-slate-400 text-sm">{course.name} ({course.code})</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl"><X size={18} className="text-slate-500" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Existing CLOs */}
          {loading ? <div className="flex justify-center py-8"><Loader2 className="animate-spin text-blue-600" /></div>
            : clos.length === 0 ? <p className="text-slate-400 text-sm text-center py-6">No CLOs added yet</p>
            : (
              <div className="space-y-2">
                {clos.map((c, idx) => (
                  <div key={c.id || idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-lg flex-shrink-0 mt-0.5">CLO-{c.clo_number}</span>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700">{c.description}</p>
                      {c.bloom_level && <span className="text-xs text-slate-400">{c.bloom_level}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          {/* Add new CLO */}
          <div className="border border-dashed border-slate-300 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Add New CLO</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">CLO Number *</label>
                <input value={form.clo_number} onChange={e => set('clo_number', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400" placeholder="1" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Bloom's Level</label>
                <select value={form.bloom_level} onChange={e => set('bloom_level', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
                  <option value="">Select level</option>
                  {BLOOM.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Description *</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={2}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-blue-400"
                placeholder="Students will be able to..." />
            </div>
            <button onClick={handleAdd} disabled={adding}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add CLO
            </button>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button onClick={onClose} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors">Done</button>
        </div>
      </div>
    </div>
  )
}

// ── Create / Edit Modal ────────────────────────────
function CourseModal({ course, departments, programs, onClose, onSuccess }) {
  const isEdit = !!course?.id
  const [form, setForm] = useState({
    code: course?.code || '', name: course?.name || '',
    credit_hours: course?.credit_hours || 3,
    lecture_hours: course?.lecture_hours || 2,
    lab_hours: course?.lab_hours || 0,
    department_id: course?.department_id || '',
    program_id: course?.program_id || '',
    semester_level: course?.semester_level || '',
    description: course?.description || '',
    is_elective: course?.is_elective || false,
  })
  const [loading, setLoading] = useState(false)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async () => {
    if (!form.code || !form.name || !form.department_id) { toast.error('Code, name and department required'); return }
    setLoading(true)
    try {
      if (isEdit) { await adminAPI.updateCourse(course.id, form); toast.success('Course updated') }
      else { await adminAPI.createCourse(form); toast.success('Course created') }
      onSuccess(); onClose()
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed') }
    finally { setLoading(false) }
  }

  const inputCls = "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
  const Field = ({ label, req, children }) => (
    <div>
      <label className="block text-slate-500 text-xs font-medium mb-1.5">{label}{req && <span className="text-red-500 ml-0.5">*</span>}</label>
      {children}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-800">{isEdit ? 'Edit Course' : 'Create Course'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl"><X size={18} className="text-slate-500" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Course Code" req>
              <input className={inputCls} value={form.code} onChange={e => set('code', e.target.value.toUpperCase())} placeholder="IT-301" />
            </Field>
            <Field label="Credit Hours">
              <input className={inputCls} type="number" min={1} max={6} value={form.credit_hours} onChange={e => set('credit_hours', parseInt(e.target.value))} />
            </Field>
          </div>
          <Field label="Course Name" req>
            <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Web Technologies" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Department" req>
              <select className={inputCls} value={form.department_id} onChange={e => set('department_id', parseInt(e.target.value))}>
                <option value="">-- Select Department --</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </Field>
            <Field label="Program">
              <select className={inputCls} value={form.program_id} onChange={e => set('program_id', parseInt(e.target.value))}>
                <option value="">-- Select Program --</option>
                {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Lecture Hours">
              <input className={inputCls} type="number" min={0} value={form.lecture_hours} onChange={e => set('lecture_hours', parseInt(e.target.value))} />
            </Field>
            <Field label="Lab Hours">
              <input className={inputCls} type="number" min={0} value={form.lab_hours} onChange={e => set('lab_hours', parseInt(e.target.value))} />
            </Field>
            <Field label="Semester Level">
              <select className={inputCls} value={form.semester_level} onChange={e => set('semester_level', parseInt(e.target.value))}>
                <option value="">--</option>
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Semester {n}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Description">
            <textarea className={inputCls} rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Course description and topics..." />
          </Field>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_elective} onChange={e => set('is_elective', e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
            <span className="text-sm text-slate-600">This is an elective course</span>
          </label>
        </div>
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : isEdit ? 'Save Changes' : 'Create Course'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────
export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [departments, setDepartments] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterDept, setFilterDept] = useState('')
  const [modal, setModal] = useState(null)
  const [cloModal, setCLOModal] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (filterDept) params.department_id = filterDept
      const res = await adminAPI.getCourses(params)
      setCourses(res.data.data?.courses || [])
    } catch { toast.error('Failed to load courses') }
    finally { setLoading(false) }
  }, [filterDept])

  useEffect(() => {
    fetchCourses()
    adminAPI.getDepartments().then(r => setDepartments(r.data.data?.departments || []))
    adminAPI.getPrograms().then(r => setPrograms(r.data.data?.programs || []))
  }, [])

  useEffect(() => { fetchCourses() }, [filterDept])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return
    setDeletingId(id)
    try { await adminAPI.deleteCourse(id); toast.success('Course deleted'); fetchCourses() }
    catch (err) { toast.error(err.response?.data?.message || 'Cannot delete') }
    finally { setDeletingId(null) }
  }

  const filtered = courses.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800">Courses</h1>
          <p className="text-slate-400 text-sm mt-0.5">{courses.length} courses in catalog</p>
        </div>
        <button onClick={() => setModal({})}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <Plus size={16} /> Add Course
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..."
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:border-blue-400 w-64" />
        </div>
        <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none focus:border-blue-400 bg-white">
          <option value="">All Departments</option>
          {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <span className="text-xs text-slate-400 bg-white border border-slate-200 px-3 py-2 rounded-xl">{filtered.length} courses</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Code', 'Course Name', 'Department', 'Credits', 'Sem Level', 'Type', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">{Array.from({ length: 7 }).map((_, j) => (
                  <td key={j} className="px-4 py-3"><div className="h-4 bg-slate-100 rounded-lg" /></td>
                ))}</tr>
              )) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-16 text-slate-400">No courses found</td></tr>
              ) : filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-blue-600 bg-blue-50/50">{c.code}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-700">{c.name}</p>
                      {c.description && <p className="text-xs text-slate-400 truncate max-w-[200px]">{c.description}</p>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{c.department_name || '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-lg">{c.credit_hours} CH</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-center">{c.semester_level ? `Sem ${c.semester_level}` : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${c.is_elective ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {c.is_elective ? 'Elective' : 'Core'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setCLOModal(c)} className="p-1.5 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors" title="Manage CLOs">
                        <List size={14} />
                      </button>
                      <button onClick={() => setModal(c)} className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors" title="Edit">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(c.id)} disabled={deletingId === c.id}
                        className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                        {deletingId === c.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal !== null && (
        <CourseModal course={modal?.id ? modal : null} departments={departments} programs={programs}
          onClose={() => setModal(null)} onSuccess={fetchCourses} />
      )}
      {cloModal && <CLOModal course={cloModal} onClose={() => setCLOModal(null)} />}
    </div>
  )
}
