import React from "react";
import modalStyle from "./styles/Popup.module.css";

const Popup = ({children, style, onDismiss, width = "50%", containerStyle, containerClassName}) => {
    return (
        <div className={`modal-containers ${modalStyle.modal_container} ${containerClassName}`} style={containerStyle} onClick={e => {
            if (e.target.classList.contains('modal-containers')) {
                onDismiss();
            }
        }}>
            <div className={`${modalStyle.modal_body}`} style={{
                width: width,
                ...style
            }}>
                {children}
            </div>
        </div>
    )
}

export default Popup;