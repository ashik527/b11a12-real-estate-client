import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import AgentRoute from './AgentRoute';
import UserRoute from './UserRoute';

// Public Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import NotFound from '../pages/NotFound';
import AllProperties from '../pages/Properties/AllProperties';
import PropertyDetails from '../pages/Properties/PropertyDetails';

// Dashboard - User
import MyProfile from '../pages/Dashboard/User/MyProfile';
import Wishlist from '../pages/Dashboard/User/Wishlist';
import MakeOffer from '../pages/Dashboard/User/MakeOffer';
import PropertyBought from '../pages/Dashboard/User/PropertyBought';
import Payment from '../pages/Dashboard/User/Payment';
import MyReviews from '../pages/Dashboard/User/MyReviews';

// Dashboard - Agent
import AddProperty from '../pages/Dashboard/Agent/AddProperty';
import MyAddedProperties from '../pages/Dashboard/Agent/MyAddedProperties';
import SoldProperties from '../pages/Dashboard/Agent/SoldProperties';
import RequestedProperties from '../pages/Dashboard/Agent/RequestedProperties';

// Dashboard - Admin
import ManageProperties from '../pages/Dashboard/Admin/ManageProperties';
import ManageReviews from '../pages/Dashboard/Admin/ManageReviews';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';

const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/properties', element: <AllProperties /> },
      { path: '/properties/:id', element: <PropertyDetails /> },
    ],
  },

  // Protected Dashboard Routes
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // Common
      { path: 'profile', element: <MyProfile /> },

      //  User Routes
      {
        path: 'wishlist',
        element: <UserRoute><Wishlist /></UserRoute>,
      },
      {
        path: 'make-offer/:id',
        element: <UserRoute><MakeOffer /></UserRoute>,
      },
      {
        path: 'property-bought',
        element: <UserRoute><PropertyBought /></UserRoute>,
      },
      {
        path: 'payment/:id',
        element: <UserRoute><Payment /></UserRoute>,
      },
      {
        path: 'my-reviews',
        element: <UserRoute><MyReviews/></UserRoute>,
      },

      //  Agent Routes
      {
        path: 'add-property',
        element: <AgentRoute><AddProperty /></AgentRoute>,
      },
      {
        path: 'my-properties',
        element: <AgentRoute><MyAddedProperties/></AgentRoute>,
      },
      {
        path: 'sold-properties',
        element: <AgentRoute><SoldProperties/></AgentRoute>,
      },
      {
        path: 'requests',
        element: <AgentRoute><RequestedProperties/></AgentRoute>,
      },

      //  Admin Routes
      {
        path: 'manage-properties',
        element: <AdminRoute><ManageProperties /></AdminRoute>,
      },
      {
        path: 'manage-users',
        element: <AdminRoute><ManageUsers/></AdminRoute>,
      },
      {
        path: 'manage-reviews',
        element: <AdminRoute><ManageReviews /></AdminRoute>,
      },
    ],
  },

  // 404 Page
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
