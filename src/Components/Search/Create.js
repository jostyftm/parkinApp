import React, { useEffect, useRef, useState } from "react";
import { saveSearch } from "../../Services/searchServices";
import Modal from "../Shared/Modal";

const SearchCreateModal = ({websites, onCreate, ...rest}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const formCreateSearchRef = useRef(null);

    const handleCreateSearch = async (e) => {

        e.preventDefault();

        setErrors([])
        setIsLoading(true);
        try{
            const formData = new FormData(formCreateSearchRef.current);

            await saveSearch(formData);
            document.querySelectorAll(".btn-close").forEach(element => element.click());
            setIsLoading(false);
            formCreateSearchRef.current.reset();
            onCreate(true);
        }catch(err){
            onCreate(false);
            setIsLoading(false);
            
            if(err.status === 422){
                setErrors(err.data.errors);
            }
        }
    }

    useEffect(() => {

        return () => {
            setErrors([])
        }
    }, []);
    
    return (
        <Modal
            title={"Crear busqueda"}
            modalSize=""
            {...rest}
        >
            <form
                ref={formCreateSearchRef}
                onSubmit={(e) => handleCreateSearch(e)}
            >
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className={errors && errors.query ? `form-control is-invalid` : `form-control`}  
                                id="floatingInputName" 
                                name='query'
                                placeholder="algo para buscar..."
                            />
                            <label htmlFor="floatingInputName">Consulta</label>
                            {errors && errors.query &&(
                                <div className="invalid-feedback">
                                    {errors.query}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <select
                                className={errors && errors.website_id ? `form-select is-invalid` : `form-select`}  
                                name="website_id"
                            >
                                <option value="">-Seleccione un sitio web-</option>
                                {websites?.map((web, index) => (
                                    <option 
                                        value={web.id}
                                        key={index}
                                    >
                                        {`${web.name} - ${web.url}`}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="floatingInputUrl">Url</label>
                            {errors && errors.website_id &&(
                                <div className="invalid-feedback">
                                    {errors.website_id}
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
                        {isLoading ? 'Creando': 'Crear'} busqueda
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

export default SearchCreateModal;