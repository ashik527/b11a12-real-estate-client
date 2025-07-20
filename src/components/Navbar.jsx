import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
      title: 'Logged Out',
      text: 'You have been successfully logged out.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
    } catch {
      Swal.fire({
      title: 'Logout Error',
      text: 'Something went wrong.',
      icon: 'error',
    });
    }
  };

  return (
    <div className="navbar fixed top-0 z-50 bg-yellow-100 shadow-xl px-4">
      <div className="navbar-start">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6zm2 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        <Link to="/" className="text-2xl font-bold text-primary">RealEstate<span className='text-2xl text-black font-bold'>Pro</span></Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4 font-medium text-xl text-primary">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/properties">All Properties</Link></li>
          {user && <li><Link to="/dashboard">Dashboard</Link></li>}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL || 'https://i.ibb.co/hJRT5YvV/alex-kotliarskyi-our-QHRTE2-IM-unsplash.jpg'} />
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
