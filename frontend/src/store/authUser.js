import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  user: null,
  isSignUp: false,
  isCheckingAuth: false,
  isLoggedOut: false,
  isLoggedIn: false,
  signUp: async (credentials) => {
    set({ isSignUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSignUp: false });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error.response.data.message || "Signup error");
      set({ isSignUp: false, user: null });
    }
  },
  logIn: async (credentials) => {
    set({ isLoggedIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggedIn: false });
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response.data.message || "Login error");
      set({ isLoggedIn: false, user: null });
    }
  },
  logout: async () => {
    set({ isLoggedOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggedOut: false });
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error.response.data.message || "Logout error");
      set({ isLoggedOut: false });
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch {
      set({ user: null, isCheckingAuth: false });
      // toast.error(error.response.data.message || "Auth check error");
    }
  },
}))