import React, { useEffect, useRef, useState } from "react";
import { getWebsite, updateWebsite } from "../../Services/websiteServices";
import Modal from "../Shared/Modal";

const WebsiteEditModal = ({webisteId, onUpdate, ...rest}) => {

    const [website, setWebsite] = useState({});
    const [isLoading, setIsLoasing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [errors, setErrors] = useState([]);

    const formUpdateWebsiteRef = useRef(null);

    const fetchWebsite = async () => {

        setIsLoasing(true);
        
        try{
            
            const response = await getWebsite(webisteId);

            setWebsite(response.data);
            setIsLoasing(false);
        }catch(err){
            setIsLoasing(false);

        }
    }

    const handleUpdateWebsite = async (e) => {

        console.log(e);
        e.preventDefault();

        setIsUpdating(true);
        
        try{
            const formData = new FormData(formUpdateWebsiteRef.current);
            let data = {};
            formData.forEach((value, key) => data[key] = value);
            
            const response = await updateWebsite(webisteId, data);

            document.querySelectorAll(".btn-close").forEach(element => element.click());
            formUpdateWebsiteRef.current.reset();
            onUpdate(true);
            setIsUpdating(false);
        }catch(err){
            setIsUpdating(false);
            onUpdate(false);

        }
    }

    useEffect(() => {

        if(webisteId){
            fetchWebsite();
        }
    }, [webisteId]);

    return (
        <Modal
            title={"Editar sitio web"}
            modalSize=""
            {...rest}
        >
            <form
                ref={formUpdateWebsiteRef}
                onSubmit={(e) => handleUpdateWebsite(e)}
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
                                defaultValue={website?.name}
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
                                type="text" 
                                className={errors && errors.url ? `form-control is-invalid` : `form-control`}  
                                id="floatingInputUrl" 
                                name='url'
                                placeholder="www.google.com"
                                defaultValue={website?.url}
                            />
                            <label htmlFor="floatingInputUrl">Url</label>
                            {errors && errors.url &&(
                                <div className="invalid-feedback">
                                    {errors.url}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-2 mx-auto">
                    <button 
                        type="submit"
                        className="btn btn-primary"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Actualizando': 'Actualizar'} sitio web
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

export default WebsiteEditModal;