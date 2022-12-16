import React, { useEffect, useRef, useState } from "react";

import Panel from "../../../Components/Shared/Panel";

import {useParams} from 'react-router-dom';
import { getWebsiteConfiguration, testWebsiteConfiguration, updateWebsiteConfiguration } from "../../../Services/websiteServices";

const WebsiteConfigPage = () => {

    const [websiteConfig, setWebsiteConfig] = useState({});
    const [resources, setResources] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isTesting, setIsTesting] = useState(false);

    const [errors, setErrors] = useState([]);
    const [errorTesting, setErrorTesting] = useState('');

    const formUpdateConfigRef = useRef(null);
    const formTestRef = useRef(null);

    const {id} = useParams();

    const fetchWebsiteConfig = async () => {

        setIsLoading(true);
        try{
            const response = await getWebsiteConfiguration(id);
            setWebsiteConfig(response.data.web_configuration);
            setIsLoading(false);
        }catch(err){
            setIsLoading(false);

        }
    }

    const handleUpdateConfig = async (e) => {

        e.preventDefault();

        setIsUpdating(true);
        setErrors([]);
        try{

            const formData = new FormData(formUpdateConfigRef.current);
            let data = {};
            formData.forEach((value, key) => data[key] = value);

            await updateWebsiteConfiguration(websiteConfig.id, data);
            setIsUpdating(false);
        }catch(err) {
            setIsUpdating(false);

        }
    }

    const handleTestConfig = async(e) => {
        
        e.preventDefault();

        setIsTesting(true);
        setErrors([]);
        setResources([]);
        setErrorTesting('');
        try{
            const formData = new FormData(formTestRef.current);

            const response = await testWebsiteConfiguration(websiteConfig.id, formData);
            setResources(response.data)
            setIsTesting(false);
        }catch(err){
            setIsTesting(false);

            if(err.status === 500){
                console.log(err.data);
                setErrorTesting(err.data.message);
            }
        }
    }

    useEffect(() => {

        if(id){
            fetchWebsiteConfig();
        }

        return () => {
            setWebsiteConfig({});
        }
    }, []);

    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Configurar sitio web</h1>
                
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <form
                            ref={formUpdateConfigRef}
                            onSubmit={(e) => handleUpdateConfig(e)}
                        >
                            <Panel>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                className={errors && errors.query_search_variable ? `form-control is-invalid` : `form-control`}  
                                                id="floatingInputName" 
                                                name='query_search_variable'
                                                placeholder="algo para buscar..."
                                                defaultValue={websiteConfig.query_search_variable}
                                            />
                                            <label htmlFor="floatingInputName">Variable de consulta</label>
                                            {errors && errors.query_search_variable &&(
                                                <div className="invalid-feedback">
                                                    {errors.query_search_variable}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                className={errors && errors.query_separator ? `form-control is-invalid` : `form-control`}  
                                                id="floatingInputName" 
                                                name='query_separator'
                                                placeholder="algo para buscar..."
                                                defaultValue={websiteConfig.query_separator}
                                            />
                                            <label htmlFor="floatingInputName">Separador de la consulta</label>
                                            {errors && errors.query_separator &&(
                                                <div className="invalid-feedback">
                                                    {errors.query_separator}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                            <Panel>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                className={errors && errors.tag_resource_link ? `form-control is-invalid` : `form-control`}  
                                                id="floatingInputName" 
                                                name='tag_resource_link'
                                                placeholder="algo para buscar..."
                                                defaultValue={websiteConfig.tag_resource_link}
                                            />
                                            <label htmlFor="floatingInputName">Et. link de la publicación</label>
                                            {errors && errors.tag_resource_link &&(
                                                <div className="invalid-feedback">
                                                    {errors.tag_resource_link}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                className={errors && errors.tag_resource_next_page ? `form-control is-invalid` : `form-control`}  
                                                id="floatingInputName" 
                                                name='tag_resource_next_page'
                                                placeholder="algo para buscar..."
                                                defaultValue={websiteConfig.tag_resource_next_page}
                                            />
                                            <label htmlFor="floatingInputName">Et. consulta a la siguiente página</label>
                                            {errors && errors.tag_resource_next_page &&(
                                                <div className="invalid-feedback">
                                                    {errors.tag_resource_next_page}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                className={errors && errors.tag_resource_list_posts ? `form-control is-invalid` : `form-control`}  
                                                id="floatingInputName" 
                                                name='tag_resource_list_posts'
                                                placeholder="algo para buscar..."
                                                defaultValue={websiteConfig.tag_resource_list_posts}
                                            />
                                            <label htmlFor="floatingInputName">Et. contenedora de recursos</label>
                                            {errors && errors.tag_resource_list_posts &&(
                                                <div className="invalid-feedback">
                                                    {errors.tag_resource_list_posts}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                            <Panel>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                className={errors && errors.tag_resource_title ? `form-control is-invalid` : `form-control`}  
                                                id="floatingInputName" 
                                                name='tag_resource_title'
                                                placeholder="algo para buscar..."
                                                defaultValue={websiteConfig.tag_resource_title}
                                            />
                                            <label htmlFor="floatingInputName">Et. titulo de la publicación</label>
                                            {errors && errors.tag_resource_title &&(
                                                <div className="invalid-feedback">
                                                    {errors.tag_resource_title}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                className={errors && errors.tag_resource_description ? `form-control is-invalid` : `form-control`}  
                                                id="floatingInputName" 
                                                name='tag_resource_description'
                                                placeholder="algo para buscar..."
                                                defaultValue={websiteConfig.tag_resource_description}
                                            />
                                            <label htmlFor="floatingInputName">Et. descripción de la publicación</label>
                                            {errors && errors.tag_resource_description &&(
                                                <div className="invalid-feedback">
                                                    {errors.tag_resource_description}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                            <div className="my-3 d-grid gap-2">
                                <button 
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Actualizando' : 'Actualizar'} configuración
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <Panel>
                            <form
                                ref={formTestRef}
                                onSubmit={(e) => handleTestConfig(e)}
                            >
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                className={errorTesting ? `form-control is-invalid` : `form-control`}  
                                                id="floatingInputQueryTest" 
                                                name='q'
                                                placeholder="algo para buscar..."
                                            />
                                            <label htmlFor="floatingInputQueryTest">¿Que quieres buscar?</label>
                                            {errorTesting &&(
                                                <div className="invalid-feedback">
                                                    {errorTesting}
                                                </div>
                                            )}
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button 
                                                className="btn btn-outline-primary"
                                                type="submit"
                                                disabled={isTesting}
                                            >
                                                Probar configuración
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Panel>
                        {resources.length > 0 && (
                            <Panel>
                                <h3>Resultados</h3>
                                <hr />
                                <nav className="nav flex-column">
                                    {resources?.map((resource, index) => (
                                        <a 
                                            key={index}
                                            className="nav-link" 
                                            href={resource?.url} 
                                            target="_blank"
                                        >{resource?.title}</a>
                                        ))}
                                </nav>
                            </Panel>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default WebsiteConfigPage;