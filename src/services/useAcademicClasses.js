

// services/useAcademicClasses.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const useAcademicClasses = () => {
    const [academicClasses, setAcademicClasses] = useState([]);
    const [academicClassesLoading, setAcademicClassesLoading] = useState(false);

    // GET all academic classes
    const loadAcademicClasses = useCallback(async () => {
        setAcademicClassesLoading(true);
        try {
            const response = await api.get('/academic-classes/');
            setAcademicClasses(response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to load academic classes:', error);
            return [];
        } finally {
            setAcademicClassesLoading(false);
        }
    }, []);

    // POST create academic class
    const createAcademicClass = useCallback(async (classData) => {
        try {
            const response = await api.post('/academic-classes/', classData);
            await loadAcademicClasses(); // Refresh list
            return true;
        } catch (error) {
            console.error('Failed to create academic class:', error);
            if (error.response?.status === 403) {
                alert('Only principal can create academic classes');
            } else if (error.response?.data) {
                alert(JSON.stringify(error.response.data));
            }
            return false;
        }
    }, [loadAcademicClasses]);

    return {
        academicClasses,
        academicClassesLoading,
        loadAcademicClasses,
        createAcademicClass,
    };
};