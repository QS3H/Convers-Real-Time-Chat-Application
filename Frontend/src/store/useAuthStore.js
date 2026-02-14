import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      const data = res.data;
      set({ isAuthenticated: true, authUser: data.user });
    } catch (error) {
      if (error.response?.status === 401) {
        set({ isAuthenticated: false, authUser: null });
      } else {
        console.error("Error checking authentication:", error);
        set({ isAuthenticated: false, authUser: null });
      }
    }
  },

  signup: async (data) => {
   
  },
}));
