import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export const queryFormService = {
    async getOrderForms(params = {}) {
        const {
            page = 1,
            rowsPerPage = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            search = ''
        } = params;

        try {
            const response = await api.get(API_ENDPOINTS.QUERY_FORMS, {
                params: {
                    page,
                    rowsPerPage,
                    sortBy,
                    sortOrder,
                    search
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch order forms');
        }
    },

    async deleteQueryForm(id) {
        try {
            await api.delete(`${API_ENDPOINTS.QUERY_FORMS}/${id}`);
            return { success: true };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete query form');
        }
    }
};