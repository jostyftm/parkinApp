// Home route
export const HOME_PAGE = "/";

// Login route
export const LOGIN_PAGE =   "/login";

// Dashboard
export const DASHBOARD_HOME_PAGE =   "/dashboard";

// Users manage pages
export const USER_LIST_PAGE = `${DASHBOARD_HOME_PAGE}/users`;
export const USER_EDIT_PAGE = `${DASHBOARD_HOME_PAGE}/users/:id/edit`;
export const USER_EDIT_PAGE_ROUTE = (id) => `${DASHBOARD_HOME_PAGE}/users/${id}/edit`;

// Client manage page
export const CLIENT_LIST_PAGE = `${DASHBOARD_HOME_PAGE}/clients`;

// Reservations manage pages
export const RESERVATION_LIST_PAGE = `${DASHBOARD_HOME_PAGE}/reservations`;
export const RESERVATION_CREATE_PAGE = `${DASHBOARD_HOME_PAGE}/reservations/new`;

// Statistics
export const STATISTICS_HOME = `${DASHBOARD_HOME_PAGE}/statistics`;