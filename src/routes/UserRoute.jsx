import useRole from "../hooks/useRole";

const UserRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <p className="p-6">Loading...</p>;

  return role === 'user' ? children : <Navigate to="/" />;
};

export default UserRoute;
