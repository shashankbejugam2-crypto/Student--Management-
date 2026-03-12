import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { studentApi } from '../api/studentApi'
import StatsCard from '../components/StatsCard'
import {
    HiOutlineUsers,
    HiOutlineCheckCircle,
    HiOutlineXCircle,
    HiOutlineOfficeBuilding,
    HiOutlineArrowRight,
    HiOutlineUserAdd,
} from 'react-icons/hi'

export default function DashboardPage() {
    const [stats, setStats] = useState(null)
    const [recentStudents, setRecentStudents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboard()
    }, [])

    const loadDashboard = async () => {
        try {
            const [statsRes, studentsRes] = await Promise.all([
                studentApi.getStats(),
                studentApi.getAll(),
            ])
            setStats(statsRes.data)
            setRecentStudents(studentsRes.data.slice(-5).reverse())
        } catch (err) {
            console.error('Failed to load dashboard:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Welcome Banner */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    Welcome back, <span className="gradient-text">Principal</span> 👋
                </h2>
                <p className="text-surface-400 text-sm sm:text-base">
                    Here&apos;s an overview of your institution&apos;s student records.
                </p>
                <Link
                    to="/students/new"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 shadow-lg shadow-primary-500/20 transition-all duration-300"
                >
                    <HiOutlineUserAdd size={18} /> Add New Student
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    icon={HiOutlineUsers}
                    label="Total Students"
                    value={stats?.total || 0}
                    color="indigo"
                    delay={0}
                />
                <StatsCard
                    icon={HiOutlineCheckCircle}
                    label="Active"
                    value={stats?.active || 0}
                    color="green"
                    delay={80}
                />
                <StatsCard
                    icon={HiOutlineXCircle}
                    label="Inactive"
                    value={stats?.inactive || 0}
                    color="red"
                    delay={160}
                />
                <StatsCard
                    icon={HiOutlineOfficeBuilding}
                    label="Departments"
                    value={stats?.departments ? Object.keys(stats.departments).length : 0}
                    color="purple"
                    delay={240}
                />
            </div>

            {/* Department Breakdown + Recent Students */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Department Breakdown */}
                <div className="glass-card rounded-2xl p-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <h3 className="font-semibold text-white mb-4">Department Breakdown</h3>
                    <div className="space-y-3">
                        {stats?.departments &&
                            Object.entries(stats.departments).map(([dept, count]) => {
                                const percentage = stats.total ? Math.round((count / stats.total) * 100) : 0
                                return (
                                    <div key={dept}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-surface-300">{dept}</span>
                                            <span className="text-surface-500">
                                                {count} ({percentage}%)
                                            </span>
                                        </div>
                                        <div className="w-full h-2 rounded-full bg-surface-800/60 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-1000 ease-out"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>

                {/* Recent Students */}
                <div className="glass-card rounded-2xl p-5 animate-slide-up" style={{ animationDelay: '300ms' }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white">Recent Students</h3>
                        <Link
                            to="/students"
                            className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition"
                        >
                            View all <HiOutlineArrowRight size={12} />
                        </Link>
                    </div>
                    <div className="space-y-2.5">
                        {recentStudents.map((student) => (
                            <Link
                                key={student.id}
                                to={`/students/${student.id}`}
                                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-700/30 transition group"
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                    {student.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-surface-200 truncate group-hover:text-white transition">
                                        {student.name}
                                    </p>
                                    <p className="text-xs text-surface-500">{student.department}</p>
                                </div>
                                <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${student.status === 'Active'
                                            ? 'bg-emerald-500/15 text-emerald-400'
                                            : 'bg-red-500/15 text-red-400'
                                        }`}
                                >
                                    {student.status}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Year-wise Stats */}
            {stats?.yearWise && (
                <div className="glass-card rounded-2xl p-5 animate-slide-up" style={{ animationDelay: '400ms' }}>
                    <h3 className="font-semibold text-white mb-4">Year-wise Distribution</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {Object.entries(stats.yearWise)
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([year, count]) => (
                                <div
                                    key={year}
                                    className="glass-light rounded-xl p-4 text-center hover:glow-sm transition-all duration-300"
                                >
                                    <p className="text-2xl font-bold text-white mb-0.5">{count}</p>
                                    <p className="text-xs text-surface-400">{year}</p>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}
