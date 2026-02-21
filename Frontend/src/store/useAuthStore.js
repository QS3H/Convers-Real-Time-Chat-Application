import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';

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
   set({ isSigningUp: true });
   try {
    const res = await axiosInstance.post("/auth/signup", data);
    set({ authUser: res.data, isAuthenticated: true });
    toast.success("Account created successfully");

   } catch (error) {
    console.error("Error signing up:", error);
    toast.error(error.response?.data?.message || "Signup failed");
    
   } finally {
    set({ isSigningUp: false });
   }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data, isAuthenticated: true });
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, isAuthenticated: false });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  }
}));
