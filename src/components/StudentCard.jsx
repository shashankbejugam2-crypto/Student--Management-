import { Link } from 'react-router-dom'
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'

export default function StudentCard({ student, onDelete, delay = 0 }) {
    const statusColor =
        student.status === 'Active'
            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
            : 'bg-red-500/15 text-red-400 border-red-500/20'

    return (
        <div
            className="glass-card rounded-2xl p-5 hover:glow-sm transition-all duration-300 hover:-translate-y-1 animate-slide-up group"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/20">
                        {student.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-white text-sm leading-tight">{student.name}</h3>
                        <p className="text-xs text-primary-400 mt-0.5">{student.enrollmentNo}</p>
                    </div>
                </div>
                <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusColor}`}
                >
                    {student.status}
                </span>
            </div>

            {/* Details */}
            <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                    <span className="text-surface-500">Department</span>
                    <span className="text-surface-300 font-medium">{student.department}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-surface-500">Year</span>
                    <span className="text-surface-300 font-medium">Year {student.year}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-surface-500">Email</span>
                    <span className="text-surface-300 font-medium truncate ml-4">{student.email}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-surface-700/50">
                <Link
                    to={`/students/${student.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-primary-400 hover:bg-primary-500/10 transition"
                >
                    <HiOutlineEye size={14} /> View
                </Link>
                <Link
                    to={`/students/edit/${student.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-amber-400 hover:bg-amber-500/10 transition"
                >
                    <HiOutlinePencil size={14} /> Edit
                </Link>
                <button
                    onClick={() => onDelete(student)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition"
                >
                    <HiOutlineTrash size={14} /> Delete
                </button>
            </div>
        </div>
    )
}
