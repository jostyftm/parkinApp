import React from "react";
import { Outlet } from "react-router-dom";
import CustomLink from "../Components/Shared/CustomLink";
import { CLIENT_LIST_PAGE, DASHBOARD_HOME_PAGE, EMPLOYEE_LIST_PAGE, RESERVATION_LIST_PAGE, STATISTICS_HOME, USER_LIST_PAGE} from "../Routes/config";

import useAuth from '../Hooks/UseAuth';
import { removeUserSession } from "../Utils/AuthUtils";

const DashboardLayout = () => {

    const {userLogged} = useAuth();

    const logOut = (e) => {
        e.preventDefault();

        try{
            removeUserSession()

            window.location.reload();
        }catch(err){

        }
    }

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
                                to={EMPLOYEE_LIST_PAGE}
                            >
                                Empleados
                            </CustomLink>
                            <CustomLink
                                to={CLIENT_LIST_PAGE}
                            >
                                Clientes
                            </CustomLink>
                            <CustomLink
                                to={RESERVATION_LIST_PAGE}
                            >
                                Reservaciones
                            </CustomLink>
                            <CustomLink
                                to={STATISTICS_HOME}
                            >
                                Estadisticas
                            </CustomLink>
                        </ul>
                    </div>
                </div>
                <div className="col-md-10">
                <nav 
                        className="bg-white p-1 mb-4 d-flex justify-content-between"
                    >
                        <div>
                            {/* <form>
                                <div className="input-group">
                                    <input className="form-control"/>
                                    <span className=""></span>
                                    <button
                                        className="btn btn-primary"
                                    >
                                        Buscar
                                    </button>
                                </div>
                            </form> */}
                        </div>
                        <ul className="nav">
                            <li 
                                className="nav-item dropdown"
                            >
                                <a 
                                    className="nav-link text-muted dropdown-toggle" 
                                    href="#" 
                                    id="navbarDropdown" 
                                    role="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    {userLogged.name}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow-lg" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Configuración</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a 
                                            className="dropdown-item" 
                                            href="#"
                                            onClick={(e) => logOut(e)}
                                            >
                                                Salir
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;