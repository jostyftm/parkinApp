import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons'

const HomePage = () => {

    return(
        <div className="container">
            <div className="row vh-100 align-items-center">
                <div className="col-md-6 mx-auto">
                    <h1 className="text-center">¿Que quieres saber?</h1>
                    <form className="mt-4">
                        <div className="d-flex align-items-center border rounded-pill p-2 px-4">
                            <input type={"text"} className="w-100 border-0 input-seacrh" />
                            <FontAwesomeIcon icon={faSearch} className="mx-1" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default HomePage;