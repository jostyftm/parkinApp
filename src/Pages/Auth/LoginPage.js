import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


// Components
import Panel from '../../Components/Shared/Panel';

const LoginPage = () => {

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Refs
    const formLoginRef = useRef(null);

    const handleLogin = async (e) => {

        e.preventDefault();

    }

    useEffect(() => {

        document.title = "Iniciar sesión en tramites del pacifico"
    }, [])

    return (
        <div className="container">
            <div className="row vh-100 align-items-center">
                <div className="col-md-5 mx-auto">
                    <div className="w-100 text-center mb-4">
                        {/* <img src={logo} width="240" /> */}
                    </div>
                    <Panel>
                        <h5 className="text-center">Iniciar sesión</h5>
                        <form
                            ref={formLoginRef}
                            onSubmit={(e) => handleLogin(e)}
                        >
                            <div className="mb-3">
                                <div className='form-floating'>
                                    <input 
                                        type="text"
                                        className={errors?.email ? `form-control is-invalid` : `form-control`}  
                                        name='email'
                                        placeholder="pepito"
                                    />
                                    <label className='form-label'>Correo electrónico</label>
                                    {errors?.email &&(
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className='form-floating'>
                                    <input 
                                        type="password"
                                        className={errors?.password ? `form-control is-invalid` : `form-control`}  
                                        name='password'
                                        placeholder="pepito"
                                    />
                                    <label className='form-label'>Contraseña</label>
                                    {errors?.password &&(
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="d-grid">
                                <button 
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                    type="submit"
                                >
                                    {isLoading ? 'Iniciando sesión' : 'Iniciar sesión'}
                                </button>
                            </div>
                        </form>
                    </Panel>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;