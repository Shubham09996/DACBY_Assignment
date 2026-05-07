import { createContext, useState, useContext, useEffect } from 'react';
import { loginUserApi, registerUserApi } from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginUserApi(email, password);

    const data = await res.json();
    if (res.ok) {
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    }
    return { success: false, message: data.message };
  };

  const register = async (name, email, password) => {
    const res = await registerUserApi(name, email, password);

    const data = await res.json();
    if (res.ok) {
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    }
    return { success: false, message: data.message };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
