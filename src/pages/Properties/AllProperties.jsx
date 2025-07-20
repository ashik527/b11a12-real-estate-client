import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const AllProperties = () => {
  const axiosPublic = useAxiosPublic();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['verifiedProperties'],
    queryFn: async () => {
      const res = await axiosPublic.get('/properties/verified');
      return res.data;
    },
  });

  if (isLoading) return <p className="p-6">Loading properties...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-20">
      <h2 className="text-3xl font-bold text-center mb-6">Explore All Verified Properties</h2>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-md">
              <figure>
                <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.location}</p>
                <p className="font-bold text-primary">
                  ${item.priceMin} - ${item.priceMax}
                </p>
                <Link to={`/properties/${item._id}`} className="btn btn-outline btn-secondary mt-2">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProperties;
