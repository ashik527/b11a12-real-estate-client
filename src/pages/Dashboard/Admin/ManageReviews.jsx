import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['allReviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews');
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/reviews/${id}`);
      toast.success('Review deleted');
      refetch();
    } catch (err) {
      console.error('Delete Error:', err);
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Property</th>
                <th>User</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, i) => (
                <tr key={review._id}>
                  <td>{i + 1}</td>
                  <td>{review.propertyTitle}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full">
                          <img src={review.userImage || 'https://i.ibb.co/KpvgLfSN/luis-graterol-QVG3-Rzt-ORUA-unsplash.jpg'} alt="User" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{review.userName || 'Anonymous'}</div>
                        <div className="text-sm opacity-70">{review.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td>{review.rating}</td>
                  <td>{review.comment}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-xs btn-error"
                    >
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

export default ManageReviews;
