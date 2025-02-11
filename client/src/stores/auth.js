import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userProfile: (state) => state.user,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error
  },

  actions: {
    async login({ email, password, rememberMe }) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.post('/api/auth/login', {
          email,
          password
        })

        const { token, user } = response.data
        
        this.token = token
        this.user = user
        
        if (rememberMe) {
          localStorage.setItem('token', token)
        }
        
        // 设置 axios 默认 header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        return user
      } catch (error) {
        this.error = error.response?.data?.message || '登录失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.post('/api/auth/register', userData)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || '注册失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await axios.post('/api/auth/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      }
    },

    async fetchUserProfile() {
      if (!this.token) return null
      
      this.loading = true
      try {
        const response = await axios.get('/api/user/profile')
        this.user = response.data
        return response.data
      } catch (error) {
        if (error.response?.status === 401) {
          // Token 已过期或无效
          await this.logout()
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProfile(profileData) {
      this.loading = true
      try {
        const response = await axios.put('/api/user/profile', profileData)
        this.user = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || '更新档案失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    async changePassword({ currentPassword, newPassword }) {
      this.loading = true
      try {
        await axios.put('/api/user/password', {
          currentPassword,
          newPassword
        })
      } catch (error) {
        this.error = error.response?.data?.message || '修改密码失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    async resetPassword(email) {
      this.loading = true
      try {
        await axios.post('/api/auth/reset-password', { email })
      } catch (error) {
        this.error = error.response?.data?.message || '重置密码请求失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 初始化认证状态
    async init() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        try {
          await this.fetchUserProfile()
        } catch (error) {
          console.error('Failed to fetch user profile:', error)
        }
      }
    }
  }
})
