// src/pages/Dashboard/Agent/RequestedProperties.jsx
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../context/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const RequestedProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch, isLoading } = useQuery({
  queryKey: ['agentRequests', user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/offers?agentEmail=${user.email}`);
    return res.data;
  },
  enabled: !!user?.email,
});

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/offers/status/${id}`, { status });
      toast.success(`Offer ${status}`);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  if (isLoading) return <p className="p-6">Loading incoming offers...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Incoming Property Offers</h2>

      {requests.length === 0 ? (
        <p>No one has made an offer on your properties yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Property</th>
                <th>Buyer</th>
                <th>Email</th>
                <th>Offer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => (
                <tr key={r._id}>
                  <td>{i + 1}</td>
                  <td>{r.propertyTitle}</td>
                  <td>{r.userName || 'Unknown'}</td>
                  <td>{r.userEmail}</td>
                  <td>${r.offerAmount}</td>
                  <td>{r.buyingDate}</td>
                  <td>
                    <span
                      className={`badge ${
                        r.status === 'pending'
                          ? 'badge-warning'
                          : r.status === 'accepted'
                          ? 'badge-success'
                          : 'badge-error'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="space-x-1">
                    {r.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(r._id, 'accepted')}
                          className="btn btn-xs btn-success"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(r._id, 'rejected')}
                          className="btn btn-xs btn-error"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {r.status !== 'pending' && <span>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestedProperties;
