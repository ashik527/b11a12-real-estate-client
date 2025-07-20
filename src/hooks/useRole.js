// src/hooks/useRole.js
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const useRole = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { data: role, isLoading } = useQuery({
    queryKey: ['role', email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/role/${email}`);
      return res.data?.role;
    },
    enabled: !!email,
  });

  return [role, isLoading];
};

export default useRole;
