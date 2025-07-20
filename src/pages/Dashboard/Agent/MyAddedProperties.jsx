import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

const MyAddedProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['myProperties', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/my?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Added Properties</h2>
      {properties.length === 0 ? (
        <p>No properties added yet.</p>
      ) : (
        <ul className="space-y-2">
          {properties.map((p) => (
            <li key={p._id} className="border p-4 rounded">
              <h3 className="font-semibold">{p.title}</h3>
              <p>Status: {p.status}</p>
              <p>Price Range: ${p.priceMin} - ${p.priceMax}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAddedProperties;
