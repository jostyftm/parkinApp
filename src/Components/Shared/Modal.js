import React from "react";

const Modal = ({title, subtitle, children, modalSize,...rest}) => {

    return(
        <div 
            className="modal fade" 
            tabIndex="-1" 
            data-bs-backdrop="static" 
            data-bs-keyboard="false"
            {...rest}
        >
            <div className={`modal-dialog ${modalSize}`}>
                <div className="modal-content border-0 shadow">
                    <div className="modal-header border-0 pb-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body px-4">
                        {title && (
                            <div className="mb-3">
                            <span className="fs-5 fw-bold d-block">{title}</span>
                            <span>{subtitle}</span>
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;