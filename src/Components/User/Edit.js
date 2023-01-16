import React, { useEffect, useRef, useState } from "react";
import { allIdentificationTypes } from "../../Services/idenfitifacionTypeService";
import { getUser, saveUser, updateUser } from "../../Services/userServices";
import Modal from "../Shared/Modal";

const UserEditModal = ({userId, onUpdate,...rest}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [user, setUser] = useState({});
    const [iTypes, setIdentificationTypes] = useState([]);

    const [errors, setErrors] = useState([]);
    
    const formUpdateUserRef = useRef(null);

    const handleCreateUSer = async (e) => {
        e.preventDefault();

        setIsUpdating(true);
        setErrors([]);
        try{
            const formData = new FormData(formUpdateUserRef.current);
            let data = {};
            formData.forEach((value, key) => data[key] = value);
            
            await updateUser(userId, formData);

            document.querySelectorAll(".btn-close").forEach(element => element.click());
            formUpdateUserRef.current.reset();
            onUpdate(true);
            setIsUpdating(false);
        }catch(err){
            onUpdate(false);
            setIsUpdating(false);

            if(err.status === 422){
                setErrors(err.data.errors);
            }
        }
    }

    const fetchData = async() => {

        setIsLoading(true);
        try{
            const responseUser = await getUser(userId)
            const responseIType = await allIdentificationTypes();

            setUser(responseUser.data);
            setIdentificationTypes(responseIType.data);

        }catch(err){
            
        }
        setIsLoading(false);
    };

    useEffect(() => {

        if(userId){
            fetchData();
        }

        return () => {
            setIdentificationTypes([]);
        }
    }, [userId]);

    return (
        <Modal
            title={"Crear usuario"}
            modalSize=""
            {...rest}
        >
            <form
                ref={formUpdateUserRef}
                onSubmit={(e) => handleCreateUSer(e)}
            >
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className={errors && errors.name ? `form-control is-invalid` : `form-control`}  
                                id="floatingInputNameUpdate" 
                                name='name'
                                defaultValue={user.name}
                            />
                            <label htmlFor="floatingInputNameUpdate">Nombre</label>
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
                                id="floatingInputLastNameUpdate" 
                                name='last_name'
                                defaultValue={user.last_name}
                            />
                            <label htmlFor="floatingInputLastNameUpdate">Apellidos</label>
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
                                value={user.identification_type_id}
                                onChange={(e) => setUser({...user, identification_type_id:e.target.value})}
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
                                defaultValue={user.identification_number}
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
                                id="floatingInputEmailUpdate" 
                                name='email'
                                defaultValue={user.email}
                            />
                            <label htmlFor="floatingInputEmailUpdate">email</label>
                            {errors && errors.email &&(
                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-2 mx-auto">
                    <button 
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading || isUpdating}
                    >
                        {isUpdating ? 'Actualizando': 'Actualizar'} usuario
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

export default UserEditModal;