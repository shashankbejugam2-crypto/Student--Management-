import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { HiOutlineAcademicCap, HiOutlineLockClosed, HiOutlineUser, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import toast from 'react-hot-toast'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!username || !password) {
            toast.error('Please enter both username and password')
            return
        }
        setLoading(true)
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 600))
        const result = await login(username, password)
        setLoading(false)
        if (result.success) {
            toast.success('Welcome back, Principal!')
            navigate('/')
        } else {
            toast.error(result.message || 'Invalid credentials')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Background effects & Animation */}
            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                {/* Glowing orbs */}
                <div className="absolute top-1/4 -left-32 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-0 w-[40rem] h-[40rem] bg-purple-600/10 rounded-full blur-3xl animate-float-delayed" />

                {/* Animated Background SVG */}
                <div className="absolute opacity-30 pointer-events-none animate-slide-in-right w-full max-w-4xl px-4">
                    <div className="flex justify-center">
                        <img
                            src="/animated-greeting.svg"
                            alt="Background Graduation Animation"
                            className="w-full h-auto object-contain blur-[1px]"
                        />
                    </div>
                </div>
            </div>

            {/* Login Form Container */}
            <div className="relative w-full max-w-md animate-scale-in z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/30 mb-4">
                        <HiOutlineAcademicCap className="text-white" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-1">
                        College Student Management
                    </h1>
                    <p className="text-surface-400 text-sm">Sign in to manage your institution</p>
                </div>

                {/* Login Card */}
                <div className="glass-card rounded-3xl p-6 sm:p-8 backdrop-blur-2xl bg-surface-900/60 border-surface-700/50 shadow-2xl">
                    <h2 className="text-lg font-semibold text-white mb-6">Principal Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-surface-400 mb-1.5">
                                Username
                            </label>
                            <div className="relative">
                                <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500" size={18} />
                                <input
                                    id="login-username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-800/80 border border-surface-700/50 text-white placeholder:text-surface-600 focus:border-indigo-500 transition"
                                    placeholder="Enter username"
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-surface-400 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500" size={18} />
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-surface-800/80 border border-surface-700/50 text-white placeholder:text-surface-600 focus:border-indigo-500 transition"
                                    placeholder="Enter password"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in…
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
