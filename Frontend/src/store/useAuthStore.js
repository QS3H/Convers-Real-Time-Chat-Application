import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isAuthenticated: false,
  onlineUsers: [],
  socket: null,

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    
    // Listen for online users
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    
    set({ socket: socket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      const data = res.data;
      set({ isAuthenticated: true, authUser: data });
      get().connectSocket();
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
    get().connectSocket();

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
      get().connectSocket();
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
      get().disconnectSocket();
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data, isAuthenticated: true });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
}));
