// src/context/AuthProvider.jsx
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); //  add role state
  const [loading, setLoading] = useState(true);

  // Watch user state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/users/role/${currentUser.email}`
          );
          setRole(res.data.role || 'user');
        } catch (err) {
          console.error('Failed to fetch user role:', err);
          setRole('user'); // fallback
        }
      } else {
        setRole(null); // not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem('access-token');
    return signOut(auth);
  };

  const authInfo = {
    user,
    role,        //  provide role to context
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
