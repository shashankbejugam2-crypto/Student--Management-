import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { studentApi } from '../api/studentApi'
import { HiOutlineArrowLeft, HiOutlineSave } from 'react-icons/hi'
import toast from 'react-hot-toast'

const DEPARTMENTS = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical']
const YEARS = [1, 2, 3, 4]

const emptyForm = {
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    enrollmentNo: '',
    address: '',
    dob: '',
    gender: '',
    status: 'Active',
}

const InputField = ({ label, name, type = 'text', placeholder, value, onChange, error, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-surface-400 mb-1.5">
            {label} <span className="text-red-400">*</span>
        </label>
        <input
            id={`field-${name}`}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-2.5 rounded-xl bg-surface-800/60 border text-white placeholder:text-surface-600 text-sm transition ${error ? 'border-red-500/50' : 'border-surface-700/50 focus:border-primary-500'
                }`}
            {...props}
        />
        {error && (
            <p className="text-xs text-red-400 mt-1">{error}</p>
        )}
    </div>
)

export default function StudentFormPage() {
    const { id } = useParams()
    const isEdit = !!id
    const navigate = useNavigate()

    const [form, setForm] = useState(emptyForm)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(isEdit)

    useEffect(() => {
        if (isEdit) {
            loadStudent()
        }
    }, [id])

    const loadStudent = async () => {
        try {
            const res = await studentApi.getById(id)
            setForm({
                name: res.data.name || '',
                email: res.data.email || '',
                phone: res.data.phone || '',
                department: res.data.department || '',
                year: res.data.year || '',
                enrollmentNo: res.data.enrollmentNo || '',
                address: res.data.address || '',
                dob: res.data.dob || '',
                gender: res.data.gender || '',
                status: res.data.status || 'Active',
            })
        } catch {
            toast.error('Student not found')
            navigate('/students')
        } finally {
            setFetching(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            e.email = 'Invalid email format'
        if (!form.phone.trim()) e.phone = 'Phone is required'
        else if (!/^\d{10}$/.test(form.phone)) e.phone = 'Phone must be 10 digits'
        if (!form.department) e.department = 'Department is required'
        if (!form.year) e.year = 'Year is required'
        if (!form.enrollmentNo.trim()) e.enrollmentNo = 'Enrollment No. is required'
        if (!form.gender) e.gender = 'Gender is required'
        if (!form.dob) e.dob = 'Date of birth is required'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) {
            toast.error('Please fix the errors in the form')
            return
        }
        setLoading(true)
        try {
            const payload = { ...form, year: Number(form.year) }
            if (isEdit) {
                const res = await studentApi.update(id, payload)
                toast.success(res?.message || 'Student updated successfully')
            } else {
                const res = await studentApi.create(payload)
                toast.success(res?.message || 'Student added successfully')
            }
            navigate('/students')
        } catch (err) {
            const errorMsg = err?.response?.data?.message || 'Failed to save student'
            toast.error(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

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
                <div>
                    <h2 className="text-xl font-bold text-white">
                        {isEdit ? 'Edit Student' : 'Add New Student'}
                    </h2>
                    <p className="text-sm text-surface-500">
                        {isEdit ? 'Update student information' : 'Fill in the details to register a new student'}
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-5 sm:p-6 space-y-6">
                {/* Personal Info */}
                <div>
                    <h3 className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-4">
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Full Name" name="name" placeholder="e.g. John Doe" value={form.name} onChange={handleChange} error={errors.name} />
                        <InputField label="Email" name="email" type="email" placeholder="e.g. john@college.edu" value={form.email} onChange={handleChange} error={errors.email} />
                        <InputField label="Phone Number" name="phone" placeholder="e.g. 9876543210" value={form.phone} onChange={handleChange} error={errors.phone} />
                        <InputField label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} error={errors.dob} />
                        <div>
                            <label className="block text-sm font-medium text-surface-400 mb-1.5">
                                Gender <span className="text-red-400">*</span>
                            </label>
                            <select
                                id="field-gender"
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-xl bg-surface-800/60 border text-sm appearance-none cursor-pointer transition ${errors.gender
                                    ? 'border-red-500/50 text-white'
                                    : form.gender
                                        ? 'border-surface-700/50 text-white focus:border-primary-500'
                                        : 'border-surface-700/50 text-surface-600 focus:border-primary-500'
                                    }`}
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && (
                                <p className="text-xs text-red-400 mt-1">{errors.gender}</p>
                            )}
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-surface-400 mb-1.5">
                                Address
                            </label>
                            <textarea
                                id="field-address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Enter full address"
                                className="w-full px-4 py-2.5 rounded-xl bg-surface-800/60 border border-surface-700/50 text-white placeholder:text-surface-600 text-sm focus:border-primary-500 transition resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Academic Info */}
                <div>
                    <h3 className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-4">
                        Academic Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField
                            label="Enrollment Number"
                            name="enrollmentNo"
                            placeholder="e.g. CS2024001"
                            value={form.enrollmentNo}
                            onChange={handleChange}
                            error={errors.enrollmentNo}
                        />
                        <div>
                            <label className="block text-sm font-medium text-surface-400 mb-1.5">
                                Department <span className="text-red-400">*</span>
                            </label>
                            <select
                                id="field-department"
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-xl bg-surface-800/60 border text-sm appearance-none cursor-pointer transition ${errors.department
                                    ? 'border-red-500/50 text-white'
                                    : form.department
                                        ? 'border-surface-700/50 text-white focus:border-primary-500'
                                        : 'border-surface-700/50 text-surface-600 focus:border-primary-500'
                                    }`}
                            >
                                <option value="">Select department</option>
                                {DEPARTMENTS.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                            {errors.department && (
                                <p className="text-xs text-red-400 mt-1">{errors.department}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-400 mb-1.5">
                                Year <span className="text-red-400">*</span>
                            </label>
                            <select
                                id="field-year"
                                name="year"
                                value={form.year}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-xl bg-surface-800/60 border text-sm appearance-none cursor-pointer transition ${errors.year
                                    ? 'border-red-500/50 text-white'
                                    : form.year
                                        ? 'border-surface-700/50 text-white focus:border-primary-500'
                                        : 'border-surface-700/50 text-surface-600 focus:border-primary-500'
                                    }`}
                            >
                                <option value="">Select year</option>
                                {YEARS.map((y) => (
                                    <option key={y} value={y}>
                                        Year {y}
                                    </option>
                                ))}
                            </select>
                            {errors.year && (
                                <p className="text-xs text-red-400 mt-1">{errors.year}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-400 mb-1.5">
                                Status
                            </label>
                            <select
                                id="field-status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-surface-800/60 border border-surface-700/50 text-white text-sm appearance-none cursor-pointer focus:border-primary-500 transition"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 rounded-xl text-sm font-medium text-surface-300 bg-surface-700/50 hover:bg-surface-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        id="submit-student-btn"
                        type="submit"
                        disabled={loading}
                        className="flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 shadow-lg shadow-primary-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving…
                            </>
                        ) : (
                            <>
                                <HiOutlineSave size={16} />
                                {isEdit ? 'Update Student' : 'Add Student'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
