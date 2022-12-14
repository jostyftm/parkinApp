import React, { useRef, useState } from "react";
import { saveUser } from "../../Services/userServices";
import Modal from "../Shared/Modal";

const UserCreateModal = ({onCreate,...rest}) => {

    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState([]);
    
    const formCreateUserRef = useRef(null);

    const handleCreateUSer = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrors([]);
        try{
            const formData = new FormData(formCreateUserRef.current);

            await saveUser(formData);

            document.querySelectorAll(".btn-close").forEach(element => element.click());
            formCreateUserRef.current.reset();
            onCreate(true);
            setIsLoading(false);
        }catch(err){
            onCreate(false);
            setIsLoading(false);

            console.log(err);
            if(err.status === 422){
                setErrors(err.data.errors);
            }
        }
    }

    return (
        <Modal
            title={"Crear usuario"}
            modalSize=""
            {...rest}
        >
            <form
                ref={formCreateUserRef}
                onSubmit={(e) => handleCreateUSer(e)}
            >
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className={errors && errors.name ? `form-control is-invalid` : `form-control`}  
                                id="floatingInputName" 
                                name='name'
                                placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInputName">Nombre</label>
                            {errors && errors.name &&(
                                <div className="invalid-feedback">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input 
                                type="email" 
                                className={errors && errors.email ? `form-control is-invalid` : `form-control`}  
                                id="floatingInputEmail" 
                                name='email'
                                placeholder="www.google.com"
                            />
                            <label htmlFor="floatingInputEmail">email</label>
                            {errors && errors.email &&(
                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row nb-3">
                <div className="col">
                        <div className="form-floating mb-3">
                            <input 
                                type="password" 
                                className={errors && errors.password ? `form-control is-invalid` : `form-control`}  
                                id="floatingInputPassword" 
                                name='password'
                                placeholder="********"
                            />
                            <label htmlFor="floatingInputPassword">Contraseña</label>
                            {errors && errors.password &&(
                                <div className="invalid-feedback">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input 
                                type="password" 
                                className={errors && errors.password_confirmation ? `form-control is-invalid` : `form-control`}  
                                id="floatingInputPasswordConfirmation" 
                                name='password_confirmation'
                                placeholder="¨*******"
                            />
                            <label htmlFor="floatingInputPasswordConfirmation">Confirmar contraseña</label>
                            {errors && errors.password_confirmation &&(
                                <div className="invalid-feedback">
                                    {errors.password_confirmation}
                                </div>
                            )}
                        </div>
                    </div>        
                </div>
                <div className="d-grid gap-2 mx-auto">
                    <button 
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando': 'Crear'} usuario
                    </button>
                    <button 
                        type='button'
                        className='btn btn-default'
                        data-bs-dismiss="modal"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default UserCreateModal;