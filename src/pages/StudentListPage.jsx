import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { studentApi } from '../api/studentApi'
import StudentCard from '../components/StudentCard'
import ConfirmModal from '../components/ConfirmModal'
import {
    HiOutlineSearch,
    HiOutlineUserAdd,
    HiOutlineFilter,
    HiOutlineViewGrid,
    HiOutlineViewList,
} from 'react-icons/hi'
import toast from 'react-hot-toast'

export default function StudentListPage() {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filterDept, setFilterDept] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [viewMode, setViewMode] = useState('grid') // grid | list
    const [deleteTarget, setDeleteTarget] = useState(null)

    const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical']

    useEffect(() => {
        loadStudents()
    }, [])

    const loadStudents = async () => {
        try {
            setLoading(true)
            const res = await studentApi.getAll()
            setStudents(res.data)
        } catch (err) {
            toast.error('Failed to load students')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteTarget) return
        try {
            await studentApi.delete(deleteTarget.id)
            toast.success(`${deleteTarget.name} has been removed`)
            setDeleteTarget(null)
            loadStudents()
        } catch (err) {
            toast.error('Failed to delete student')
        }
    }

    // Filter logic
    const filtered = students.filter((s) => {
        const q = search.toLowerCase()
        const matchSearch =
            !q ||
            s.name.toLowerCase().includes(q) ||
            s.enrollmentNo.toLowerCase().includes(q) ||
            s.email.toLowerCase().includes(q)
        const matchDept = !filterDept || s.department === filterDept
        const matchStatus = !filterStatus || s.status === filterStatus
        return matchSearch && matchDept && matchStatus
    })

    return (
        <div className="relative w-full h-full min-h-[80vh]">
            {/* Background effects & Animation for Glassmorphism */}
            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                <div className="absolute top-[10%] -left-20 w-[25rem] h-[25rem] bg-indigo-600/15 rounded-full blur-3xl animate-float" />
                <div className="absolute top-[30%] -right-20 w-[30rem] h-[30rem] bg-purple-600/15 rounded-full blur-3xl animate-float-delayed" />
                <div className="absolute -bottom-32 left-1/3 w-[35rem] h-[35rem] bg-emerald-600/10 rounded-full blur-3xl animate-float" />
            </div>

            <div className="relative z-10 space-y-5 animate-fade-in pb-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-white">All Students</h2>
                        <p className="text-sm text-surface-500">
                            {filtered.length} student{filtered.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                    <Link
                        to="/students/new"
                        id="add-student-btn"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 shadow-lg shadow-primary-500/20 transition-all duration-300 self-start"
                    >
                        <HiOutlineUserAdd size={18} /> Add Student
                    </Link>
                </div>

                {/* Search & Filters */}
                <div className="glass-card rounded-2xl p-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <div className="relative flex-1">
                            <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500" size={18} />
                            <input
                                id="search-input"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name, enrollment, email…"
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-surface-800/60 border border-surface-700/50 text-white placeholder:text-surface-600 text-sm focus:border-primary-500 transition"
                            />
                        </div>

                        {/* Department filter */}
                        <div className="relative">
                            <HiOutlineFilter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500" size={16} />
                            <select
                                id="filter-department"
                                value={filterDept}
                                onChange={(e) => setFilterDept(e.target.value)}
                                className="pl-10 pr-8 py-2.5 rounded-xl bg-surface-800/60 border border-surface-700/50 text-sm text-surface-300 appearance-none cursor-pointer focus:border-primary-500 transition min-w-[160px]"
                            >
                                <option value="">All Departments</option>
                                {departments.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status filter */}
                        <select
                            id="filter-status"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2.5 rounded-xl bg-surface-800/60 border border-surface-700/50 text-sm text-surface-300 appearance-none cursor-pointer focus:border-primary-500 transition min-w-[120px]"
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        {/* View toggle */}
                        <div className="flex rounded-xl border border-surface-700/50 overflow-hidden self-start">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 transition ${viewMode === 'grid'
                                    ? 'bg-primary-500/15 text-primary-400'
                                    : 'text-surface-500 hover:text-surface-300'
                                    }`}
                            >
                                <HiOutlineViewGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 transition ${viewMode === 'list'
                                    ? 'bg-primary-500/15 text-primary-400'
                                    : 'text-surface-500 hover:text-surface-300'
                                    }`}
                            >
                                <HiOutlineViewList size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* No results */}
                {!loading && filtered.length === 0 && (
                    <div className="glass-card rounded-2xl p-12 text-center">
                        <p className="text-surface-500 mb-2">No students found</p>
                        <p className="text-xs text-surface-600">Try adjusting your search or filters</p>
                    </div>
                )}

                {/* Grid View */}
                {!loading && filtered.length > 0 && viewMode === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filtered.map((student, i) => (
                            <StudentCard
                                key={student.id}
                                student={student}
                                onDelete={setDeleteTarget}
                                delay={i * 60}
                            />
                        ))}
                    </div>
                )}

                {/* List View */}
                {!loading && filtered.length > 0 && viewMode === 'list' && (
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-surface-700/50">
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
                                            Student
                                        </th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500 hidden md:table-cell">
                                            Department
                                        </th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500 hidden lg:table-cell">
                                            Email
                                        </th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
                                            Status
                                        </th>
                                        <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-700/30">
                                    {filtered.map((student) => (
                                        <tr key={student.id} className="hover:bg-white/5 hover:backdrop-blur-xl transition-all duration-300">
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">{student.name}</p>
                                                        <p className="text-xs text-surface-500">{student.enrollmentNo}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5 text-surface-400 hidden md:table-cell">
                                                {student.department}
                                            </td>
                                            <td className="px-5 py-3.5 text-surface-400 hidden lg:table-cell">
                                                {student.email}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span
                                                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${student.status === 'Active'
                                                        ? 'bg-emerald-500/15 text-emerald-400'
                                                        : 'bg-red-500/15 text-red-400'
                                                        }`}
                                                >
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        to={`/students/${student.id}`}
                                                        className="px-2.5 py-1.5 rounded-lg text-xs text-primary-400 hover:bg-primary-500/10 transition"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        to={`/students/edit/${student.id}`}
                                                        className="px-2.5 py-1.5 rounded-lg text-xs text-amber-400 hover:bg-amber-500/10 transition"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => setDeleteTarget(student)}
                                                        className="px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Delete Confirm */}
                <ConfirmModal
                    open={!!deleteTarget}
                    title="Delete Student"
                    message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </div>
    )
}
