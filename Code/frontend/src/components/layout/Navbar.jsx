import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Bell, Search, User, LogOut, ChevronDown } from 'lucide-react'
import { authStore } from '../../store/authStore'

const ROLE_COLOR = {
  admin:   'bg-purple-500',
  teacher: 'bg-emerald-500',
  student: 'bg-blue-500',
}

const BASE_URL = 'http://127.0.0.1:8000'

export default function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate()
  const user = authStore.getUser()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Outside click → close dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    authStore.clear()
    navigate('/login')
  }

  const handleProfile = () => {
    setDropdownOpen(false)
    navigate(`/${user?.role}/profile`)
  }

  const avatarUrl = user?.profile_picture_url
    ? `${BASE_URL}${user.profile_picture_url}`
    : null

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

        {/* Avatar + Name + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(p => !p)}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            {/* Avatar */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-8 h-8 rounded-lg object-cover"
              />
            ) : (
              <div className={`w-8 h-8 ${ROLE_COLOR[user?.role]} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                {user?.full_name?.[0]?.toUpperCase() || '?'}
              </div>
            )}

            {/* Name */}
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-slate-700 leading-tight">
                {user?.full_name || 'User'}
              </p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>

            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50">
              <button
                onClick={handleProfile}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <User size={16} className="text-slate-400" />
                My Profile
              </button>
              <div className="my-1 border-t border-slate-100" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}