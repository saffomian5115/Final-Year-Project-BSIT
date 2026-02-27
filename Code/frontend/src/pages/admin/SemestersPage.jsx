import { useState, useEffect } from 'react'
import { adminAPI } from '../../api/admin.api'
import { formatDate } from '../../utils/helpers'
import toast from 'react-hot-toast'
import { Plus, Pencil, Calendar, Loader2, X, CheckCircle2, Clock } from 'lucide-react'

function SemesterModal({ sem, onClose, onSuccess }) {
  const isEdit = !!sem?.id
  const [form, setForm] = useState({
    name: sem?.name || '',
    code: sem?.code || '',
    start_date: sem?.start_date || '',
    end_date: sem?.end_date || '',
    registration_start: sem?.registration_start || '',
    registration_end: sem?.registration_end || '',
    is_active: sem?.is_active || false,
  })
  const [loading, setLoading] = useState(false)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.start_date || !form.end_date) { toast.error('Name, start and end date required'); return }
    setLoading(true)
    try {
      if (isEdit) { await adminAPI.updateSemester(sem.id, form); toast.success('Semester updated') }
      else { await adminAPI.createSemester(form); toast.success('Semester created') }
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
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-800">{isEdit ? 'Edit Semester' : 'Add Semester'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><X size={18} className="text-slate-500" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Semester Name" req>
              <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Spring 2025" />
            </Field>
            <Field label="Code">
              <input className={inputCls} value={form.code} onChange={e => set('code', e.target.value)} placeholder="SP-2025" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date" req>
              <input className={inputCls} type="date" value={form.start_date} onChange={e => set('start_date', e.target.value)} />
            </Field>
            <Field label="End Date" req>
              <input className={inputCls} type="date" value={form.end_date} onChange={e => set('end_date', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Registration Start">
              <input className={inputCls} type="date" value={form.registration_start} onChange={e => set('registration_start', e.target.value)} />
            </Field>
            <Field label="Registration End">
              <input className={inputCls} type="date" value={form.registration_end} onChange={e => set('registration_end', e.target.value)} />
            </Field>
          </div>
          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
            <div>
              <p className="text-sm font-medium text-slate-700">Set as Active Semester</p>
              <p className="text-xs text-slate-400">Only one semester can be active at a time</p>
            </div>
          </label>
        </div>
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : isEdit ? 'Save Changes' : 'Create Semester'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SemestersPage() {
  const [semesters, setSemesters] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)

  const fetchSemesters = async () => {
    setLoading(true)
    try {
      const res = await adminAPI.getSemesters()
      setSemesters(res.data.data?.semesters || [])
    } catch { toast.error('Failed to load semesters') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchSemesters() }, [])

  const getDuration = (start, end) => {
    if (!start || !end) return '—'
    const months = Math.round((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24 * 30))
    return `${months} months`
  }

  const getStatus = (sem) => {
    if (sem.is_active) return { label: 'Active', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
    const now = new Date()
    const end = new Date(sem.end_date)
    const start = new Date(sem.start_date)
    if (end < now) return { label: 'Completed', cls: 'bg-slate-100 text-slate-500 border-slate-200' }
    if (start > now) return { label: 'Upcoming', cls: 'bg-blue-100 text-blue-700 border-blue-200' }
    return { label: 'Inactive', cls: 'bg-orange-100 text-orange-700 border-orange-200' }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800">Semesters</h1>
          <p className="text-slate-400 text-sm mt-0.5">{semesters.length} semesters configured</p>
        </div>
        <button onClick={() => setModal({})}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <Plus size={16} /> Add Semester
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse flex gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded-lg w-1/3" />
                <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : semesters.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center py-20">
          <Calendar size={40} className="text-slate-300 mb-3" />
          <p className="font-semibold text-slate-600">No semesters configured</p>
        </div>
      ) : (
        <div className="space-y-3">
          {semesters.map(sem => {
            const status = getStatus(sem)
            return (
              <div key={sem.id} className={`bg-white rounded-2xl border p-5 flex items-center gap-5 hover:shadow-sm transition-shadow group ${sem.is_active ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-slate-200'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${sem.is_active ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                  {sem.is_active
                    ? <CheckCircle2 size={22} className="text-emerald-600" />
                    : <Calendar size={22} className="text-slate-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-bold text-slate-800">{sem.name}</h3>
                    {sem.code && <span className="bg-slate-100 text-slate-500 text-xs font-mono px-2 py-0.5 rounded-lg">{sem.code}</span>}
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${status.cls}`}>{status.label}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {formatDate(sem.start_date)} → {formatDate(sem.end_date)}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {getDuration(sem.start_date, sem.end_date)}</span>
                    {sem.registration_start && (
                      <span>Reg: {formatDate(sem.registration_start)} → {formatDate(sem.registration_end)}</span>
                    )}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setModal(sem)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-xl text-xs font-medium transition-colors">
                    <Pencil size={12} /> Edit
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal !== null && (
        <SemesterModal
          sem={modal?.id ? modal : null}
          onClose={() => setModal(null)}
          onSuccess={fetchSemesters}
        />
      )}
    </div>
  )
}
