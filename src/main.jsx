import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: 'rgba(30, 41, 59, 0.9)',
                            color: '#e2e8f0',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(99, 102, 241, 0.2)',
                            borderRadius: '12px',
                        },
                        success: {
                            iconTheme: { primary: '#818cf8', secondary: '#1e293b' },
                        },
                        error: {
                            iconTheme: { primary: '#f87171', secondary: '#1e293b' },
                        },
                    }}
                />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
