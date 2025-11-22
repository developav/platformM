import { useState } from 'react';
import Modal from './ModalAuth';
import AuthForm from '../../components/login/login';

const AuthModal = ({ onClose, onLoginSuccess, }: { onClose: () => void; onLoginSuccess: ()=> void }) => {
  const [isRegistration, setIsRegistration] = useState(false);
  return (
    <Modal onClose={onClose} isRegistration={isRegistration}>
      <AuthForm onClose={onClose} onLoginSuccess={onLoginSuccess} onModeChange={setIsRegistration} />
    </Modal>
  );
};

export default AuthModal;