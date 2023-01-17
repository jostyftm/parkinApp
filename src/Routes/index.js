import React from 'react';

import{
    BrowserRouter, Routes, Route
} from 'react-router-dom'
import DashboardLayout from '../Layouts/DashboardLayout';
import DefaultLayout from '../Layouts/DefaultLayout';
import PrivateRouteMiddleware from '../Middlewares/Auth/PrivateRoute';
import PublicRouteMiddleware from '../Middlewares/Auth/PublicRoute';
import LoginPage from '../Pages/Auth/LoginPage';
import ClientListPage from '../Pages/Dashboard/Clients/List';
import HomePageDashboard from '../Pages/Dashboard/Home';
import ReservationCreatePage from '../Pages/Dashboard/Reservations/Create';
import ReservationListPage from '../Pages/Dashboard/Reservations/List';
import StatisticsHomePage from '../Pages/Dashboard/Statistics/Home';
import UserListPage from '../Pages/Dashboard/Users/List';
import HomePage from '../Pages/HomePage';
import { CLIENT_LIST_PAGE, DASHBOARD_HOME_PAGE, EMPLOYEE_LIST_PAGE, HOME_PAGE, LOGIN_PAGE, RESERVATION_CREATE_PAGE, RESERVATION_LIST_PAGE, SEARCH_LIST_PAGE, STATISTICS_HOME, USER_LIST_PAGE} from './config';

const MyRoutes = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path={HOME_PAGE} 
                    element={
                        <PublicRouteMiddleware>
                            <DefaultLayout />
                        </PublicRouteMiddleware>
                    }
                >
                    <Route index element={<HomePage />} />
                </Route>
                <Route
                    path={LOGIN_PAGE}
                    element={
                        <PublicRouteMiddleware>
                            <DefaultLayout/>
                        </PublicRouteMiddleware>
                    }
                >
                    <Route index element={<LoginPage />} />
                </Route>
                <Route
                    path={DASHBOARD_HOME_PAGE}
                    element={
                        <PrivateRouteMiddleware>
                            <DashboardLayout />
                        </PrivateRouteMiddleware>
                    }
                >
                    <Route index element={<HomePageDashboard />} />
                    <Route path={EMPLOYEE_LIST_PAGE} element={<UserListPage />} />
                    <Route path={CLIENT_LIST_PAGE} element={<ClientListPage />} />
                    <Route path={RESERVATION_LIST_PAGE} element={<ReservationListPage />} />
                    <Route path={RESERVATION_CREATE_PAGE} element={<ReservationCreatePage />} />
                    <Route path={STATISTICS_HOME} element={<StatisticsHomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default MyRoutes;