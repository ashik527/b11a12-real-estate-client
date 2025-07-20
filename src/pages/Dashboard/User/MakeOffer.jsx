// src/pages/Dashboard/User/MakeOffer.jsx
import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const MakeOffer = () => {
  const { id } = useParams();
  const { user, role } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch wishlist item by ID
  const { data: item, isLoading } = useQuery({
    queryKey: ['wishlistItem', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const form = e.target;
  const offerAmount = parseFloat(form.offerAmount.value);
  const buyingDate = form.buyingDate.value;

  // Validation
  if (offerAmount < item.priceMin || offerAmount > item.priceMax) {
    toast.error(`Offer must be between $${item.priceMin} and $${item.priceMax}`);
    setLoading(false);
    return;
  }

  const offerData = {
    userEmail: user.email,
    userName: user.displayName,
    propertyId: item.propertyId || item._id,
    propertyTitle: item.propertyTitle,
    location: item.location,
    image: item.image,
    agentName: item.agentName,
    agentEmail: item.agentEmail,
    priceMin: item.priceMin,
    priceMax: item.priceMax,
    offerAmount,
    buyingDate,
  };

  try {
    const res = await axiosSecure.post('/offers', offerData);
    if (res.status === 201) {
      toast.success('Offer submitted successfully!');
      navigate('/dashboard/property-bought');
    } else {
      toast.error('Failed to submit offer');
    }
  } catch (err) {
    console.error(err);
    toast.error('Server error while submitting offer');
  } finally {
    setLoading(false);
  }
};

  // Only users can buy property
  if (role !== 'user') {
    return (
      <div className="text-center p-10 text-red-500 font-semibold">
        Only users can make an offer.
      </div>
    );
  }

  if (isLoading || !item) {
    return <p className="p-6">Loading property...</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-base-100 p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Read-only fields */}
        <input
          type="text"
          value={item.propertyTitle}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={item.location}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={item.agentName}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={user?.email}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={user?.displayName}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Offer amount */}
        <input
          type="number"
          name="offerAmount"
          required
          className="input input-bordered w-full"
          placeholder={`Offer between $${item.priceMin} - $${item.priceMax}`}
        />

        {/* Date */}
        <input
          type="date"
          name="buyingDate"
          required
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Offer'}
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
