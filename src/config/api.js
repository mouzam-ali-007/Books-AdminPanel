// API configuration
export const PROD_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://test-apid.vercel.app';

// 
export const API_ENDPOINTS = {
    ORDER_FORMS: '/api/getAllOrder',
    GET_ALL_REVIEWS: '/api/getAllReviews',
    UPDATE_REVIEW: '/api/updateReview',
    UPDATE_ORDER: '/api/updateOrder',
    DELETE_ORDER: '/api/deleteOrder'
};