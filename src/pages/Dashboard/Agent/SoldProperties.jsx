// src/pages/Dashboard/Agent/SoldProperties.jsx
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthProvider';

const SoldProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: sold = [], isLoading } = useQuery({
    queryKey: ['soldProperties', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/sold?agentEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <p>Loading sold properties...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Sold Properties</h2>
      {sold.length === 0 ? (
        <p>No properties sold yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sold.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow">
              <figure>
                <img src={item.image} alt={item.propertyTitle} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.propertyTitle}</h2>
                <p>Buyer: {item.userEmail}</p>
                <p>Offer: ${item.offerAmount}</p>
                <p>Date: {item.buyingDate}</p>
                <p>Status: ✅ {item.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SoldProperties;
