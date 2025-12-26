import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import Dashboard from '../pages/Dashboard';
import QueryForms from '../pages/QueryForms';
import CreateQueryForm from '../pages/CreateQueryForm';
import Login from '../components/Layout/Login';
import { authService } from '../services/authService';

const ProtectedRoute = () => {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <AppLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    },
                    {
                        path: 'order-forms',
                        element: <QueryForms />
                    },
                    {
                        path: 'order-forms/create',
                        element: <CreateQueryForm />
                    }
                ]
            }
        ]
    }
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;