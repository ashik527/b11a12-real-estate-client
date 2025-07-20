// src/pages/Auth/Register.jsx
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init'; // assumes named export
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const { name, email, password, photo } = data;

      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name, photoURL: photo });

      const userData = { name, email, photo };
      await axios.put(`${import.meta.env.VITE_API_URL}/users/save`, userData);

      const tokenRes = await axios.post(`${import.meta.env.VITE_API_URL}/users/jwt`, { email });
      localStorage.setItem('access-token', tokenRes.data.token);

      toast.success('Registration successful!');
      reset();
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-base-100 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input type="text" placeholder="Name" className="input input-bordered w-full" {...register('name')} required />
        <input type="email" placeholder="Email" className="input input-bordered w-full" {...register('email')} required />
        <input type="password" placeholder="Password" className="input input-bordered w-full" {...register('password')} required />
        <input type="text" placeholder="Photo URL" className="input input-bordered w-full" {...register('photo')} />
        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;

