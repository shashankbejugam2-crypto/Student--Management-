import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
    HiOutlineMenu,
    HiOutlineX,
    HiOutlineLogout,
    HiOutlineAcademicCap,
} from 'react-icons/hi'

export default function Navbar({ onToggleSidebar, sidebarOpen }) {
    const { user, logout } = useAuth()
    const location = useLocation()

    const getPageTitle = () => {
        const path = location.pathname
        if (path === '/') return 'Dashboard'
        if (path === '/students') return 'Students'
        if (path === '/students/new') return 'Add Student'
        if (path.includes('/edit')) return 'Edit Student'
        if (path.match(/\/students\/.+/)) return 'Student Details'
        return 'Dashboard'
    }

    return (
        <header className="glass sticky top-0 z-40 px-4 py-3 lg:px-6">
            <div className="flex items-center justify-between">
                {/* Left — hamburger + logo */}
                <div className="flex items-center gap-3">
                    <button
                        id="sidebar-toggle"
                        onClick={onToggleSidebar}
                        className="lg:hidden p-2 rounded-xl hover:bg-surface-700/50 text-surface-300 transition"
                    >
                        {sidebarOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
                    </button>

                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
                            <HiOutlineAcademicCap className="text-white" size={20} />
                        </div>
                        <span className="hidden sm:block font-bold text-lg gradient-text">
                            CSMS
                        </span>
                    </Link>
                </div>

                {/* Center — page title */}
                <h1 className="text-base sm:text-lg font-semibold text-surface-200 absolute left-1/2 -translate-x-1/2 hidden md:block">
                    {getPageTitle()}
                </h1>

                {/* Right — user info + logout */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex flex-col items-end mr-1">
                        <span className="text-sm font-medium text-surface-200">{user?.name}</span>
                        <span className="text-xs text-primary-400">{user?.role}</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-primary-500/20">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                    <button
                        id="logout-btn"
                        onClick={logout}
                        className="p-2 rounded-xl hover:bg-red-500/10 text-surface-400 hover:text-red-400 transition"
                        title="Logout"
                    >
                        <HiOutlineLogout size={20} />
                    </button>
                </div>
            </div>
        </header>
    )
}
