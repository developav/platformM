// Modal.tsx
import React, { useEffect} from 'react';
import ReactDOM from 'react-dom';
import './modal.scss';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isRegistration?: boolean;  
}
 

const Modal: React.FC<ModalProps> = ({ children, onClose, isRegistration }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal-overlay__content ${isRegistration ? "modal--big" : "modal--small"}`}>
        <button className="modal-overlay__close" onClick={onClose}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="24" fill="white"/>
            <path d="M22.5859 24L14.793 16.2071L16.2072 14.7928L24.0001 22.5857L31.793 14.7928L33.2072 16.2071L25.4143 24L33.2072 31.7928L31.793 33.2071L24.0001 25.4142L16.2072 33.2071L14.793 31.7928L22.5859 24Z" fill="black"/>
          </svg>
        </button>
        {children}
      </div>
    </div>,document.body
  );
};

export default Modal;