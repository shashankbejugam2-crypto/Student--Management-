import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { departmentApi } from '../api/departmentApi'
import ConfirmModal from '../components/ConfirmModal'
import {
    HiOutlineSearch,
    HiOutlinePlus,
    HiOutlineOfficeBuilding,
    HiOutlinePencilAlt,
    HiOutlineTrash,
} from 'react-icons/hi'
import toast from 'react-hot-toast'


export default function DepartmentsListPage() {
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [deleteTarget, setDeleteTarget] = useState(null)


    useEffect(() => {
        loadDepartments()
    }, [])

    const loadDepartments = async () => {
        try {
            setLoading(true)
            const res = await departmentApi.getAll()
            setDepartments(res.data)
        } catch (err) {
            toast.error('Failed to load departments')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteTarget) return
        try {
            await departmentApi.delete(deleteTarget.id)
            toast.success(`Department "${deleteTarget.name}" has been removed`)
            setDeleteTarget(null)
            loadDepartments()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete department')
        }
    }


    const filtered = departments.filter((d) => {
        const q = search.toLowerCase()
        return !q || d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q)
    })

    return (
        <div className="relative w-full h-full min-h-[80vh]">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                <div className="absolute top-[20%] -right-20 w-[25rem] h-[25rem] bg-indigo-600/15 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-[10%] -left-20 w-[30rem] h-[30rem] bg-purple-600/15 rounded-full blur-3xl animate-float-delayed" />
            </div>

            <div className="relative z-10 space-y-5 animate-fade-in pb-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-white">Departments</h2>
                        <p className="text-sm text-surface-500">
                            {filtered.length} department{filtered.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                    <Link
                        to="/departments/new"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 shadow-lg shadow-primary-500/20 transition-all duration-300 self-start"
                    >

                        <HiOutlinePlus size={18} /> Add Department
                    </Link>
                </div>

                {/* Search */}
                <div className="glass-card rounded-2xl p-4">
                    <div className="relative">
                        <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500" size={18} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or code…"
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-surface-800/60 border border-surface-700/50 text-white placeholder:text-surface-600 text-sm focus:border-primary-500 transition"
                        />
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
                        <p className="text-surface-500 mb-2">No departments found</p>
                        <p className="text-xs text-surface-600">Try adjusting your search or add a new department</p>
                    </div>
                )}

                {/* Table View */}
                {!loading && filtered.length > 0 && (
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-surface-700/50">
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
                                            Department
                                        </th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
                                            Code
                                        </th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500 hidden md:table-cell">
                                            Description
                                        </th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
                                            Created Date
                                        </th>
                                        <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
                                            Actions
                                        </th>
                                    </tr>

                                </thead>
                                <tbody className="divide-y divide-surface-700/30">
                                    {filtered.map((dept) => (
                                        <tr key={dept.id} className="hover:bg-white/5 hover:backdrop-blur-xl transition-all duration-300">
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-surface-700/50 flex items-center justify-center text-primary-400 shrink-0">
                                                        <HiOutlineOfficeBuilding size={18} />
                                                    </div>
                                                    <span className="font-medium text-white">{dept.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary-500/15 text-primary-300 uppercase tracking-wider">
                                                    {dept.code}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-surface-400 hidden md:table-cell max-w-xs truncate">
                                                {dept.description || '-'}
                                            </td>
                                            <td className="px-5 py-3.5 text-left text-surface-500 text-xs">
                                                {new Date(dept.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-5 py-3.5 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        to={`/departments/edit/${dept.id}`}
                                                        className="p-1.5 rounded-lg text-amber-400 hover:bg-amber-500/10 transition"
                                                        title="Edit"
                                                    >
                                                        <HiOutlinePencilAlt size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => setDeleteTarget(dept)}
                                                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition"
                                                        title="Delete"
                                                    >
                                                        <HiOutlineTrash size={18} />
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
            </div>

            {/* Delete Confirm */}
            <ConfirmModal
                open={!!deleteTarget}
                title="Delete Department"
                message={`Are you sure you want to delete "${deleteTarget?.name}"? All student records associated with this department will remain but will point to a non-existent department.`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </div>

    )
}
