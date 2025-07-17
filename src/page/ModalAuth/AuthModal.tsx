import Modal from './ModalAuth';
import AuthForm from '../../components/login/login';

const AuthModal = ({ onClose, onLoginSuccess, }: { onClose: () => void; onLoginSuccess: ()=> void }) => {
  return (
    <Modal onClose={onClose}>
      <AuthForm onClose={onClose} onLoginSuccess={onLoginSuccess} />
    </Modal>
  );
};

export default AuthModal;