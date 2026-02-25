import { Menu, Bell, Search } from 'lucide-react'
import { authStore } from '../../store/authStore'

const ROLE_BADGE = {
  admin:   'bg-purple-100 text-purple-700',
  teacher: 'bg-emerald-100 text-emerald-700',
  student: 'bg-blue-100 text-blue-700',
}

export default function Navbar({ onToggleSidebar }) {
  const user = authStore.getUser()

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 flex-shrink-0">
      {/* Toggle */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 rounded-xl text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:bg-slate-200 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-700">{user?.full_name}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
          <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${ROLE_BADGE[user?.role]}`}>
            {user?.role}
          </div>
        </div>
      </div>
    </header>
  )
}