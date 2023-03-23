import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
    console.log(children)
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () =>{
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    const handleKeyDown = e => {
        if(e.code === 'Escape') {
            onClose();
        }
    }

    const handleOverlayClck = (e) => {
        if(e.target === e.currentTarget) {
            onClose();
        }
    }

    return createPortal(
        <Overlay onClick={handleOverlayClck}>
            <ModalImg>
                {children}
            </ModalImg>
        </Overlay>, 
        modalRoot 
    );
};

export default Modal;

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
};