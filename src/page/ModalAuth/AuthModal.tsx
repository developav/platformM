import Modal from './ModalAuth';
import AuthForm from '../../components/login/login';

const AuthModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <AuthForm />
    </Modal>
  );
};

export default AuthModal;