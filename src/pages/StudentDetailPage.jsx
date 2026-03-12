import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { studentApi } from '../api/studentApi'
import {
    HiOutlineArrowLeft,
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
    HiOutlineCalendar,
    HiOutlineAcademicCap,
    HiOutlineIdentification,
    HiOutlineOfficeBuilding,
} from 'react-icons/hi'
import ConfirmModal from '../components/ConfirmModal'
import toast from 'react-hot-toast'

export default function StudentDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {
        loadStudent()
    }, [id])

    const loadStudent = async () => {
        try {
            const res = await studentApi.getById(id)
            setStudent(res.data)
        } catch {
            toast.error('Student not found')
            navigate('/students')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            await studentApi.delete(id)
            toast.success('Student deleted')
            navigate('/students')
        } catch {
            toast.error('Failed to delete student')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!student) return null

    const infoItems = [
        { icon: HiOutlineMail, label: 'Email', value: student.email },
        { icon: HiOutlinePhone, label: 'Phone', value: student.phone },
        { icon: HiOutlineCalendar, label: 'Date of Birth', value: student.dob ? new Date(student.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
        { icon: HiOutlineIdentification, label: 'Gender', value: student.gender },
        { icon: HiOutlineLocationMarker, label: 'Address', value: student.address || '—' },
    ]

    const academicItems = [
        { icon: HiOutlineIdentification, label: 'Enrollment No.', value: student.enrollmentNo },
        { icon: HiOutlineOfficeBuilding, label: 'Department', value: student.department },
        { icon: HiOutlineAcademicCap, label: 'Year', value: `Year ${student.year}` },
        { icon: HiOutlineCalendar, label: 'Enrolled On', value: student.createdAt ? new Date(student.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
    ]

    return (
        <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-xl hover:bg-surface-700/50 text-surface-400 transition"
                >
                    <HiOutlineArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-bold text-white">Student Details</h2>
            </div>

            {/* Profile Card */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-primary-500/25">
                        {student.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{student.name}</h3>
                        <p className="text-sm text-primary-400 mt-0.5">{student.enrollmentNo}</p>
                        <span
                            className={`inline-block mt-1.5 text-xs font-semibold px-3 py-1 rounded-full ${student.status === 'Active'
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-red-500/15 text-red-400 border border-red-500/20'
                                }`}
                        >
                            {student.status}
                        </span>
                    </div>
                    <div className="flex gap-2 self-start">
                        <Link
                            to={`/students/edit/${student.id}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 transition"
                        >
                            <HiOutlinePencil size={16} /> Edit
                        </Link>
                        <button
                            onClick={() => setShowDelete(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition"
                        >
                            <HiOutlineTrash size={16} /> Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal Info */}
            <div className="glass-card rounded-2xl p-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <h3 className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-4">
                    Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {infoItems.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-surface-800/60 flex items-center justify-center shrink-0 mt-0.5">
                                <Icon className="text-primary-400" size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-surface-500">{label}</p>
                                <p className="text-sm text-surface-200 font-medium mt-0.5">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Academic Info */}
            <div className="glass-card rounded-2xl p-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <h3 className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-4">
                    Academic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {academicItems.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-surface-800/60 flex items-center justify-center shrink-0 mt-0.5">
                                <Icon className="text-primary-400" size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-surface-500">{label}</p>
                                <p className="text-sm text-surface-200 font-medium mt-0.5">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Modal */}
            <ConfirmModal
                open={showDelete}
                title="Delete Student"
                message={`Are you sure you want to delete "${student.name}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => setShowDelete(false)}
            />
        </div>
    )
}
