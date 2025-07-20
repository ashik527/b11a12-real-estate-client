// src/routes/AdminRoute.jsx
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useRole from '../hooks/useRole'; // We'll create this next
import Loader from '../components/Loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole(); // custom hook returns role & loading state
  const location = useLocation();

  if (loading || isRoleLoading) return <Loader />;

  if (user && role === 'admin') return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
