import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import StudentListPage from './pages/StudentListPage'
import StudentFormPage from './pages/StudentFormPage'
import StudentDetailPage from './pages/StudentDetailPage'
import DepartmentsListPage from './pages/DepartmentsListPage'
import CreateDepartmentPage from './pages/DepartmentFormPage'


function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar
                onToggleSidebar={() => setSidebarOpen((o) => !o)}
                sidebarOpen={sidebarOpen}
            />
            <div className="flex flex-1">
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/students" element={<StudentListPage />} />
                        <Route path="/students/new" element={<StudentFormPage />} />
                        <Route path="/students/edit/:id" element={<StudentFormPage />} />
                        <Route path="/students/:id" element={<StudentDetailPage />} />
                        <Route path="/departments" element={<DepartmentsListPage />} />
                        <Route path="/departments/new" element={<CreateDepartmentPage />} />
                        <Route path="/departments/edit/:id" element={<CreateDepartmentPage />} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}


export default function App() {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <Routes>
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
            />
            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}
