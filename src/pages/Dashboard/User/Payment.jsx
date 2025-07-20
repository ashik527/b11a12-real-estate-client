import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const Payment = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/offers/bought?email=${user.email}`).then((res) => {
      const found = res.data.find((item) => item._id === id);
      setProperty(found);
    });
  }, [axiosSecure, id, user?.email]);

  const handleDummyPayment = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.patch(`/offers/confirm/${id}`, {
        transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      });
      if (res.data?._id) {
        toast.success('Dummy payment successful!');
        navigate('/dashboard/property-bought');
      } else {
        toast.error('Payment failed');
      }
    } catch (err) {
      toast.error('Server error during payment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-base-100 shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Payment for {property.propertyTitle}</h2>
      <p className="mb-2">Offer Amount: <strong>${property.offerAmount}</strong></p>
      <button
        onClick={handleDummyPayment}
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Confirm Dummy Payment'}
      </button>
    </div>
  );
};

export default Payment;
