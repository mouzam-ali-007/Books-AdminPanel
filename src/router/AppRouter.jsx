import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import Dashboard from '../pages/Dashboard';
import QueryForms from '../pages/QueryForms';
import CreateQueryForm from '../pages/CreateQueryForm';

const router = createBrowserRouter([
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
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;