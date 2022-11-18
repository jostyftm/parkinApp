import React from "react";
import { Outlet } from "react-router-dom";
import CustomLink from "../Components/Shared/CustomLink";
import { DASHBOARD_HOME_PAGE, KEYWORD_LIST_PAGE, RESOURCE_LIST_PAGE, SEARCH_LIST_PAGE, USER_LIST_PAGE, WEBSITE_LIST_PAGE } from "../Routes/config";

const DashboardLayout = () => {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <div>
                        <ul className="nav flex-column mt-5">
                            <CustomLink
                                to={DASHBOARD_HOME_PAGE}
                            >
                                Inicio
                            </CustomLink>
                            <CustomLink
                                to={USER_LIST_PAGE}
                            >
                                Usuarios
                            </CustomLink>
                            <CustomLink
                                to={WEBSITE_LIST_PAGE}
                            >
                                Sistios web
                            </CustomLink>
                            <CustomLink
                                to={SEARCH_LIST_PAGE}
                            >
                                Busquedas
                            </CustomLink>
                            <CustomLink
                                to={RESOURCE_LIST_PAGE}
                            >
                                Recursos
                            </CustomLink>
                            <CustomLink
                                to={KEYWORD_LIST_PAGE}
                            >
                                Palabras claves
                            </CustomLink>
                        </ul>
                    </div>
                </div>
                <div className="col-md-10">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;