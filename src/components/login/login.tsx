import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const AuthForm = ({ onClose }: { onClose?: () => void }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [errors, setErrors] = useState({ email: false, password: false, name: false, surname: false });
  const [loading, setLoading] = useState(false);  // Для отслеживания состояния загрузки
  const [errorMessage, setErrorMessage] = useState('');  // Для ошибки
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('https://cinemaguide.skillbox.cc/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // если требуется cookie
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Ошибка: ${response.status}`);
      }

      const data = await response.json();
      if (data.result === true) {
        console.log('Куки после входа:', document.cookie);
        localStorage.setItem('isLoggedIn', 'true');
        onClose?.(); 
        navigate('/'); 
      } else {
        setErrorMessage('Не удалось войти. Проверьте введенные данные.');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      setErrorMessage('Ошибка при входе, попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, surname: string) => {
    setLoading(true);
    try {
      const response = await fetch('https://cinemaguide.skillbox.cc/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, name, surname }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Ошибка: ${response.status}`);
      }

      const data = await response.json();
      if (data.result === true) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', data.name);
        navigate('/'); // Перенаправление на главную страницу
      } else {
        setErrorMessage('Не удалось зарегистрировать пользователя. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setErrorMessage('Ошибка при регистрации, попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      email: email.trim() === '',
      password: password.trim() === '',
      name: isRegister ? name.trim() === '' : false,
      surname: isRegister ? surname.trim() === '' : false,
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    if (isRegister) {
      register(email, password, name, surname);  // Передаем данные при регистрации
    } else {
      login(email, password);
    }
  };

  return (
    <div className='content'>
      <div className="auth-form">
        <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>

        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'input error' : 'input'}
            />
            <input
              type="text"
              placeholder="Фамилия"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className={errors.surname ? 'input error' : 'input'}
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'input error' : 'input'}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? 'input error' : 'input'}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Загрузка...' : isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <p className="switch-mode">
          {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Войти' : 'Зарегистрироваться'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;