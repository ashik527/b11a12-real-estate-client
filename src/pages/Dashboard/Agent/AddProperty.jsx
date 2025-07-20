// src/pages/Dashboard/Agent/AddProperty.jsx
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../context/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const newProperty = {
      title: data.title,
      location: data.location,
      image: data.image,
      priceMin: parseFloat(data.priceMin),
      priceMax: parseFloat(data.priceMax),
      agentName: user?.displayName,
      agentEmail: user?.email,
      agentImage: user?.photoURL,
      status: 'pending', // default
      advertised: false,
    };

      try {
          await axiosSecure.post('/properties/add', newProperty);
          toast.success('Property added, pending admin approval');
          reset();
      } catch (err) {
          console.error('Add Property Error:', err);
          toast.error('Failed to add property');
      }
  };

  return (
    <div className="max-w-xl mx-auto bg-base-100 shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Add New Property</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="text" {...register('title')} className="input input-bordered w-full" placeholder="Property Title" required />
        <input type="text" {...register('location')} className="input input-bordered w-full" placeholder="Location" required />
        <input type="url" {...register('image')} className="input input-bordered w-full" placeholder="Image URL" required />
        <input type="number" {...register('priceMin')} className="input input-bordered w-full" placeholder="Min Price" required />
        <input type="number" {...register('priceMax')} className="input input-bordered w-full" placeholder="Max Price" required />

        <button type="submit" className="btn btn-primary w-full">Submit Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
