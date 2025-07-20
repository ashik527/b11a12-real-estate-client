import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h2 className="text-5xl font-bold text-red-600">404</h2>
      <p className="text-lg mb-4">Page Not Found</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
};

export default NotFound;
