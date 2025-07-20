import { useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const PropertyBought = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch all offers by the logged-in user
  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ['userOffers', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/user?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation to delete an offer
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/offers/${id}`);
    },
    onSuccess: () => {
      toast.success('Removed successfully');
      refetch();
    },
    onError: () => {
      toast.error('Failed to remove');
    },
  });

  const handleRemove = (id) => {
    if (confirm('Are you sure you want to remove this property?')) {
      removeMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading your offers...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Property Offers</h2>

      {properties.length === 0 ? (
        <p>No offers made yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-md">
              <figure>
                <img src={item.image} alt={item.propertyTitle} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.propertyTitle}</h2>
                <p>Location: {item.location}</p>
                <p>Status: <span className="font-semibold capitalize">{item.status}</span></p>
                <p>Offer: ${item.offerAmount}</p>

                {/* Paid */}
                {item.status === 'bought' && item.transactionId && (
                  <>
                    <p className="text-sm text-green-600 mt-2">
                      ✅ Paid | Transaction ID: {item.transactionId}
                    </p>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="btn btn-sm btn-outline btn-error mt-2"
                    >
                      Remove
                    </button>
                  </>
                )}

                {/* Accepted but not paid yet */}
                {item.status === 'accepted' && !item.transactionId && (
                  <Link
                    to={`/dashboard/payment/${item._id}`}
                    className="btn btn-sm btn-primary mt-3"
                  >
                    Pay
                  </Link>
                )}

                {/* Rejected */}
                {item.status === 'rejected' && (
                  <>
                    <p className="text-sm text-red-500 mt-2">
                      ❌ Your offer was rejected.
                    </p>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="btn btn-sm btn-outline btn-error mt-2"
                    >
                      Remove
                    </button>
                  </>
                )}

                {/* Pending */}
                {item.status === 'pending' && (
                  <p className="text-sm text-yellow-500 mt-2">
                    ⏳ Awaiting agent approval.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyBought;
