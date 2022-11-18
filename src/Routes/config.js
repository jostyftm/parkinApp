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

// Websites manage pages
export const WEBSITE_LIST_PAGE = `${DASHBOARD_HOME_PAGE}/websites`;
export const WEBSITE_EDIT_PAGE = `${DASHBOARD_HOME_PAGE}/websites/:id/edit`;
export const WEBSITE_EDIT_PAGE_ROUTE = (id) => `${DASHBOARD_HOME_PAGE}/websites/${id}/edit`;

// Searches manage pages
export const SEARCH_LIST_PAGE = `${DASHBOARD_HOME_PAGE}/searches`;
export const SEARCH_EDIT_PAGE = `${DASHBOARD_HOME_PAGE}/searches/:id/edit`;
export const SEARCH_EDIT_PAGE_ROUTE = (id) => `${DASHBOARD_HOME_PAGE}/searches/${id}/edit`;

// Resources manage pages
export const RESOURCE_LIST_PAGE = `${DASHBOARD_HOME_PAGE}/resources`;
export const RESOURCE_EDIT_PAGE = `${DASHBOARD_HOME_PAGE}/resources/:id/edit`;
export const RESOURCE_EDIT_PAGE_ROUTE = (id) => `${DASHBOARD_HOME_PAGE}/resources/${id}/edit`;

// Keywords
export const KEYWORD_LIST_PAGE = `${DASHBOARD_HOME_PAGE}/keywords`;
export const KEYWORD_EDIT_PAGE = `${DASHBOARD_HOME_PAGE}/keywords/:id`;
export const KEYWORD_EDIT_PAGE_ROUTE = (id) => `${DASHBOARD_HOME_PAGE}/keywords/${id}`;