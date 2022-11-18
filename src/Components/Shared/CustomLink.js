import React from "react";
import { Link, useMatch, NavLink, useResolvedPath } from "react-router-dom";
 
const CustomLink = ({children, to, ...props}) => {

    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});

    return(
        <NavLink
            to={to}
            className={match ? "active nav-link": "nav-link"}
            {...props}
        >
            {children}
        </NavLink>
    );
}

export default CustomLink;