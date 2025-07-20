// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const commonLinks = (
    <>
      <li><NavLink to="/dashboard/profile">My Profile</NavLink></li>
    </>
  );

  const userLinks = (
    <>
      <li><NavLink to="/dashboard/wishlist">Wishlist</NavLink></li>
      <li><NavLink to="/dashboard/property-bought">Property Bought</NavLink></li>
      <li><NavLink to="/dashboard/my-reviews">My Reviews</NavLink></li>
    </>
  );

  const agentLinks = (
    <>
      <li><NavLink to="/dashboard/add-property">Add Property</NavLink></li>
      <li><NavLink to="/dashboard/my-properties">My Added Properties</NavLink></li>
      <li><NavLink to="/dashboard/sold-properties">My Sold Properties</NavLink></li>
      <li><NavLink to="/dashboard/requests">Requested Properties</NavLink></li>
    </>
  );

  const adminLinks = (
    <>
      <li><NavLink to="/dashboard/manage-properties">Manage Properties</NavLink></li>
      <li><NavLink to="/dashboard/manage-users">Manage Users</NavLink></li>
      <li><NavLink to="/dashboard/manage-reviews">Manage Reviews</NavLink></li>
    </>
  );

  return (
    <div className="w-60 bg-base-100 p-4 shadow-lg">
      <ul className="menu space-y-2">
        {commonLinks}
        {role === 'user' && userLinks}
        {(role === 'agent' || role === 'admin') && agentLinks}
        {role === 'admin' && adminLinks}
      </ul>
    </div>
  );
};

export default Sidebar;
