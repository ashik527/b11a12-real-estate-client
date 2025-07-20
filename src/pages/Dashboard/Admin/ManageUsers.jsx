import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const handleMakeRole = async (id, role) => {
    try {
      await axiosSecure.patch(`/users/role/${id}`, { role });
      toast.success(`User updated to ${role}`);
      refetch();
    } catch {
      toast.error('Failed to update role');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/users/${id}`);
      toast.success('User deleted');
      refetch();
    } catch {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td className="capitalize">{u.role}</td>
                  <td className="space-x-1">
                    {u.role !== 'admin' && (
                      <button onClick={() => handleMakeRole(u._id, 'admin')} className="btn btn-xs btn-success">
                        Make Admin
                      </button>
                    )}
                    {u.role !== 'agent' && (
                      <button onClick={() => handleMakeRole(u._id, 'agent')} className="btn btn-xs btn-info">
                        Make Agent
                      </button>
                    )}
                    {u.role === 'agent' && (
                      <button onClick={() => handleMakeRole(u._id, 'fraud')} className="btn btn-xs btn-warning">
                        Mark Fraud
                      </button>
                    )}
                    <button onClick={() => handleDelete(u._id)} className="btn btn-xs btn-error">
                      Delete
                    </button>
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

export default ManageUsers;
