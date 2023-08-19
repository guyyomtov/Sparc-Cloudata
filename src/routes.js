import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import MachineLayout from './layouts/dashboard/MachineLayout';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/MachinesPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ForecastsPage from './pages/ForecastsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AlertsPage from './pages/AlertsPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />, index: true,
    },
   
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />},
        { path: ':machineId', element: <DashboardAppPage /> },
        { path: 'forecasts', 
          children: [
          { path: ':machineId',
          element:<ForecastsPage/>}
          ]
        },
        {
          path: 'alerts',
          element: <AlertsPage />,
        },
      ],
    },
    {
      element: <MachineLayout />,
      children: [
       {path: 'managerMachines',
       element: <UserPage />},
      ]
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />},
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '',
       element: <Navigate to="/login" replace />,
    },
    {
      path: '*',
       element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
