import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageService } from '../services/storageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (usernameOrEmail, password) => {
    try {
      const users = await storageService.getUsers();
      const user = users.find(
        (u) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
      );

      if (user) {
        setUser(user);
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid username/email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const signUp = async (username, email, password) => {
    try {
      const users = await storageService.getUsers();
      
      // Check if username or email already exists
      const usernameExists = users.some(u => u.username === username);
      const emailExists = users.some(u => u.email === email);

      if (usernameExists) {
        return { success: false, error: 'Username already exists' };
      }
      if (emailExists) {
        return { success: false, error: 'Email already exists' };
      }

      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      await storageService.addUser(newUser);
      setUser(newUser);
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Sign up failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

