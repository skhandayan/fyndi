import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isVerifying: false,
  isResending: false,
  isCheckingAuth: true,
  message: null,

  signup: async (firstName, lastName, email, password, confirmPassword) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/signup`, { firstName, lastName, email, password, confirmPassword });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, {withCredentials: true});
      const user = response.data.user;
      set({
        isAuthenticated:true, 
        user:response.data.user, 
        error: null,
        isLoading:false
      });
      
      return user;
    } catch (error) {
      set({error:error.response?.data?.message || "Error logging in", isLoading:false})
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null});
    try {
      await axios.post(`${API_URL}/logout`, {withCredentials: true})
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: "Error logging out", 
        isLoading: false
      })
      throw error;
    }
  },
  
  verifyEmail: async (code) => {
    set({ isVerifying: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true, isVerifying: false})
      return response.data
    } catch (error) {
      set({ error: error.response?.data?.message || "Error verifying email", isVerifying: false})
      throw error;
    }
  },

  resendCode: async (email) => {
    set({ isResending: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/resend-code`, { email });
      set({ isResending: false, message: response.data.message });
      return response.data;
    } catch (error) {
      set({ isResending: false, error: error.response?.data?.message || "Failed to resend code" });
      throw error;
    }
  },

  checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true});
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		// eslint-disable-next-line no-unused-vars
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},

  forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},

}));
