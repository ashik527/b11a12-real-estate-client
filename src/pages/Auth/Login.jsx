import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import Swal from 'sweetalert2';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  // fallback path — redirect here if no previous location exists
  const fallback = '/dashboard';
  const from = location.state?.from?.pathname || fallback;

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;

      await signInWithEmailAndPassword(auth, email, password);


      Swal.fire({
        title: 'Welcome!',
        text: 'You have logged in successfully.',
        icon: 'success',
        confirmButtonText: 'Continue',
      });

      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        title: 'Login Failed',
        text: err.message || 'Invalid credentials',
        icon: 'error',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-base-100 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register('email')}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register('password')}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
