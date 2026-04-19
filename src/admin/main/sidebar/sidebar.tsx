import React, { useState, useEffect, useRef, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Bell, LogOut, Menu, X, Check, Trash2, User } from 'lucide-react'
import { useIsMobile } from '../../../utils/use-mobile'
import { menuItems } from './SideBarPages';
import splash from '../../../assets/logo1.png';
import { authApi } from '../../../services/auth';
import { StateContext, DispatchContext } from "../../../store";

const SideBar = () => {
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)
  const user = state?.user
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [showAvatarMenu, setShowAvatarMenu] = useState(false)
  const [profile, setProfile] = useState(null)
  const avatarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
    fetchProfile();
  }, [isMobile])

  const fetchProfile = async () => {
    try {
      const response = await authApi.getProfile();
      setProfile(response)
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    }
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    window.location.href = '/'
  }

  const handleViewProfile = () => {
    setShowAvatarMenu(false)
    navigate('/admin/profile')
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setShowAvatarMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 flex items-center justify-between px-4 md:hidden">
        <img src={splash} alt="K&T Financial" className="w-8 h-8 rounded-lg object-cover" />
      </div>
    )
  }

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-white shadow-lg flex flex-col z-30">
      <div className="p-6 border-b">
        <div className="flex flex-col items-center justify-center space-y-2">
          <img src={splash} alt="K&T Financial" className="w-12 h-12 rounded-lg object-cover" />
          <span className="text-xl font-bold text-gray-800">K&T Financial</span>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={() => {
                    if (isMobile) {
                      setSidebarOpen(false)
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                      ? 'bg-amber-50 text-amber-600 border-r-2 border-amber-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`
                  }
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className="font-medium capitalize">{item.name}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-3">
        <div className="relative" ref={avatarRef}>
          <button
            onClick={() => setShowAvatarMenu(!showAvatarMenu)}
            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              {profile?.attributes?.image ? (
                <img
                  src={profile?.attributes?.image?.attributes?.url}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-sm">
                  {profile?.attributes?.name?.charAt(0) || "--"}
                </span>
              )}
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {profile?.attributes?.name || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {profile?.attributes?.email || '--'}
              </p>
            </div>
          </button>

          {showAvatarMenu && (
            <div className="absolute bottom-full left-0 w-48 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <button
                onClick={handleViewProfile}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-200 rounded-t-lg"
              >
                <User size={18} />
                <span className="text-sm">View Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors rounded-b-lg"
              >
                <LogOut size={18} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SideBar
