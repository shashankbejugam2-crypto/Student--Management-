import axios from 'axios';

const API_BASE_URL = 'https://student-management-production-165c.up.railway.app/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem('csms_user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ============ API FUNCTIONS ============

export const studentApi = {
    getAll: async (search = '') => {
        const res = await api.get(`/students${search ? `?search=${search}` : ''}`);
        return res.data;
    },

    getById: async (id) => {
        const res = await api.get(`/students/${id}`);
        return res.data;
    },

    create: async (studentData) => {
        const res = await api.post('/students', studentData);
        return res.data;
    },

    update: async (id, studentData) => {
        const res = await api.put(`/students/${id}`, studentData);
        return res.data;
    },

    delete: async (id) => {
        const res = await api.delete(`/students/${id}`);
        return res.data;
    },

    getStats: async () => {
        const res = await api.get('/students/stats');
        return res.data;
    },
};

export default api;
