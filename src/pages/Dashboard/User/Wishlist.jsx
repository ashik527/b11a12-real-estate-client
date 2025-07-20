// src/pages/Dashboard/User/Wishlist.jsx
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: wishlist = [], refetch } = useQuery({
    queryKey: ['wishlist', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user?.email}`);
      //  Hide items with status "bought" — they were paid and should be gone
      return res.data.filter(item => item.status !== 'bought');
    },
    enabled: !!user?.email
  });

  const handleRemove = async (id) => {
    try {
      const res = await axiosSecure.delete(`/wishlist/${id}`);
      if (res.status === 200) {
        toast.success('Removed from wishlist');
        refetch();
      }
    } catch (err) {
      console.error('❌ Remove wishlist error:', err);
      toast.error('Failed to remove item');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>You have no wishlisted properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-xl">
              <figure><img src={item.image} alt={item.propertyTitle} /></figure>
              <div className="card-body">
                <h2 className="card-title">{item.propertyTitle}</h2>
                <p>Location: {item.location}</p>
                <p>Price Range: ${item.priceMin} - ${item.priceMax}</p>
                <p>Agent: {item.agentName}</p>
                <p>
                  Status:{' '}
                  <span className={`font-medium capitalize ${item.status === 'pending' ? 'text-warning' :
                      item.status === 'accepted' ? 'text-success' :
                        item.status === 'rejected' ? 'text-error' : 'text-gray-400'
                    }`}>
                    {item.status ? item.status : 'Not offered yet'}
                  </span>
                </p>

                <div className="flex justify-between mt-4">
                  {item.status === 'pending' && (
                    <Link
                      to={`/dashboard/make-offer/${item._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Make Offer
                    </Link>
                  )}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
