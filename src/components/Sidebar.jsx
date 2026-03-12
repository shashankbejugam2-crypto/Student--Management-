import { NavLink } from 'react-router-dom'
import {
    HiOutlineHome,
    HiOutlineUsers,
    HiOutlineUserAdd,
    HiOutlineChartBar,
    HiOutlineX,
    HiOutlineOfficeBuilding,
} from 'react-icons/hi'

const navItems = [
    { to: '/', icon: HiOutlineHome, label: 'Dashboard' },
    { to: '/students', icon: HiOutlineUsers, label: 'Students' },
    { to: '/students/new', icon: HiOutlineUserAdd, label: 'Add Student' },
    { to: '/departments', icon: HiOutlineOfficeBuilding, label: 'Departments' },
]


export default function Sidebar({ open, onClose }) {
    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full w-64 glass-card pt-6 pb-4 px-4
          transform transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-0 lg:h-auto lg:min-h-[calc(100vh-70px)]
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {/* Close btn (mobile) */}
                <button
                    onClick={onClose}
                    className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg hover:bg-surface-700/50 text-surface-400"
                >
                    <HiOutlineX size={20} />
                </button>

                {/* Nav title */}
                <p className="text-xs font-semibold uppercase tracking-wider text-surface-500 mb-4 px-3">
                    Navigation
                </p>

                {/* Nav links */}
                <nav className="space-y-1">
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActive
                                    ? 'bg-primary-500/15 text-primary-300 shadow-sm shadow-primary-500/10'
                                    : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/40'
                                }`
                            }
                        >
                            <Icon
                                size={20}
                                className="shrink-0 group-hover:scale-110 transition-transform"
                            />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom info */}
                <div className="absolute bottom-6 left-4 right-4">
                    <div className="glass-light rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <HiOutlineChartBar size={16} className="text-primary-400" />
                            <span className="text-xs font-semibold text-surface-300">Quick Stats</span>
                        </div>
                        <p className="text-xs text-surface-500">
                            Manage all student records, view analytics, and more from the dashboard.
                        </p>
                    </div>
                </div>
            </aside>
        </>
    )
}
