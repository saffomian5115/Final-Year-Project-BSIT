import { useState, useEffect } from 'react'
import { adminAPI } from '../../api/admin.api'
import { formatCurrency } from '../../utils/helpers'
import toast from 'react-hot-toast'
import { Plus, Pencil, CreditCard, Loader2, X, DollarSign } from 'lucide-react'

function FeeStructureModal({ structure, programs, onClose, onSuccess }) {
  const isEdit = !!structure?.id
  const [form, setForm] = useState({
    program_id: structure?.program_id || '',
    semester_number: structure?.semester_number || 1,
    tuition_fee: structure?.tuition_fee || 35000,
    admission_fee: structure?.admission_fee || 0,
    library_fee: structure?.library_fee || 1000,
    sports_fee: structure?.sports_fee || 500,
    other_fees: structure?.other_fees || [],
    valid_from: structure?.valid_from || new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [otherFee, setOtherFee] = useState({ name: '', amount: '' })
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const totalFee = parseFloat(form.tuition_fee || 0) + parseFloat(form.admission_fee || 0) +
    parseFloat(form.library_fee || 0) + parseFloat(form.sports_fee || 0) +
    (form.other_fees || []).reduce((sum, f) => sum + parseFloat(f.amount || 0), 0)

  const addOtherFee = () => {
    if (!otherFee.name || !otherFee.amount) return
    setForm(p => ({ ...p, other_fees: [...(p.other_fees || []), { name: otherFee.name, amount: parseFloat(otherFee.amount) }] }))
    setOtherFee({ name: '', amount: '' })
  }
  const removeOtherFee = (i) => setForm(p => ({ ...p, other_fees: p.other_fees.filter((_, idx) => idx !== i) }))

  const handleSubmit = async () => {
    if (!form.program_id) { toast.error('Program is required'); return }
    setLoading(true)
    try {
      if (isEdit) { await adminAPI.updateFeeStructure(structure.id, form); toast.success('Fee structure updated') }
      else { await adminAPI.createFeeStructure(form); toast.success('Fee structure created') }
      onSuccess(); onClose()
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed') }
    finally { setLoading(false) }
  }

  const inputCls = "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-blue-400 transition-all"
  const Field = ({ label, children }) => (
    <div>
      <label className="block text-xs text-slate-500 font-medium mb-1.5">{label}</label>
      {children}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-800">{isEdit ? 'Edit Fee Structure' : 'Create Fee Structure'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl"><X size={18} className="text-slate-500" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Program *">
              <select className={inputCls} value={form.program_id} onChange={e => set('program_id', parseInt(e.target.value))}>
                <option value="">-- Select Program --</option>
                {programs.map(p => <option key={p.id} value={p.id}>{p.name} ({p.code})</option>)}
              </select>
            </Field>
            <Field label="Semester Number">
              <select className={inputCls} value={form.semester_number} onChange={e => set('semester_number', parseInt(e.target.value))}>
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Semester {n}</option>)}
              </select>
            </Field>
          </div>

          {/* Fee Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tuition Fee (Rs.)">
              <input className={inputCls} type="number" value={form.tuition_fee} onChange={e => set('tuition_fee', parseFloat(e.target.value))} />
            </Field>
            <Field label="Admission Fee (Rs.)">
              <input className={inputCls} type="number" value={form.admission_fee} onChange={e => set('admission_fee', parseFloat(e.target.value))} />
            </Field>
            <Field label="Library Fee (Rs.)">
              <input className={inputCls} type="number" value={form.library_fee} onChange={e => set('library_fee', parseFloat(e.target.value))} />
            </Field>
            <Field label="Sports Fee (Rs.)">
              <input className={inputCls} type="number" value={form.sports_fee} onChange={e => set('sports_fee', parseFloat(e.target.value))} />
            </Field>
          </div>

          {/* Other Fees */}
          <div>
            <label className="block text-xs text-slate-500 font-medium mb-2">Other Fees</label>
            {form.other_fees?.length > 0 && (
              <div className="space-y-2 mb-2">
                {form.other_fees.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                    <span className="flex-1 text-sm text-slate-700">{f.name}</span>
                    <span className="text-sm font-medium text-slate-700">{formatCurrency(f.amount)}</span>
                    <button onClick={() => removeOtherFee(i)} className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg">
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input value={otherFee.name} onChange={e => setOtherFee(p => ({ ...p, name: e.target.value }))}
                placeholder="Fee name" className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
              <input value={otherFee.amount} onChange={e => setOtherFee(p => ({ ...p, amount: e.target.value }))} type="number"
                placeholder="Amount" className="w-28 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
              <button onClick={addOtherFee} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-medium transition-colors">
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex justify-between items-center">
            <span className="text-blue-700 font-semibold text-sm">Total Fee per Semester</span>
            <span className="text-blue-800 font-display font-bold text-xl">{formatCurrency(totalFee)}</span>
          </div>

          <Field label="Valid From">
            <input className={inputCls} type="date" value={form.valid_from} onChange={e => set('valid_from', e.target.value)} />
          </Field>
        </div>
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : isEdit ? 'Save Changes' : 'Create Structure'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FeeStructurePage() {
  const [structures, setStructures] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterProgram, setFilterProgram] = useState('')
  const [modal, setModal] = useState(null)

  const fetchStructures = async () => {
    setLoading(true)
    try {
      const res = await adminAPI.getFeeStructures(filterProgram || undefined)
      setStructures(res.data.data?.structures || [])
    } catch { toast.error('Failed to load fee structures') }
    finally { setLoading(false) }
  }

  useEffect(() => {
    fetchStructures()
    adminAPI.getPrograms().then(r => setPrograms(r.data.data?.programs || []))
  }, [filterProgram])

  const totalByProgram = (programId) => structures.filter(s => s.program_id === programId).length

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800">Fee Structure</h1>
          <p className="text-slate-400 text-sm mt-0.5">Configure semester-wise fee for each program</p>
        </div>
        <button onClick={() => setModal({})}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <Plus size={16} /> Add Structure
        </button>
      </div>

      {/* Filter */}
      <select value={filterProgram} onChange={e => setFilterProgram(e.target.value)}
        className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 focus:outline-none bg-white min-w-[200px]">
        <option value="">All Programs</option>
        {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Program', 'Semester', 'Tuition', 'Admission', 'Library', 'Sports', 'Other', 'Total', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">{Array.from({ length: 9 }).map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-slate-100 rounded-lg" /></td>
                  ))}</tr>
                ))
              ) : structures.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <div className="flex flex-col items-center justify-center py-16">
                      <CreditCard size={36} className="text-slate-300 mb-3" />
                      <p className="font-semibold text-slate-600">No fee structures configured</p>
                      <p className="text-slate-400 text-sm mt-1">Add fee structure for each program and semester</p>
                    </div>
                  </td>
                </tr>
              ) : structures.map(s => {
                const otherTotal = (s.other_fees || []).reduce((sum, f) => sum + parseFloat(f.amount || 0), 0)
                const total = parseFloat(s.tuition_fee || 0) + parseFloat(s.admission_fee || 0) +
                  parseFloat(s.library_fee || 0) + parseFloat(s.sports_fee || 0) + otherTotal
                return (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-700">{s.program_name || 'N/A'}</p>
                      <p className="text-xs text-slate-400">{s.program_code}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-lg">Sem {s.semester_number}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{formatCurrency(s.tuition_fee)}</td>
                    <td className="px-4 py-3 text-slate-500">{s.admission_fee > 0 ? formatCurrency(s.admission_fee) : '—'}</td>
                    <td className="px-4 py-3 text-slate-500">{formatCurrency(s.library_fee)}</td>
                    <td className="px-4 py-3 text-slate-500">{formatCurrency(s.sports_fee)}</td>
                    <td className="px-4 py-3 text-slate-500">{otherTotal > 0 ? formatCurrency(otherTotal) : '—'}</td>
                    <td className="px-4 py-3 font-display font-bold text-slate-800">{formatCurrency(total)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setModal(s)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modal !== null && (
        <FeeStructureModal
          structure={modal?.id ? modal : null}
          programs={programs}
          onClose={() => setModal(null)}
          onSuccess={fetchStructures}
        />
      )}
    </div>
  )
}
