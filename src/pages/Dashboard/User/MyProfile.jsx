import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch role from server
  const { data: role = 'user', isLoading } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
    enabled: !!user?.email
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-primary p-6 text-center">
        <h2 className="text-2xl font-bold text-white">My Profile</h2>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <div className="avatar">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg">
                <img
                  src={
                    user?.photoURL && user.photoURL.startsWith('http')
                      ? user.photoURL
                      : 'https://i.ibb.co/MkJ3YCwv/pexels-scottwebb-140963.jpg'
                  }
                  alt="User"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = 'https://i.ibb.co/MkJ3YCwv/pexels-scottwebb-140963.jpg';
                  }}
                />
              </div>
            </div>
            {role && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold capitalize shadow-sm">
                {role}
              </div>
            )}
          </div>

          <div className="w-full space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <p className="font-medium text-gray-800">
                {user?.displayName || 'Not provided'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium text-gray-800">
                {user?.email || 'Not provided'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Account Type</p>
              <p className="font-medium text-secondary capitalize">
                {role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;