// src/App.jsx
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './context/AuthProvider';
import router from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
