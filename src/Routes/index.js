import React from 'react';

import{
    BrowserRouter, Routes, Route
} from 'react-router-dom'
import DashboardLayout from '../Layouts/DashboardLayout';
import DefaultLayout from '../Layouts/DefaultLayout';
import PrivateRouteMiddleware from '../Middlewares/Auth/PrivateRoute';
import PublicRouteMiddleware from '../Middlewares/Auth/PublicRoute';
import LoginPage from '../Pages/Auth/LoginPage';
import HomePageDashboard from '../Pages/Dashboard/Home';
import SearchListPage from '../Pages/Dashboard/Seacrhes/List';
import UserListPage from '../Pages/Dashboard/Users/List';
import WebsiteListPage from '../Pages/Dashboard/Websites';
import WebsiteConfigPage from '../Pages/Dashboard/Websites/config';
import HomePage from '../Pages/HomePage';
import { DASHBOARD_HOME_PAGE, HOME_PAGE, LOGIN_PAGE, RESOURCE_EDIT_PAGE_ROUTE, SEARCH_LIST_PAGE, USER_LIST_PAGE, WEBSITE_CONFIG_PAGE, WEBSITE_LIST_PAGE } from './config';

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
                    <Route path={WEBSITE_LIST_PAGE} element={<WebsiteListPage />} />
                    <Route path={SEARCH_LIST_PAGE} element={<SearchListPage />} />
                    <Route path={USER_LIST_PAGE} element={<UserListPage />} />
                    <Route path={WEBSITE_CONFIG_PAGE} element={<WebsiteConfigPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default MyRoutes;