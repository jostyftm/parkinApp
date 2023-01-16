import React, { useEffect, useRef, useState } from "react";
import { saveClient } from "../../Services/clientService";
import { allIdentificationTypes } from "../../Services/idenfitifacionTypeService";
import Modal from "../Shared/Modal";

const ClientCreateModal = ({onCreate,...rest}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [iTypes, setIdentificationTypes] = useState([]);

    const [errors, setErrors] = useState([]);
    
    const formCreateUserRef = useRef(null);

    const handleCreateUSer = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrors([]);
        try{
            const formData = new FormData(formCreateUserRef.current);

            const clientSaved = await saveClient(formData);

            document.querySelectorAll(".btn-close").forEach(element => element.click());
            formCreateUserRef.current.reset();
            onCreate({
                result:true,
                data: clientSaved.data
            });
            setIsLoading(false);
        }catch(err){
            onCreate({result:false, data:{}});
            setIsLoading(false);

            console.log(err);
            if(err.status === 422){
                setErrors(err.data.errors);
            }
        }
    }

    const fetchData = async() => {

        setIsLoading(true);
        try{
            const responseIType = await allIdentificationTypes();

            setIdentificationTypes(responseIType.data);

        }catch(err){
            console.log(err)
        }
        setIsLoading(false);
    };

    useEffect(() => {

        fetchData();

        return () => {
            setIdentificationTypes([]);
        }
    }, []);

    return (
        <Modal
            title={"Crear cliente"}
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
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className={errors && errors.last_name ? `form-control is-invalid` : `form-control`}  
                                id="floatingInputLastName" 
                                name='last_name'
                                placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInputLastName">Apellidos</label>
                            {errors && errors.last_name &&(
                                <div className="invalid-feedback">
                                    {errors.last_name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col'>
                        <div className="form-floating mb-3">
                            <select
                                className={errors && errors.identification_type_id ? `form-select is-invalid` : `form-select`}  
                                name="identification_type_id"
                            >
                                <option value="">-Selecione una opción-</option>
                                {iTypes && iTypes.map((type, index) => (
                                    <option value={type.id} key={index}>{type.name}</option>
                                ))}
                            </select>
                            <label className='form-label'>Tipo de Identificación</label>
                            {errors && errors.identification_type_id &&(
                                <div className="invalid-feedback">
                                    {errors.identification_type_id}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col'>
                        <div className='form-floating'>
                            <input 
                                className={errors && errors.identification_number ? `form-control is-invalid` : `form-control`}  
                                type="text"
                                name="identification_number"
                                placeholder="identificación"
                            />
                            <label className='form-label'>Identificación</label>
                            {errors && errors.identification_number &&(
                                <div className="invalid-feedback">
                                    {errors.identification_number}
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

export default ClientCreateModal;