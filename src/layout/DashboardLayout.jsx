import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`).then(res => {
        setRole(res.data.role);
      });
    }
  }, [user?.email, axiosSecure]);

  if (!role) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen mt-20">
        <Sidebar role={role} />
        <div className="flex-1 p-4 bg-green-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
