import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem('csms_user')
        if (stored) {
            try {
                setUser(JSON.parse(stored))
            } catch {
                localStorage.removeItem('csms_user')
            }
        }
        setLoading(false)
    }, [])

    const login = async (username, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                'https://student-management-production-165c.up.railway.app/api/auth/login',
                { username, password },
                config
            );

            // data contains: _id, name, username, role, token
            const userData = {
                username: data.username,
                role: data.role,
                name: data.name,
                token: data.token,
                loginTime: new Date().toISOString(),
            };

            setUser(userData);
            localStorage.setItem('csms_user', JSON.stringify(userData));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Invalid credentials'
            };
        }
    };

    const logout = () => {
        setUser(null)
        localStorage.removeItem('csms_user')
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
