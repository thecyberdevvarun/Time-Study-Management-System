import axios from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If 401 error and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Try to refresh token
      const refreshToken = Cookies.get('refreshToken')
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          })

          const { access_token } = response.data
          Cookies.set('token', access_token)

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`
          return api(originalRequest)
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          Cookies.remove('token')
          Cookies.remove('refreshToken')
          Cookies.remove('user')
          if (typeof window !== 'undefined') {
            toast.error('Session expired. Please login again.')
            window.location.href = '/login'
          }
          return Promise.reject(refreshError)
        }
      } else {
        // No refresh token, redirect to login
        Cookies.remove('token')
        Cookies.remove('user')
        if (typeof window !== 'undefined') {
          toast.error('Session expired. Please login again.')
          window.location.href = '/login'
        }
      }
    }

    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  logout: async () => {
    await api.post('/auth/logout')
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },
}

// Studies API
export const studiesAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/studies', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/studies/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/studies', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`/studies/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/studies/${id}`)
    return response.data
  },

  getCycleTimes: async (id) => {
    const response = await api.get(`/studies/${id}/cycle-times`)
    return response.data
  },
}

// Videos API
export const videosAPI = {
  upload: async (file, studyId, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('study_id', studyId)

    const response = await api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        if (onProgress) onProgress(percentCompleted)
      },
    })

    return response.data
  },

  getStreamUrl: (videoId) => {
    return `${API_BASE_URL}/videos/${videoId}/stream`
  },

  getThumbnail: (videoId) => {
    return `${API_BASE_URL}/videos/${videoId}/thumbnail`
  },
}

// Operations API
export const operationsAPI = {
  create: async (studyId, data) => {
    const response = await api.post(`/studies/${studyId}/operations`, data)
    return response.data
  },

  update: async (operationId, data) => {
    const response = await api.put(`/operations/${operationId}`, data)
    return response.data
  },

  delete: async (operationId) => {
    const response = await api.delete(`/operations/${operationId}`)
    return response.data
  },
}

// Reports API
export const reportsAPI = {
  exportExcel: async (studyId) => {
    const response = await api.get(`/studies/${studyId}/export/excel`, {
      responseType: 'blob',
    })
    return response.data
  },

  exportPDF: async (studyId) => {
    const response = await api.get(`/studies/${studyId}/export/pdf`, {
      responseType: 'blob',
    })
    return response.data
  },
}

// AI Jobs API
export const aiAPI = {
  startDetection: async (studyId) => {
    const response = await api.post(`/studies/${studyId}/ai/detect`)
    return response.data
  },

  getJobStatus: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}/status`)
    return response.data
  },
}

export default api
