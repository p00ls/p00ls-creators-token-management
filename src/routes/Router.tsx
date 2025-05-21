import {createHashRouter, Navigate, RouteObject, RouterProvider,} from 'react-router-dom';
import {ErrorScreen} from '../components/ErrorScreen';
import {RouterMainLayout} from './layout/RouterMainLayout';
import {SettingsPage} from "./settings/SettingsPage";
import {appRoutes} from "./routing";
import {ChangeTransferabilityPage} from "./settings/changeTransferability";

const routes: RouteObject[] = [
  {
    element: <RouterMainLayout/>,
    errorElement: <ErrorScreen/>,
    children: [
      {path: appRoutes.settings, element: <SettingsPage/>},
      {path: appRoutes.changeTransferability, element: <ChangeTransferabilityPage/>},
      {path: '*', element: <Navigate to={appRoutes.settings} replace/>},
    ],
  },
];

const router = createHashRouter(routes);

export function AppRouter() {
  return <RouterProvider router={router}/>;
}
