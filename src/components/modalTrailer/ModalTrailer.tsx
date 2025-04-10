import React from 'react';
import './ModalTrailer.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerYouTubeId: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, trailerYouTubeId }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <iframe
  width="100%"
  height="315"
  src={`https://www.youtube.com/embed/${trailerYouTubeId}?autoplay=1&enablejsapi=1`}
  frameBorder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
        
      </div>
    </div>
  );
};

export default Modal;