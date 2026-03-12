import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { departmentApi } from '../api/departmentApi'
import { HiOutlineSave, HiOutlineArrowLeft, HiOutlinePencil } from 'react-icons/hi'
import toast from 'react-hot-toast'

export default function DepartmentFormPage() {
    const { id } = useParams()
    const isEdit = !!id
    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(isEdit)
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
    })

    useEffect(() => {
        if (isEdit) {
            loadDepartment()
        }
    }, [id])

    const loadDepartment = async () => {
        try {
            setFetching(true)
            const res = await departmentApi.getById(id)
            setFormData({
                name: res.data.name || '',
                code: res.data.code || '',
                description: res.data.description || '',
            })
        } catch (err) {
            toast.error('Department not found')
            navigate('/departments')
        } finally {
            setFetching(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (isEdit) {
                await departmentApi.update(id, formData)
                toast.success('Department updated successfully')
            } else {
                await departmentApi.create(formData)
                toast.success('Department created successfully')
            }
            navigate('/departments')
        } catch (err) {
            toast.error(err.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} department`)
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
        <div className="relative w-full h-full min-h-[80vh]">
            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                <div className="absolute top-[20%] -left-20 w-[25rem] h-[25rem] bg-indigo-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto animate-fade-in">
                <button
                    onClick={() => navigate('/departments')}
                    className="group mb-6 flex items-center gap-2 text-surface-400 hover:text-white transition-colors"
                >
                    <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Departments</span>
                </button>

                <div className="glass-card rounded-3xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400">
                            {isEdit ? <HiOutlinePencil size={24} /> : <HiOutlineSave size={24} />}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">
                                {isEdit ? 'Edit Department' : 'Add Department'}
                            </h2>
                            <p className="text-sm text-surface-500">
                                {isEdit ? 'Update department details' : 'Create a new academic department'}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-surface-500 mb-1.5 ml-1">
                                    Department Name <span className="text-primary-500">*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Computer Science & Engineering"
                                    className="w-full px-4 py-3 rounded-xl bg-surface-800/60 border border-surface-700/50 text-white placeholder:text-surface-600 focus:border-primary-500 transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-surface-500 mb-1.5 ml-1">
                                    Department Code <span className="text-primary-500">*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    placeholder="e.g. CSE-101"
                                    className="w-full px-4 py-3 rounded-xl bg-surface-800/60 border border-surface-700/50 text-white placeholder:text-surface-600 focus:border-primary-500 transition-all outline-none uppercase"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-surface-500 mb-1.5 ml-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Brief details about the department..."
                                    className="w-full px-4 py-3 rounded-xl bg-surface-800/60 border border-surface-700/50 text-white placeholder:text-surface-600 focus:border-primary-500 transition-all outline-none resize-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-primary-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Saving...</span>
                                    </div>
                                ) : (
                                    isEdit ? 'Update Department' : 'Create Department'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
