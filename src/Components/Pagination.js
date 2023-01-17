import React from "react";

const Pagination = ({links, handleClickPagination}) =>{

    return(
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {links && links.map((link, index) => {
                
                    if(index === 0) {
                        return(
                            <li 
                                className="page-item"
                                key={index}
                            >
                                <a 
                                    className="page-link disabled" 
                                    href={link.url} 
                                    aria-label="Previous"
                                    onClick={(e) => {handleClickPagination(e, index)}}
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                        );
                    }else if(index === links.length-1){
                        return(
                            <li 
                                className="page-item"
                                key={index}
                            >
                                <a 
                                    className="page-link" 
                                    href={link.url} 
                                    aria-label="Previous"
                                    onClick={(e) => {handleClickPagination(e, index-1)}}
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        );
                    }
                    
                    return(
                        <li 
                            key={index}
                            className={link.active ? 'page-item active' : 'page-item'} 
                            aria-current="page"
                        >
                        <a 
                            className="page-link" 
                            href={link.url}
                            onClick={(e) => {handleClickPagination(e, link.label)}}
                        >
                            {link.label}
                        </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};

export default Pagination;