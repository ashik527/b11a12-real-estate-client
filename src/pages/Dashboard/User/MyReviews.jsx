import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthProvider';

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
  queryKey: ['myReviews', user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/reviews/my?email=${user.email}`);
    return res.data;
  },
  enabled: !!user?.email
});

  if (isLoading) return <p className="p-6">Loading your reviews...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      {reviews.length === 0 ? (
        <p>You haven't submitted any reviews yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Property</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, i) => (
                <tr key={review._id}>
                  <td>{i + 1}</td>
                  <td>{review.propertyTitle}</td>
                  <td>{review.rating}</td>
                  <td>{review.comment}</td>
                  <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
