import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], refetch } = useQuery({
    queryKey: ['allProperties'],
    queryFn: async () => {
      const res = await axiosSecure.get('/properties/all');
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/properties/verify/${id}`, { status });
      toast.success(`Property ${status}`);
      refetch();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleToggleAdvertise = async (id) => {
    try {
      await axiosSecure.patch(`/properties/advertise/${id}`);
      toast.success('Advertise toggled');
      refetch();
    } catch {
      toast.error('Failed to toggle advertise');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage All Properties</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Status</th>
              <th>Advertised</th>
              <th>Agent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.title}</td>
                <td>{p.location}</td>
                <td>{p.status}</td>
                <td>{p.advertised ? 'Yes' : 'No'}</td>
                <td>{p.agentName}</td>
                <td className="space-x-2">
                  {p.status === 'pending' && (
                    <>
                      <button onClick={() => handleStatusChange(p._id, 'verified')} className="btn btn-xs btn-success">
                        Verify
                      </button>
                      <button onClick={() => handleStatusChange(p._id, 'rejected')} className="btn btn-xs btn-error">
                        Reject
                      </button>
                    </>
                  )}
                  {p.status === 'verified' && (
                    <button onClick={() => handleToggleAdvertise(p._id)} className="btn btn-xs btn-info">
                      {p.advertised ? 'Unadvertise' : 'Advertise'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;
