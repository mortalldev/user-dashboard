import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/login';
import Home from '@/pages/home';
import NotFound from '@/pages/not-found';

import Layout from '@/widgets/layout/layout';
import Profile from '@/pages/profile';
import Products from '@/pages/products';
import Limits from '@/pages/limits';
import Users from '@/pages/users';
import Transfers from '@/pages/transfers';
import Cards from '@/pages/cards';
import Wallets from '@/pages/wallets';
import ProtectedRoute from './protected-route';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        path: '/',
                        element: <Home />,
                    },
                    {
                        path: '/profile',
                        element: <Profile />,
                    },
                    {
                        path: '/products',
                        element: <Products />,
                    },
                    {
                        path: '/limits',
                        element: <Limits />,
                    },
                    {
                        path: '/users',
                        element: <Users />,
                    },
                    {
                        path: '/transfers',
                        element: <Transfers />,
                    },
                    {
                        path: '/cards',
                        element: <Cards />,
                    },
                    {
                        path: '/wallets',
                        element: <Wallets />,
                    },
                ],
            },
        ],
    },

    {
        path: '*',
        element: <NotFound />,
    },
]);
