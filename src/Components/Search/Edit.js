import React, { useEffect, useRef, useState } from "react";
import { getSearch, saveSearch, updateSearch } from "../../Services/searchServices";
import Modal from "../Shared/Modal";

const SearchEditModal = ({searchId, websites, onUpdate, ...rest}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState([]);
    const [errors, setErrors] = useState([]);

    const formUpdateSearchRef = useRef(null);

    const handleUpdateSearch = async (e) => {

        e.preventDefault();

        setErrors([])
        setIsLoading(true);
        try{
            const formData = new FormData(formUpdateSearchRef.current);
            let data = {};
            formData.forEach((value, key) => data[key] = value);

            await updateSearch(searchId, data);
            document.querySelectorAll(".btn-close").forEach(element => element.click());
            setIsLoading(false);
            formUpdateSearchRef.current.reset();
            onUpdate(true);
        }catch(err){
            onUpdate(false);
            setIsLoading(false);
            
            if(err.status === 422){
                setErrors(err.data.errors);
            }
        }
    }

    const fetchSearch = async () => {

        setIsLoading(true);
        
        try{
            
            const response = await getSearch(searchId);
            setSearch(response.data);

            setIsLoading(false);
        }catch(err){
            setIsLoading(false);

        }
    }


    useEffect(() => {

        if(searchId){
            fetchSearch();
        }

        return () => {
            setErrors([])
        }
    }, [searchId]);
    
    return (
        <Modal
            title={"Actualizar busqueda"}
            modalSize=""
            {...rest}
        >
            <form
                ref={formUpdateSearchRef}
                onSubmit={(e) => handleUpdateSearch(e)}
            >
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className={errors && errors.query ? `form-control is-invalid` : `form-control`}  
                                id="floatingInputName" 
                                name='query'
                                defaultValue={search?.query}
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
                                value={search?.website_id}
                                onChange={(e) => setSearch({...search, website_id:e.value})}
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
                        {isLoading ? 'Actualizando': 'Actualizar'} busqueda
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

export default SearchEditModal;