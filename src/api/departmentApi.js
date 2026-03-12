import api from './studentApi';

export const departmentApi = {
    getAll: async () => {
        const res = await api.get('/departments');
        return res.data;
    },

    create: async (departmentData) => {
        const res = await api.post('/departments', departmentData);
        return res.data;
    },
    getById: async (id) => {
        const res = await api.get(`/departments/${id}`);
        return res.data;
    },
    update: async (id, departmentData) => {
        const res = await api.put(`/departments/${id}`, departmentData);
        return res.data;
    },
    delete: async (id) => {
        const res = await api.delete(`/departments/${id}`);
        return res.data;
    },
};

export default departmentApi;
