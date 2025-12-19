import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export const queryFormService = {
    async getOrderForms() {
       

        try {
            const response = await api.get(API_ENDPOINTS.ORDER_FORMS, {
               
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch order forms');
        }
    },

    async getAllReviews() {
        try {
            const response = await api.get(API_ENDPOINTS.GET_ALL_REVIEWS);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
        }
    },

    async updateReviewStatus(id, data) {
        try {
            const response = await api.put(`${API_ENDPOINTS.UPDATE_REVIEW}/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update review status');
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