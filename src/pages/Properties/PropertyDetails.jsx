import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: property, isLoading } = useQuery({
    queryKey: ['propertyDetails', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/properties/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  const handleAddToWishlist = async () => {
    const wishlistItem = {
      userEmail: user.email,
      propertyId: property._id,
      propertyTitle: property.title,
      image: property.image,
      location: property.location,
      priceMin: property.priceMin,
      priceMax: property.priceMax,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
      status: 'pending',
    };

    try {
      const res = await axiosSecure.post('/wishlist', wishlistItem);
      if (res.status === 201) {
        toast.success('Added to wishlist!');
      }
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error('Already in wishlist');
      } else {
        toast.error('Failed to add to wishlist');
      }
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    const rating = parseInt(form.rating.value);

    const reviewData = {
      userEmail: user.email,
      userImage: user.photoURL,
      propertyId: property._id,
      propertyTitle: property.title,
      comment,
      rating,
    };

    try {
      const res = await axiosSecure.post('/reviews', reviewData);
      if (res.status === 201) {
        toast.success('Review submitted!');
        form.reset();
      }
    } catch {
      toast.error('Failed to submit review');
    }
  };

  if (isLoading) return <p className="p-6">Loading property...</p>;
  if (!property) return <p className="p-6">Property not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 mt-12">
      <img src={property.image} alt={property.title} className="w-full h-80 object-cover rounded-lg" />

      <div className="space-y-3">
        <h2 className="text-3xl font-bold">{property.title}</h2>
        <p className="text-gray-600 text-lg">{property.location}</p>
        <p className="text-xl font-semibold text-primary">
          ${property.priceMin} - ${property.priceMax}
        </p>
        <p>Status: <span className="font-medium">{property.status}</span></p>
        <hr />
        <h4 className="font-semibold">Agent Info</h4>
        <div className="flex items-center gap-3">
          <img
  src={
    property.agentImage?.startsWith('http')
      ? property.agentImage
      : 'https://i.ibb.co/MkJ3YCwv/pexels-scottwebb-140963.jpg'
  }
  alt={property.agentName}
  className="w-10 h-10 rounded-full"
/>
          <p>{property.agentName}</p>
        </div>

        {/* Wishlist Button */}
        {user?.email ? (
          <button onClick={handleAddToWishlist} className="btn btn-primary btn-outline mt-4">
            Add to Wishlist
          </button>
        ) : (
          <p className="text-sm text-error mt-4">Login to add to wishlist</p>
        )}

        {/* Contact Agent Button */}
        {user?.email && (
          <button
            onClick={() => document.getElementById('contact_modal').showModal()}
            className="btn btn-outline btn-secondary ml-2 mt-1"
          >
            Contact Agent
          </button>
        )}
      </div>

      {/* Contact Agent Modal */}
      <dialog id="contact_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Message {property.agentName}</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const message = e.target.message.value;

              const contactData = {
                agentEmail: property.agentEmail,
                userEmail: user.email,
                message,
                propertyId: property._id,
              };

              try {
                const res = await axiosSecure.post('/contact', contactData);
                if (res.status === 201) {
                  toast.success('Message sent!');
                  e.target.reset();
                  document.getElementById('contact_modal').close();
                }
              } catch (err) {
                console.error('Contact Error:', err);
                toast.error('Failed to send message');
              }
            }}
          >
            <textarea
              name="message"
              className="textarea textarea-bordered w-full mb-4"
              required
              placeholder="Write your message..."
            ></textarea>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Send</button>
              <button type="button" onClick={() => document.getElementById('contact_modal').close()} className="btn btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Submit Review Section */}
      {user?.email && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Leave a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <textarea
              name="comment"
              className="textarea textarea-bordered w-full"
              required
              placeholder="Your review"
            ></textarea>

            <div>
              <label className="block mb-1">Rating</label>
              <select name="rating" className="select select-bordered w-full" required>
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
