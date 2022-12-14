import React, { useRef, useState } from "react";
import { saveWebsite } from "../../Services/websiteServices";
import Modal from "../Shared/Modal";

const WebsiteCreateModal = ({onCreate, ...rest}) => {

    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState([]);

    const formCreateWebsiteRef = useRef(null);

    const handleSaveWebsite = async (e) => {

        e.preventDefault();

        setIsLoading(true);
        
        try{
            const formData = new FormData(formCreateWebsiteRef.current);
            let data = {};
            formData.forEach((value, key) => data[key] = value);
            
            await saveWebsite(data);

            document.querySelectorAll(".btn-close").forEach(element => element.click());
            formCreateWebsiteRef.current.reset();
            onCreate(true);
            setIsLoading(false);
        }catch(err){
            setIsLoading(false);
            onCreate(false);

        }
    }

    return (
        <Modal
            title={"Crear sitio web"}
            modalSize=""
            {...rest}
        >
            <form
                ref={formCreateWebsiteRef}
                onSubmit={(e) => handleSaveWebsite(e)}
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
                                type="text" 
                                className={errors && errors.url ? `form-control is-invalid` : `form-control`}  
                                id="floatingInputUrl" 
                                name='url'
                                placeholder="www.google.com"
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
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando': 'Crear'} sitio web
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

export default WebsiteCreateModal;